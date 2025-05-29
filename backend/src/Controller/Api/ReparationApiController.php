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
class ReparationApiController extends AbstractController
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

    #[Route('/user/{id}', name: 'user_reparations', methods: ['GET'])]
    public function getUserReparations(int $id): JsonResponse
    {
        try {
            $user = $this->entityManager->getRepository(User::class)->find($id);
            if (!$user) {
                return $this->json(['error' => 'Usuario no encontrado'], 404);
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
                    'device_Type',
                    'model',
                    'processor',
                    'ram',
                    'storage',
                    'specifications',
                    'orderDate',
                    'issueDescription',
                    'observations',
                    'state',
                    'valoration',
                    'id_client_id' => ['id', 'email'],
                    'idAdministrator' => ['id', 'email'],
                    'comments',
                    'estimatedPrice',
                    'clientApproval'
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

            $reparation = new Reparation();
            $reparation->setDeviceType(DispositiveType::from($data['deviceType'])); // Conversión al enum
            $reparation->setModel($data['model']);
            $reparation->setProcessor($data['processor']);
            $reparation->setRam($data['ram']);
            $reparation->setStorage($data['storage']);
            $reparation->setIssueDescription($data['issue_description']);
            $reparation->setState(1);
            $reparation->setIdClient($user);
            $reparation->setOrderDate(new \DateTime('now'));

            $this->entityManager->persist($reparation);
            $this->entityManager->flush();

            return $this->json($reparation, 201, [], [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                },
                AbstractNormalizer::GROUPS => ['reparation:details'],
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    #[Route('/unassigned', name: 'unassigned_reparations', methods: ['GET'])]
    public function getUnassignedReparations(): JsonResponse
    {
        try {
            $reparations = $this->entityManager
                ->getRepository(Reparation::class)
                ->findBy(['idAdministrator' => null]);

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
                    'issueDescription',
                    'orderDate',
                    'state',
                    'valoration',
                    'id_client' => ['id', 'email']
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
    public function showAdminReparations(int $id): JsonResponse
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
                ->getRepository(Reparation::class)
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
                    'issueDescription',
                    'observations',
                    'comments',
                    'orderDate',
                    'estimatedPrice',
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

    #[Route('/assign/{id}', name: 'assign_administrator', methods: ['PATCH'])]
    public function assignAdministratorToReparation(int $id, Request $request): JsonResponse
    {
        try {
            $reparation = $this->entityManager->getRepository(Reparation::class)->find($id);
            if (!$reparation) {
                return $this->json(['error' => 'Reparación no encontrada'], 404);
            }

            /** @var User $administrator */
            $administrator = $this->getUser();
            if (!$administrator || !in_array('ROLE_EMPLOYER', $administrator->getRoles())) {
                return $this->json(['error' => 'Usuario no autorizado'], 403);
            }

            $reparation->setIdAdministrator($administrator);
            $this->entityManager->flush();

            return $this->json([
                'status' => 'success',
                'message' => 'Administrador asignado correctamente',
                'data' => $reparation
            ], 200, [], [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                },
                AbstractNormalizer::ATTRIBUTES => [
                    'id',
                    'device_Type',
                    'model',
                    'processor',
                    'ram',
                    'storage',
                    'issue_Description',
                    'orderDate',
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

    #[Route('/reparation/{id}', name: 'get_reparation', methods: ['GET'])]
    public function getReparation(int $id): JsonResponse
    {
        $reparation = $this->entityManager->getRepository(Reparation::class)->find($id);

        if (!$reparation) {
            return $this->json(['error' => 'Reparación no encontrada'], 404);
        }

        return $this->json($reparation, 200, [], [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                return $object->getId(); // Devuelve el ID del objeto relacionado para evitar referencias circulares
            },
            AbstractNormalizer::GROUPS => ['reparation:details'], // Usa los grupos de serialización
        ]);
    }

    #[Route('/assigned/{id}', name: 'show_employee_reparations', methods: ['GET'])]
    public function showEmployeeReparations(int $id): JsonResponse
    {
        try {
            // Verificar si el usuario está autenticado
            /** @var User $user */
            $user = $this->getUser();
            if (!$user) {
                return $this->json(['error' => 'Usuario no autenticado'], 401);
            }

            // Buscar al empleado por el ID proporcionado
            $employee = $this->entityManager->getRepository(User::class)->find($id);
            if (!$employee) {
                return $this->json(['error' => 'Empleado no encontrado'], 404);
            }

            // Verificar que el usuario autenticado tenga permisos para ver las reparaciones
            if (!in_array('ROLE_ADMIN', $user->getRoles()) && $user->getId() !== $employee->getId()) {
                return $this->json(['error' => 'No tienes permisos para ver estas reparaciones'], 403);
            }

            // Obtener las reparaciones asignadas al empleado
            $reparations = $this->entityManager
                ->getRepository(Reparation::class)
                ->findBy(['idAdministrator' => $employee]);

            if (empty($reparations)) {
                return $this->json([
                    'status' => 'success',
                    'message' => 'No hay reparaciones asignadas a este empleado.',
                    'data' => []
                ], 200);
            }

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
                    'issueDescription',
                    'orderDate',
                    'state',
                    'valoration',
                    'idClient' => ['id', 'email'],
                    'idAdministrator' => ['id', 'email']
                ]
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => 'Ocurrió un error al procesar la solicitud.'
            ], 500);
        }
    }

    #[Route('/update/{id}', name: 'update_reparation', methods: ['PATCH'])]
    public function updateReparation(int $id, Request $request): JsonResponse
    {
        try {
            $reparation = $this->entityManager->getRepository(Reparation::class)->find($id);
            if (!$reparation) {
                return $this->json(['error' => 'Reparación no encontrada'], 404);
            }

            /** @var User $user */
            $user = $this->getUser();
            if (!$user || !in_array('ROLE_EMPLOYER', $user->getRoles())) {
                return $this->json(['error' => 'Usuario no autorizado'], 403);
            }

            $data = json_decode($request->getContent(), true);

            if (isset($data['state'])) {
                $reparation->setState($data['state']);
            }

            if (isset($data['comments'])) {
                $reparation->setComments($data['comments']);
            }

            if (isset($data['estimatedPrice'])) {
                $reparation->setEstimatedPrice($data['estimatedPrice']);
            }

            $this->entityManager->flush();

            return $this->json([
                'status' => 'success',
                'message' => 'Reparación actualizada correctamente',
                'data' => $reparation
            ], 200, [], [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                },
                AbstractNormalizer::ATTRIBUTES => [
                    'id',
                    'state',
                    'comments',
                    'estimatedPrice',
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

    #[Route('/approve/{id}', name: 'approve_reparation', methods: ['PATCH'])]
    public function approveReparation(int $id, Request $request): JsonResponse
    {
        try {
            $reparation = $this->entityManager->getRepository(Reparation::class)->find($id);
            if (!$reparation) {
                return $this->json(['error' => 'Reparación no encontrada'], 404);
            }

            /** @var User $user */
            $user = $this->getUser();
            if (!$user || $user !== $reparation->getIdClient()) {
                return $this->json(['error' => 'Usuario no autorizado'], 403);
            }

            $data = json_decode($request->getContent(), true);

            if (isset($data['approval'])) {
                $reparation->setClientApproval($data['approval']);
            }

            $this->entityManager->flush();

            return $this->json([
                'status' => 'success',
                'message' => 'Estado de aprobación actualizado correctamente',
                'data' => $reparation
            ], 200, [], [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                },
                AbstractNormalizer::ATTRIBUTES => [
                    'id',
                    'clientApproval',
                    'state',
                    'comments',
                    'estimatedPrice'
                ]
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    #[Route('/{id}/feedback', name: 'admin_feedback', methods: ['PATCH'])]
    public function adminFeedback(int $id, Request $request): JsonResponse
    {
        $reparation = $this->entityManager->getRepository(Reparation::class)->find($id);
        if (!$reparation) {
            return $this->json(['error' => 'Reparación no encontrada'], 404);
        }
        /** @var User $admin */
        $admin = $this->getUser();
        if (!$admin || !in_array('ROLE_EMPLOYER', $admin->getRoles())) {
            return $this->json(['error' => 'Usuario no autorizado'], 403);
        }
        $data = json_decode($request->getContent(), true);
        $reparation->setEstimatedPrice($data['estimatedPrice']);
        $reparation->setAdminComments($data['adminComments']);
        $reparation->setClientApproval(null);
        $reparation->setClientComments(null);
        $this->entityManager->flush();
        return $this->json(['status' => 'success', 'data' => $reparation], 200, [], [
            AbstractNormalizer::GROUPS => ['reparation:details']
        ]);
    }

    #[Route('/{id}/client-approval', name: 'client_approval', methods: ['PATCH'])]
    public function clientApproval(int $id, Request $request): JsonResponse
    {
        $reparation = $this->entityManager->getRepository(Reparation::class)->find($id);
        if (!$reparation) {
            return $this->json(['error' => 'Reparación no encontrada'], 404);
        }
        $data = json_decode($request->getContent(), true);
        $reparation->setClientApproval($data['clientApproval']);
        $reparation->setClientComments($data['clientComments'] ?? null);
        if ($data['clientApproval'] === "approved") {
            $reparation->setState(2); // o el valor que uses para "en_proceso"
        }
        $this->entityManager->flush();
        return $this->json(['status' => 'success', 'data' => $reparation], 200, [], [
            AbstractNormalizer::GROUPS => ['reparation:details']
        ]);
    }

    #[Route('/{id}/complete', name: 'reparation_complete', methods: ['PATCH'])]
    public function completeReparation(int $id): JsonResponse
    {
        $reparation = $this->entityManager->getRepository(Reparation::class)->find($id);
        if (!$reparation) {
            return $this->json(['error' => 'Reparación no encontrada'], 404);
        }
        $reparation->setState(3); // o el valor que uses para "completado"
        $this->entityManager->flush();
        return $this->json(['status' => 'success', 'data' => $reparation], 200, [], [
            AbstractNormalizer::GROUPS => ['reparation:details']
        ]);
    }
}
