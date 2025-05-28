<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use \App\Enum\ProductType;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['installation:read'])]
    private ?string $product_name = null;

    #[ORM\Column(type: "text")]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['installation:read'])]
    private ?int $price = null;

    #[ORM\Column]
    private ?int $stock = null;

    /**
     * @var Collection<int, Image>
     */
    #[ORM\OneToMany(targetEntity: Image::class, mappedBy: 'id_product')]
    private Collection $images;

    #[ORM\Column(nullable: true)]
    private ?int $valoration = null;

    #[ORM\Column(enumType: ProductType::class)]
    private ?ProductType $type = null;

    /**
     * @var Collection<int, Opinion>
     */
    #[ORM\OneToMany(targetEntity: Opinion::class, mappedBy: 'id_product')]
    private Collection $opinions;

    /**
     * @var Collection<int, Installation>
     */
    #[ORM\ManyToMany(targetEntity: Installation::class, mappedBy: 'id_product')]
    private Collection $installations;

    public function __construct()
    {
        $this->images = new ArrayCollection();
        $this->opinions = new ArrayCollection();
        $this->installations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProductName(): ?string
    {
        return $this->product_name;
    }

    public function setProductName(string $product_name): static
    {
        $this->product_name = $product_name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): static
    {
        $this->stock = $stock;

        return $this;
    }

    /**
     * @return Collection<int, Image>
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(Image $image): static
    {
        if (!$this->images->contains($image)) {
            $this->images->add($image);
            $image->setIdProduct($this);
        }

        return $this;
    }

    public function removeImage(Image $image): static
    {
        if ($this->images->removeElement($image)) {
            // set the owning side to null (unless already changed)
            if ($image->getIdProduct() === $this) {
                $image->setIdProduct(null);
            }
        }

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

    public function getType(): ?ProductType
    {
        return $this->type;
    }

    public function setType(ProductType $type): static
    {
        $this->type = $type;

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
            $opinion->setIdProduct($this);
        }

        return $this;
    }

    public function removeOpinion(Opinion $opinion): static
    {
        if ($this->opinions->removeElement($opinion)) {
            // set the owning side to null (unless already changed)
            if ($opinion->getIdProduct() === $this) {
                $opinion->setIdProduct(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Installation>
     */
    public function getInstallations(): Collection
    {
        return $this->installations;
    }

    public function addInstallation(Installation $installation): static
    {
        if (!$this->installations->contains($installation)) {
            $this->installations->add($installation);
            $installation->addIdProduct($this);
        }

        return $this;
    }

    public function removeInstallation(Installation $installation): static
    {
        if ($this->installations->removeElement($installation)) {
            $installation->removeIdProduct($this);
        }

        return $this;
    }
}
