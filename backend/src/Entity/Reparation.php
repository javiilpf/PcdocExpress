<?php

namespace App\Entity;

use App\Repository\ReparationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use \App\Enum\DispositiveType;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ReparationRepository::class)]
class Reparation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['reparation:list', 'reparation:details'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'reparations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['reparation:details'])]
    private ?User $id_client = null;

    #[ORM\Column(name: 'device_type', enumType: DispositiveType::class)]
    #[Groups(['reparation:list', 'reparation:details'])]
    private ?DispositiveType $deviceType = null;

    #[ORM\Column(length: 255)]
    #[Groups(['reparation:list', 'reparation:details'])]
    private ?string $model = null;

    #[ORM\Column(length: 255)]
    private ?string $processor = null;

    #[ORM\Column(length: 255)]
    private ?string $ram = null;

    #[ORM\Column(length: 255)]
    private ?string $storage = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['reparation:details'])]
    private ?string $issueDescription = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['reparation:details'])]
    private ?string $comments = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $observations = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $orderDate = null;

    #[ORM\Column]
    private ?int $state = null;

    #[ORM\Column(nullable: true)]
    private ?int $valoration = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    #[Groups(['reparation:details'])]
    private ?float $estimatedPrice = null;

    #[ORM\ManyToOne(inversedBy: 'reparations')]
    private ?User $idAdministrator = null; // Cambiado de id_administrator a idAdministrator

    /**
     * @var Collection<int, Opinion>
     */
    #[ORM\OneToMany(targetEntity: Opinion::class, mappedBy: 'reparation_id')]
    private Collection $opinions;

    #[ORM\Column(type: Types::STRING, length: 20, nullable: true)]
    #[Groups(['reparation:details'])]
    private ?string $clientApproval = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['reparation:details'])]
    private ?string $adminComments = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['reparation:details'])]
    private ?string $clientComments = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    #[Groups(['reparation:details'])]
    private ?float $finalPrice = null;

    public function __construct()
    {
        $this->opinions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdClient(): ?User
    {
        return $this->id_client;
    }

    public function setIdClient(?User $id_client): static
    {
        $this->id_client = $id_client;

        return $this;
    }

    public function getDeviceType(): ?DispositiveType
    {
        return $this->deviceType;
    }

    public function setDeviceType(DispositiveType $deviceType): static
    {
        $this->deviceType = $deviceType;

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

    public function getIssueDescription(): ?string
    {
        return $this->issueDescription;
    }

    public function setIssueDescription(string $issueDescription): static
    {
        $this->issueDescription = $issueDescription;

        return $this;
    }

    public function getComments(): ?string
    {
        return $this->comments;
    }

    public function setComments(?string $comments): static
    {
        $this->comments = $comments;

        return $this;
    }

    public function getObservations(): ?string
    {
        return $this->observations;
    }

    public function setObservations(?string $observations): static
    {
        $this->observations = $observations;

        return $this;
    }

    public function getOrderDate(): ?\DateTimeInterface
    {
        return $this->orderDate;
    }

    public function setOrderDate(\DateTimeInterface $orderDate): static
    {
        $this->orderDate = $orderDate;

        return $this;
    }

    public function getState(): ?int
    {
        return $this->state;
    }

    public function setState(int $state): static
    {
        $this->state = $state;

        return $this;
    }

    public function getValoration(): ?int
    {
        return $this->valoration;
    }

    public function setValoration(?int $valoration): static
    {
        $this->valoration = $valoration;

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

    /**
     * @return Collection<int, Opinion>
     */
    public function getOpinions(): Collection
    {
        return $this->opinions;
    }

    public function addOpinion(Opinion $opinion): static
    {
        if (!$this->opinions->contains($opinion)) {
            $this->opinions->add($opinion);
            $opinion->setReparationId($this);
        }

        return $this;
    }

    public function removeOpinion(Opinion $opinion): static
    {
        if ($this->opinions->removeElement($opinion)) {
            // set the owning side to null (unless already changed)
            if ($opinion->getReparationId() === $this) {
                $opinion->setReparationId(null);
            }
        }

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

    public function getClientApproval(): ?string
    {
        return $this->clientApproval;
    }

    public function setClientApproval(?string $clientApproval): static
    {
        $this->clientApproval = $clientApproval;

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
