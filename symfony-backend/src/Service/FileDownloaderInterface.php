<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\File\UploadedFile;

interface FileDownloaderInterface
{
    public function download(string $fileUrl, string $fileName): void;
}