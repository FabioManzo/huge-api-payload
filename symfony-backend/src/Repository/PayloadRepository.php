<?php

namespace App\Repository;

use App\Entity\Payload;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Payload>
 */
class PayloadRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Payload::class);
    }

    public function save(Payload $payload): void
    {
        $this->getEntityManager()->persist($payload);
        $this->getEntityManager()->flush();
    }
}
