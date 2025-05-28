<?php
namespace App\Controller\Api;

use App\Entity\Cart;
use App\Repository\CartRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

#[Route('/api', name: 'api_')]
class CartController extends AbstractController
{
    private $cartRepository;
    private $entityManager;

    public function __construct(CartRepository $cartRepository, EntityManagerInterface $entityManager)
    {
        $this->cartRepository = $cartRepository;
        $this->entityManager = $entityManager;
    }

    
    #[Route('/cart/{userId}', name: 'api_cart_get', methods: ['GET'])]
    public function getCart($userId): JsonResponse
    {
        $cart = $this->cartRepository->findOneBy(['userId' => $userId]);

        if (!$cart) {
            return $this->json(['message' => 'Cart not found'], 404);
        }

        return $this->json($cart);
    }

    #[Route('/cart', name: 'api_cart_add', methods: ['POST'])]
    public function addToCart(Request $request): JsonResponse
    
    {
        $data = json_decode($request->getContent(), true);

        // Verifica que los datos necesarios estén presentes
        if (!isset($data['userId']) || !isset($data['products'])) {
            return $this->json(['error' => 'Datos incompletos'], 400);
        }

        $userId = $data['userId'];
        $products = $data['products'];

        // Busca el carrito del usuario
        $cart = $this->cartRepository->findOneBy(['userId' => $userId]);

        if (!$cart) {
            $cart = new Cart();
            $cart->setUserId($userId);
        }

        $existingProducts = $cart->getProducts();

        // Itera sobre los productos enviados
        foreach ($products as $product) {
            if (!isset($product['productId']) || !isset($product['quantity'])) {
                return $this->json(['error' => 'Formato de producto inválido'], 400);
            }

            $productId = $product['productId'];
            $quantity = $product['quantity'];

            // Verifica si el producto ya está en el carrito
            $productIndex = array_search($productId, array_column($existingProducts, 'productId'));

            if ($productIndex !== false) {
                // Si el producto ya está en el carrito, actualiza la cantidad
                $existingProducts[$productIndex]['quantity'] += $quantity;
            } else {
                // Si no está, añádelo con la cantidad inicial
                $existingProducts[] = ['productId' => $productId, 'quantity' => $quantity];
            }
        }

        $cart->setProducts($existingProducts);

        // Guarda el carrito en la base de datos
        $this->entityManager->persist($cart);
        $this->entityManager->flush();

        return $this->json(['message' => 'Producto(s) añadido(s) al carrito'], 201);
    }

    #[Route('/cart/{userId}/{productId}', name: 'api_cart_remove', methods: ['DELETE'])]
    public function removeFromCart($userId, $productId): JsonResponse
    {
        $cart = $this->cartRepository->findOneBy(['userId' => $userId]);

        if (!$cart) {
            return $this->json(['message' => 'Carrito no encontrado'], 404);
        }

        $products = $cart->getProducts();
        $products = array_filter($products, fn($product) => $product['productId'] != $productId);

        $cart->setProducts(array_values($products));

        // Persistir los cambios usando el EntityManager
        $this->entityManager->persist($cart);
        $this->entityManager->flush();

        return $this->json(['message' => 'Producto eliminado del carrito']);
    }

    #[Route('/cart/{userId}/{productId}', name: 'api_cart_update', methods: ['PUT'])]
    public function updateProductQuantity(Request $request, $userId, $productId): JsonResponse
    {
        $cart = $this->cartRepository->findOneBy(['userId' => $userId]);

        if (!$cart) {
            return $this->json(['message' => 'Carrito no encontrado'], 404);
        }

        $data = json_decode($request->getContent(), true);

        if (!isset($data['quantity']) || $data['quantity'] < 1) {
            return $this->json(['error' => 'Cantidad inválida'], 400);
        }

        $quantity = $data['quantity'];
        $products = $cart->getProducts();

        // Buscar el producto en el carrito
        $productIndex = array_search($productId, array_column($products, 'productId'));

        if ($productIndex === false) {
            return $this->json(['message' => 'Producto no encontrado en el carrito'], 404);
        }

        // Actualizar la cantidad del producto
        $products[$productIndex]['quantity'] = $quantity;
        $cart->setProducts($products);

        // Persistir los cambios usando el EntityManager
        $this->entityManager->persist($cart);
        $this->entityManager->flush();

        return $this->json(['message' => 'Cantidad actualizada correctamente']);
    }
}
?>