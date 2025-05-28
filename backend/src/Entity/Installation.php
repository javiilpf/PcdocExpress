<?php

namespace App\Entity;

use App\Repository\InstallationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: InstallationRepository::class)]
class Installation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['installation:read'])]
    private ?int $id = null;

    /**
     * @var Collection<int, Product>
     */
    #[ORM\ManyToMany(targetEntity: Product::class, inversedBy: 'installations')]
    private Collection $id_product;

    #[ORM\Column(length: 255)]
    #[Groups(['installation:read'])]
    private ?string $model = null;

    #[ORM\Column(length: 255)]
    #[Groups(['installation:read'])]
    private ?string $processor = null;

    #[ORM\Column(length: 255)]
    #[Groups(['installation:read'])]
    private ?string $ram = null;

    #[ORM\Column(length: 255)]
    #[Groups(['installation:read'])]
    private ?string $storage = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $installation_Date = null;

    #[ORM\Column(length: 255)]
    #[Groups(['installation:read'])]
    private ?string $state = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['installation:read'])]
    private ?User $idClient = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[Groups(['installation:read'])]
    private ?User $idAdministrator = null;

    #[ORM\Column(type: 'float', nullable: true)]
    #[Groups(['installation:read'])]
    private ?float $estimatedPrice = null;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups(['installation:read'])]
    private ?string $adminComments = null;

    #[ORM\Column(type: 'string', length: 20, nullable: true)]
    #[Groups(['installation:read'])]
    private ?string $clientApproval = null;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups(['installation:read'])]
    private ?string $clientComments = null;

    #[ORM\Column(type: 'float', nullable: true)]
    #[Groups(['installation:read'])]
    private ?float $finalPrice = null;

    public function __construct()
    {
        $this->id_product = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Product>
     */
    public function getIdProduct(): Collection
    {
        return $this->id_product;
    }

    public function addIdProduct(Product $idProduct): static
    {
        if (!$this->id_product->contains($idProduct)) {
            $this->id_product->add($idProduct);
        }

        return $this;
    }

    public function removeIdProduct(Product $idProduct): static
    {
        $this->id_product->removeElement($idProduct);

        return $this;
    }

    public function getModel(): ?string
    {
        return $this->model;
    }

    public function setModel(string $model): static
    {
        $this->model = $model;

        return $this;
    }

    public function getProcessor(): ?string
    {
        return $this->processor;
    }

    public function setProcessor(string $processor): static
    {
        $this->processor = $processor;

        return $this;
    }

    public function getRam(): ?string
    {
        return $this->ram;
    }

    public function setRam(string $ram): static
    {
        $this->ram = $ram;

        return $this;
    }

    public function getStorage(): ?string
    {
        return $this->storage;
    }

    public function setStorage(string $storage): static
    {
        $this->storage = $storage;

        return $this;
    }

    public function getInstallationDate(): ?\DateTimeInterface
    {
        return $this->installation_Date;
    }

    public function setInstallationDate(\DateTimeInterface $installation_Date): static
    {
        $this->installation_Date = $installation_Date;

        return $this;
    }

    public function getState(): ?string
    {
        return $this->state;
    }

    public function setState(string $state): static
    {
        $this->state = $state;

        return $this;
    }

    public function getIdClient(): ?User
    {
        return $this->idClient;
    }

    public function setIdClient(?User $idClient): static
    {
        $this->idClient = $idClient;

        return $this;
    }

    public function getIdAdministrator(): ?User
    {
        return $this->idAdministrator;
    }

    public function setIdAdministrator(?User $idAdministrator): static
    {
        $this->idAdministrator = $idAdministrator;

        return $this;
    }

    public function getEstimatedPrice(): ?float
    {
        return $this->estimatedPrice;
    }

    public function setEstimatedPrice(?float $estimatedPrice): static
    {
        $this->estimatedPrice = $estimatedPrice;

        return $this;
    }

    public function getAdminComments(): ?string
    {
        return $this->adminComments;
    }

    public function setAdminComments(?string $adminComments): static
    {
        $this->adminComments = $adminComments;

        return $this;
    }

    public function getClientApproval(): ?string
    {
        return $this->clientApproval;
    }

    public function setClientApproval(?string $clientApproval): static
    {
        $this->clientApproval = $clientApproval;

        return $this;
    }

    public function getClientComments(): ?string
    {
        return $this->clientComments;
    }

    public function setClientComments(?string $clientComments): static
    {
        $this->clientComments = $clientComments;

        return $this;
    }

    public function getFinalPrice(): ?float
    {
        return $this->finalPrice;
    }

    public function setFinalPrice(?float $finalPrice): static
    {
        $this->finalPrice = $finalPrice;

        return $this;
    }
}
