<?php
namespace App\Controller\Api;

use App\Entity\Product;
use App\Entity\Image;
use App\Entity\Opinion;
use App\Enum\ProductType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\HttpFoundation\Response;

#[Route('/api/product', name: 'api_product_')]
class ProductApiController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        try {
            // Recoge los datos del formulario (form-data)
            $data = $request->request->all();

            $product = new Product();
            $product->setProductName($data['product_name'] ?? '');
            $product->setDescription($data['description'] ?? '');
            $product->setPrice((float)($data['price'] ?? 0));
            $product->setStock((int)($data['stock'] ?? 0));
            $product->setValoration((int)($data['valoration'] ?? 0));

            // Enum ProductType
            if (!isset($data['type']) || !ProductType::tryFrom($data['type'])) {
                return $this->json(['error' => 'Tipo de producto inválido'], 400);
            }
            $product->setType(ProductType::from($data['type']));

            // Manejo de imágenes (archivos)
            $images = $request->files->get('images');
            if ($images && !is_array($images)) {
                $images = [$images];
            }
            if ($images) {
                foreach ($images as $imageFile) {
                    $filename = uniqid().'.'.$imageFile->guessExtension();
                    $imageFile->move($this->getParameter('images_directory'), $filename);

                    $image = new Image();
                    $image->setUrlImage('/uploads/images/' . $filename);
                    $image->setTitle($filename); // O usa otro campo si tienes título en el form
                    $image->setIdProduct($product);

                    $this->entityManager->persist($image);
                    $product->addImage($image);
                }
            }

            $this->entityManager->persist($product); // Persistir el producto
            $this->entityManager->flush(); // Guardar los cambios en la base de datos

            return $this->json([
                'status' => 'success',
                'data' => $product
            ], 201, [], [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                }
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        try {
            $products = $this->entityManager->getRepository(Product::class)->findAll();

            return $this->json([
                'status' => 'success',
                'data' => $products
            ], 200, [], [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                }
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    #[Route('/{id}', name: 'api_product_details', methods: ['GET'])]
    public function details(string $id): JsonResponse
    {
        if (!is_numeric($id)) {
            return $this->json([
                'message' => 'ID de producto no válido'
            ], Response::HTTP_BAD_REQUEST);
        }

        $productId = (int) $id;
        try {
            $product = $this->entityManager->getRepository(Product::class)->find($productId);
            if (!$product) {
                return $this->json(['error' => 'Producto no encontrado'], 404);
            }

            return $this->json([
                'status' => 'success',
                'data' => $product
            ], 200, [], [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                }
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
?>