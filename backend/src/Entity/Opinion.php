<?php

namespace App\Entity;

use App\Repository\OpinionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OpinionRepository::class)]
class Opinion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'opinions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $id_user = null;

    #[ORM\ManyToOne(inversedBy: 'opinions')]
    private ?Product $id_product = null;

    #[ORM\ManyToOne(inversedBy: 'opinions')]
    private ?Reparation $reparation_id = null;

    #[ORM\ManyToOne(inversedBy: 'opinions')]
    private ?Maintenance $maintenance_id = null;

    #[ORM\Column(length: 255)]
    private ?string $opinion = null;

    #[ORM\Column(nullable: true)]
    private ?int $likes = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdUser(): ?User
    {
        return $this->id_user;
    }

    public function setIdUser(?User $id_user): static
    {
        $this->id_user = $id_user;

        return $this;
    }

    public function getIdProduct(): ?Product
    {
        return $this->id_product;
    }

    public function setIdProduct(?Product $id_product): static
    {
        $this->id_product = $id_product;

        return $this;
    }

    public function getReparationId(): ?Reparation
    {
        return $this->reparation_id;
    }

    public function setReparationId(?Reparation $reparation_id): static
    {
        $this->reparation_id = $reparation_id;

        return $this;
    }

    public function getMaintenanceId(): ?Maintenance
    {
        return $this->maintenance_id;
    }

    public function setMaintenanceId(?Maintenance $maintenance_id): static
    {
        $this->maintenance_id = $maintenance_id;

        return $this;
    }

    public function getOpinion(): ?string
    {
        return $this->opinion;
    }

    public function setOpinion(string $opinion): static
    {
        $this->opinion = $opinion;

        return $this;
    }

    public function getLikes(): ?int
    {
        return $this->likes;
    }

    public function setLikes(?int $likes): static
    {
        $this->likes = $likes;

        return $this;
    }
}
