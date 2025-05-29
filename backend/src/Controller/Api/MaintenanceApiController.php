<?php

namespace App\Controller\Api;

use App\Entity\Maintenance;
use App\Entity\User;
use App\Enum\DispositiveType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

#[Route('api/maintenance', name: 'api_maintenance_')]
class MaintenanceApiController extends AbstractController

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

    #[Route('/user/{id}', name: 'index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        try {
            /** @var User $user */
            $user = $this->getUser();
            if (!$user) {
                return $this->json(['error' => 'Usuario no autenticado'], 401);
            }

            $maintenances = $this->entityManager
                ->getRepository(Maintenance::class)
                ->findBy(['idClient' => $user]);

            return $this->json([
                'status' => 'success',
                'data' => $maintenances
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
                    'maintenanceDate',
                    'state',
                    'valoration',
                    'idClient' => ['id', 'email'],
                    'idAdministrator' => ['id', 'email']
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
            if (!$data) {
                return $this->json(['error' => 'JSON inválido'], 400);
            }

            $maintenance = new Maintenance();
            $maintenance->setDeviceType(DispositiveType::from($data['deviceType']));
            $maintenance->setModel($data['model']);
            $maintenance->setProcessor($data['processor']);
            $maintenance->setRam($data['ram']);
            $maintenance->setStorage($data['storage']);
            $maintenance->setSpecifications($data['specifications']);
            $maintenance->setMaintenanceDate(new \DateTime());
            $maintenance->setState(1);
            $maintenance->setIdClient($user);

            $this->entityManager->persist($maintenance);
            $this->entityManager->flush();

            return $this->json([
                'status' => 'success',
                'message' => 'Mantenimiento creado correctamente',
                'data' => $maintenance
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
                    'maintenanceDate',
                    'state',
                    'valoration',
                    'idClient' => ['id', 'email']
                ]
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    #[Route('/unassigned', name: 'unassigned_maintenances', methods: ['GET'])]
    public function getUnassignedMaintenances(): JsonResponse
    {
        try {
            $maintenances = $this->entityManager
                ->getRepository(Maintenance::class)
                ->findBy(['idAdministrator' => null]);

            return $this->json([
                'status' => 'success',
                'data' => $maintenances
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
                    'maintenanceDate',
                    'state',
                    'valoration',
                    'idClient' => ['id', 'email']
                ]
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    #[Route('/assigned/{id}', name: 'show', methods: ['GET'])]
    public function showAdminMaintenances(int $id): JsonResponse
    {
        try {
            // Verificar si el usuario está autenticado
            /** @var User $user */
            $user = $this->getUser();
            if (!$user) {
                return $this->json(['error' => 'Usuario no autenticado'], 401);
            }

            // Buscar al administrador por el ID proporcionado
            $administrator = $this->entityManager->getRepository(User::class)->find($id);
            if (!$administrator) {
                return $this->json(['error' => 'Administrador no encontrado'], 404);
            }

            // Verificar que el usuario autenticado tenga permisos para ver los mantenimientos
            if (!in_array('ROLE_ADMIN', $user->getRoles()) && $user->getId() !== $administrator->getId()) {
                return $this->json(['error' => 'No tienes permisos para ver estos mantenimientos'], 403);
            }

            // Obtener los mantenimientos asignados al administrador
            $maintenances = $this->entityManager
                ->getRepository(Maintenance::class)
                ->findBy(['idAdministrator' => $administrator]);

            return $this->json([
                'status' => 'success',
                'data' => $maintenances
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
                    'maintenanceDate',
                    'state',
                    'valoration',
                    'idClient' => ['id', 'email'],
                    'idAdministrator' => ['id', 'email']
                ]
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    #[Route('/assign/{id}', name: 'assign_administrator', methods: ['PATCH', 'OPTIONS'])]
    public function assignAdministratorToMaintenance(int $id, Request $request): JsonResponse
    {
        try {
            $maintenance = $this->entityManager->getRepository(Maintenance::class)->find($id);
            if (!$maintenance) {
                return $this->json(['error' => 'Mantenimiento no encontrado'], 404);
            }

            /** @var User $administrator */
            $administrator = $this->getUser();
            if (!$administrator || !in_array('ROLE_EMPLOYER', $administrator->getRoles())) {
                return $this->json(['error' => 'Usuario no autorizado'], 403);
            }

            $maintenance->setIdAdministrator($administrator);
            $this->entityManager->flush();

            return $this->json([
                'status' => 'success',
                'message' => 'Administrador asignado correctamente',
                'data' => $maintenance
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
                    'maintenanceDate',
                    'state',
                    'valoration',
                    'idAdministrator' => ['id', 'email']
                ]
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
    #[Route('/{id}/state', name: 'maintenance_update_state', methods: ['PATCH'])]
    public function updateState(int $id, Request $request): JsonResponse
    {
        $maintenance = $this->entityManager->getRepository(Maintenance::class)->find($id);
        if (!$maintenance) {
            return $this->json(['error' => 'Mantenimiento no encontrado'], 404);
        }
        $data = json_decode($request->getContent(), true);
        $maintenance->setState($data['state']);
        $this->entityManager->flush();
        return $this->json(['status' => 'success', 'data' => $maintenance], 200, [], [
            'groups' => ['maintenance:details']
        ]);
    }
}