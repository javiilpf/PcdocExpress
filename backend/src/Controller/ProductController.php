<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProductController extends AbstractController
{
    #[Route('/product', name: 'api_product_list', methods: ['GET'])]
    public function listProducts(): JsonResponse
    {
        return $this->json([
            'message' => 'List of products',
            'products' => []
        ]);
    }
}


?>