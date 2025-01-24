<?php

namespace App\Service;

use Symfony\Component\HttpClient\HttpClient;

class FileDownloaderStream implements FileDownloaderInterface
{
    public function __construct(
        private string $uploadDirectory
    )
    {}

    public function download(string $fileUrl, string $fileName): void
    {
        $httpClient = HttpClient::create();
        $response = $httpClient->request('GET', $fileUrl);

        if (200 !== $response->getStatusCode()) {
            throw new \Exception('Failed to download the file.');
        }

        $uploadDir = $this->uploadDirectory;
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        $filePath = $uploadDir . '/' . $fileName . '.json';
        $fileHandle = fopen($filePath, 'wb');

        // Stream the response content and write to the file
        foreach ($httpClient->stream($response) as $chunk) {
            if ($chunk->isLast()) {
                break;
            }
            fwrite($fileHandle, $chunk->getContent());
        }

        fclose($fileHandle);
    }
}