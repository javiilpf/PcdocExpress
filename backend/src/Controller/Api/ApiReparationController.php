<?php

namespace App\Controller\Api;

use App\Entity\Reparation;
use App\Entity\User;
use App\Enum\DispositiveType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

#[Route('/api/reparation', name: 'api_reparation_')]
class ApiReparationController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private SerializerInterface $serializer;

    public function __construct(
        EntityManagerInterface $entityManager,
        SerializerInterface $serializer
    ) {
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
    }

    #[Route('', name: 'index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        try {
            /** @var User $user */
            $user = $this->getUser();
            if (!$user) {
                return $this->json(['error' => 'Usuario no autenticado'], 401);
            }

            $reparations = $this->entityManager
                ->getRepository(Reparation::class)
                ->findBy(['id_client' => $user]);

            return $this->json([
                'status' => 'success',
                'data' => $reparations
            ], 200, [], [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                },
                AbstractNormalizer::ATTRIBUTES => [
                    'id',
                    'deviceType',
                    'model',
                    'processor',
                    'ram',
                    'storage',
                    'specifications',
                    'reparationDate',
                    'state',
                    'valoration',
                    'id_client' => ['id', 'email'],
                    'id_administrator' => ['id', 'email']
                ]
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        try {
            /** @var User $user */
            $user = $this->getUser();
            if (!$user) {
                return $this->json(['error' => 'Usuario no autenticado'], 401);
            }
            $data = json_decode($request->getContent(), true);
            $reparation = new Reparation();
            $reparation->setIdClient($user);
            $reparation->setDeviceType($data['dispositiveType']);
            $reparation->setModel($data['model']);
            $reparation->setProcessor($data['processor']);
            $reparation->setRam($data['ram']);
            $reparation->setStorage($data['storage']);
            $reparation->setIssueDescription($data['specifications']);
            $reparation->setOrderDate(new \DateTime());
            $reparation->setState(1);
            $this->entityManager->persist($reparation);
            $this->entityManager->flush();
            return $this->json([
               'status' =>'success',
                'data' => $reparation
            ], 201, [], [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                },
                AbstractNormalizer::ATTRIBUTES => [
                    'id',
                    'deviceType',
                   'model',
                    'processor',
                    'ram',
                   'storage',
                   'specifications',
                   'reparationDate',
                   'state',
                     'valoration',
                     'id_client' => ['id', 'email'],
                     'id_administrator' => ['id', 'email']
                ]
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
