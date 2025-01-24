<?php

namespace App\Service;

use App\DTO\PayloadDTO;
use App\DTO\PayloadResponseDTO;
use App\Entity\Payload;
use App\Repository\PayloadRepository;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Response;

class PayloadService
{
    public function __construct(
        private PayloadRepository $repository,
        private LoggerInterface $logger
    )
    {}

    public function save(PayloadDTO $payloadDTO): PayloadResponseDTO
    {
        $fileUrl = $payloadDTO->getFileUrl();
        $result = $this->repository->findOneBy(['fileUrl' => $fileUrl]);
        $responseDTO = new PayloadResponseDTO();
        if ($result === null) {
            $this->logger->info("Saving Payload with URL $fileUrl");
            $payload = new Payload();
            $payload->setFileUrl($fileUrl);
            $this->repository->save($payload);
            $responseDTO->setMessage("Payload saved");
            $responseDTO->setHttpStatusCode(Response::HTTP_OK);
        } else {
            $this->logger->warning("NOT saving Payload with URL $fileUrl. Entry already exists.");
            $responseDTO->setMessage("Payload NOT saved. Entry already exists");
            $responseDTO->setHttpStatusCode(Response::HTTP_CONFLICT);
        }

        return $responseDTO;
    }
}