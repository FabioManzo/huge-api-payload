<?php

namespace App\Repository;

use App\Entity\Flyer;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Flyer>
 */
class FlyerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Flyer::class);
    }

    public function save(Flyer $payload): void
    {
        $this->getEntityManager()->persist($payload);
        $this->getEntityManager()->flush();
    }
}
