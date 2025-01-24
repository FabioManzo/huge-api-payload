<?php

namespace App\DTO;

class PayloadDTO
{
    private string $fileUrl;

    public function getFileUrl(): string
    {
        return $this->fileUrl;
    }

    public function setFileUrl(string $fileUrl): void
    {
        $this->fileUrl = $fileUrl;
    }
}
