<?php

namespace App\Command;

use App\Entity\Flyer;
use App\Repository\FlyerRepository;
use App\Repository\PayloadRepository;
use App\Service\FileDownloaderInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:import-payload',
    description: 'This command imports the flyers from the payloads in the DB',
)]
class ImportPayloadCommand extends Command
{
    public function __construct(
        private string $uploadDirectory,
        private PayloadRepository $payloadRepository,
        private FlyerRepository $flyerRepository,
        private FileDownloaderInterface $fileDownloaderStream
    )
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('id', InputArgument::OPTIONAL, 'Payload id')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $payloadId = $input->getArgument('id');

        if ($payloadId) {
            $io->info(sprintf('Processing payload: %s', $payloadId));
            $payload = $this->payloadRepository->findOneBy(['id' => $payloadId]);
            if ($payload->isImported()) {
                $io->warning("Flyers from this payload have already been imported");
                return Command::FAILURE;
            }
        } else {
            $io->info("Getting the oldest payload");
            $payload = $this->payloadRepository->findOneBy(['isImported' => false], ['dateCreated' => 'ASC']);
        }

        if (!$payload) {
            $io->warning("No Flyers to import");
            return Command::FAILURE;
        }

        $io->info("Downloading (stream) the payload");
        $this->fileDownloaderStream->download($payload->getFileUrl(), $payload->getId());

        // Write the file locally
        if (!is_dir($this->uploadDirectory)) {
            mkdir($this->uploadDirectory, 0755, true);
        }
        $file = json_decode(file_get_contents("{$this->uploadDirectory}/{$payload->getId()}.json"), true);

        if (!isset($file['CrawlerRequest']['data']['flyers'])) {
            $io->error("Payload not well formed");
            return Command::FAILURE;
        }

        $latestInserted = $payload->getLatestInserted();
        $maxChunkSize = 3;
        $insertedCount = 0;
        $found = false;
        $io->info("LatestInserted: $latestInserted");
        foreach ($file['CrawlerRequest']['data']['flyers'] as $index => $flyerArr) {

            if ($latestInserted && $found === false) {
                if ($flyerArr['Flyer']['id'] === $latestInserted) {
                    $found = true;
                    $io->info("LatestInserted found. Start: $index");
                } else {
                    $io->info("Skipped: $index | id: {$flyerArr['Flyer']['id']}");
                }
                continue;
            }

            $flyer = new Flyer();
            $flyer->setTitle($flyerArr['Flyer']['title']);
            $flyer->setUrl($flyerArr['Flyer']['url']);
            $flyer->setStartDate(new \DateTime($flyerArr['Flyer']['start_date']));
            $flyer->setEndDate(new \DateTime($flyerArr['Flyer']['end_date']));
            $flyer->setFlyerUrl($flyerArr['Flyer']['flyer_url']);
            $flyer->setFlyerFiles($flyerArr['Flyer']['flyer_files']);
            $flyer->setExternalId($flyerArr['Flyer']['id']);
            $this->flyerRepository->save($flyer);
            $insertedCount++;
            $io->info("Flyer inserted: {$flyerArr['Flyer']['id']}");
            if ($insertedCount >= $maxChunkSize || $index + 1 === count($file['CrawlerRequest']['data']['flyers'])) {
                $io->info("I set Latest inserted: {$flyerArr['Flyer']['id']}");
                $payload->setLatestInserted($flyerArr['Flyer']['id']);
                $this->payloadRepository->save($payload);
                break;
            }
        }

        if ($insertedCount === 0) {
            $io->info("All flyers inserted. Set payload as imported");
            $payload->setIsImported(true);
            $this->payloadRepository->save($payload);
        }

        $resultMessage = "$insertedCount Flyers imported from payload with id: {$payload->getId()}";
        $insertedCount === 0 ? $io->warning($resultMessage) : $io->success($resultMessage);

        return Command::SUCCESS;
    }
}
