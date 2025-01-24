<?php

namespace App\Entity;

use App\Repository\PayloadRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PayloadRepository::class)]
class Payload
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 800)]
    private ?string $fileUrl = null;

    #[ORM\Column]
    private ?bool $isImported = false;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $dateCreated = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $lastModified = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $latestInserted = null;

    public function __construct()
    {
        if ($this->dateCreated === null) {
            $this->dateCreated = new \DateTime(); // Default to current time
        }

        if ($this->lastModified === null) {
            $this->lastModified = new \DateTime(); // Default to current time
        }
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFileUrl(): ?string
    {
        return $this->fileUrl;
    }

    public function setFileUrl(string $fileUrl): static
    {
        $this->fileUrl = $fileUrl;

        return $this;
    }

    public function isImported(): ?bool
    {
        return $this->isImported;
    }

    public function setIsImported(bool $isImported): static
    {
        $this->isImported = $isImported;

        return $this;
    }

    public function getDateCreated(): ?\DateTimeInterface
    {
        return $this->dateCreated;
    }

    public function setDateCreated(\DateTimeInterface $dateCreated): static
    {
        $this->dateCreated = $dateCreated;

        return $this;
    }

    public function getLastModified(): ?\DateTimeInterface
    {
        return $this->lastModified;
    }

    public function setLastModified(\DateTimeInterface $lastModified): static
    {
        $this->lastModified = $lastModified;

        return $this;
    }

    public function getLatestInserted(): ?string
    {
        return $this->latestInserted;
    }

    public function setLatestInserted(?string $latestInserted): static
    {
        $this->latestInserted = $latestInserted;

        return $this;
    }
}
