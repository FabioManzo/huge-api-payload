<?php

namespace App\DTO;

class PayloadResponseDTO
{
    private string $httpStatusCode;
    private string $message;

    public function getHttpStatusCode(): string
    {
        return $this->httpStatusCode;
    }

    public function setHttpStatusCode(string $httpStatusCode): void
    {
        $this->httpStatusCode = $httpStatusCode;
    }

    public function getMessage(): string
    {
        return $this->message;
    }

    public function setMessage(string $message): void
    {
        $this->message = $message;
    }

}