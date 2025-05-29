<?php

namespace App\Controller\Api;

use App\Entity\Installation;
use App\Entity\Product;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

#[Route('api/installation', name: 'api_installation_')]
class InstallationApiController extends AbstractController
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
    public function index(int $id): JsonResponse
    {
        try {
            /** @var User $user */
            $user = $this->getUser();
            if (!$user || $user->getId() !== $id) {
                return $this->json(['error' => 'Usuario no autorizado'], 403);
            }

            $installations = $this->entityManager
                ->getRepository(Installation::class)
                ->findBy(['idClient' => $user]);

            return $this->json([
                'status' => 'success',
                'data' => $installations
            ], 200, [], [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                },
                AbstractNormalizer::ATTRIBUTES => [
                    'id',
                    'id_product' => ['id', 'productName', 'price'],
                    'model',
                    'processor',
                    'ram',
                    'storage',
                    'installation_Date',
                    'state',
                    'estimatedPrice',
                    'adminComments',
                    'clientApproval',
                    'clientComments'
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

            $product = $this->entityManager->getRepository(Product::class)->find($data['productId']);
            if (!$product) {
                return $this->json(['error' => 'Producto no encontrado'], 404);
            }

            $installation = new Installation();
            $installation->addIdProduct($product);
            $installation->setModel($data['model']);
            $installation->setProcessor($data['processor']);
            $installation->setRam($data['ram']);
            $installation->setStorage($data['storage']);
            $installation->setInstallationDate(new \DateTime());
            $installation->setState($data['state'] ?? 'pendiente');
            $installation->setIdClient($user); // Asignar el usuario autenticado como cliente

            $this->entityManager->persist($installation);
            $this->entityManager->flush();

            return $this->json([
                'status' => 'success',
                'message' => 'Instalación creada correctamente',
                'data' => $installation
            ], 201, [], [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                },
                AbstractNormalizer::ATTRIBUTES => [
                    'id',
                    'idClient' => ['id', 'email'],
                    'id_product' => ['id', 'productName', 'price'],
                    'model',
                    'processor',
                    'ram',
                    'storage',
                    'installation_Date',
                    'state'
                ]
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    #[Route('/unassigned', name: 'unassigned_installations', methods: ['GET'])]
    public function unassignedInstallations(): JsonResponse
    {
        $installations = $this->entityManager
            ->getRepository(Installation::class)
            ->findBy([
                'idAdministrator' => null,
                'state' => 'pendiente'
            ]);

        return $this->json([
            'status' => 'success',
            'data' => $installations
        ], 200, [], [
            'groups' => ['installation:read']
        ]);
    }

    #[Route('/assign/{id}', name: 'assign_administrator', methods: ['PATCH'])]
    public function assignAdministratorToInstallation(int $id, Request $request): JsonResponse
    {
        try {
            $installation = $this->entityManager->getRepository(Installation::class)->find($id);
            if (!$installation) {
                return $this->json(['error' => 'Instalación no encontrada'], 404);
            }

            /** @var User $administrator */
            $administrator = $this->getUser();
            if (!$administrator || !in_array('ROLE_EMPLOYER', $administrator->getRoles())) {
                return $this->json(['error' => 'Usuario no autorizado'], 403);
            }

            $installation->setIdAdministrator($administrator); // <-- Esto es lo correcto
            $this->entityManager->flush();

            return $this->json([
                'status' => 'success',
                'message' => 'Administrador asignado correctamente',
                'data' => $installation
            ], 200, [], [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                },
                AbstractNormalizer::ATTRIBUTES => [
                    'id',
                    'id_product' => ['id', 'productName', 'price'],
                    'model',
                    'processor',
                    'ram',
                    'storage',
                    'installation_Date',
                    'state',
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

    // PATCH /api/installation/assigned/{id}
    #[Route('/assigned/{id}', name: 'show_employee_installations', methods: ['GET'])]
    public function showEmployeeInstallations(int $id): JsonResponse
    {
        try {
            /** @var User $user */
            $user = $this->getUser();
            if (!$user) {
                return $this->json(['error' => 'Usuario no autenticado'], 401);
            }

            $employee = $this->entityManager->getRepository(User::class)->find($id);
            if (!$employee) {
                return $this->json(['error' => 'Empleado no encontrado'], 404);
            }

            if (
                !in_array('ROLE_ADMIN', $user->getRoles()) &&
                !in_array('ROLE_EMPLOYER', $user->getRoles()) &&
                $user->getId() !== $employee->getId()
            ) {
                return $this->json(['error' => 'No tienes permisos para ver estas instalaciones'], 403);
            }

            // CORRECTO: buscar por idAdministrator
            $installations = $this->entityManager
                ->getRepository(Installation::class)
                ->findBy(['idAdministrator' => $employee]);

            return $this->json([
                'status' => 'success',
                'data' => $installations
            ], 200, [], [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                },
                AbstractNormalizer::ATTRIBUTES => [
                    'id',
                    'id_product' => ['id', 'productName', 'price'],
                    'model',
                    'processor',
                    'ram',
                    'storage',
                    'installation_Date',
                    'state',
                    'idClient' => ['id', 'email'],
                    'estimatedPrice',
                    'adminComments',
                    'clientApproval',
                    'clientComments'
                ]
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => 'Ocurrió un error al procesar la solicitud.'
            ], 500);
        }
    }

    // PATCH /api/installation/{id}/feedback
    #[Route('/{id}/feedback', name: 'admin_feedback', methods: ['PATCH'])]
    public function adminFeedback(int $id, Request $request): JsonResponse
    {
        try {
            $installation = $this->entityManager->getRepository(Installation::class)->find($id);
            if (!$installation) {
                return $this->json(['error' => 'Instalación no encontrada'], 404);
            }

            /** @var User $administrator */
            $administrator = $this->getUser();
            if (!$administrator || !in_array('ROLE_EMPLOYER', $administrator->getRoles())) {
                return $this->json(['error' => 'Usuario no autorizado'], 403);
            }

            $data = json_decode($request->getContent(), true);
            $installation->setEstimatedPrice($data['estimatedPrice']);
            $installation->setAdminComments($data['adminComments']);
            $installation->setClientApproval(null); // Resetear aprobación
            $installation->setClientComments(null);
            $this->entityManager->flush();

            return $this->json(['status' => 'success', 'data' => $installation], 200, [], ['groups' => ['installation:read']]);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // PATCH /api/installation/{id}/client-approval
    #[Route('/{id}/client-approval', name: 'client_approval', methods: ['PATCH'])]
    public function clientApproval(int $id, Request $request): JsonResponse
    {
        $installation = $this->entityManager->getRepository(Installation::class)->find($id);
        if (!$installation) {
            return $this->json(['error' => 'Instalación no encontrada'], 404);
        }
        $data = json_decode($request->getContent(), true);
        $installation->setClientApproval($data['clientApproval']); // "approved" o "rejected"
        $installation->setClientComments($data['clientComments'] ?? null);
        if ($data['clientApproval'] === "approved") {
            $installation->setState("en_proceso");
        }
        $this->entityManager->flush();
        return $this->json(['status' => 'success', 'data' => $installation], 200, [], ['groups' => ['installation:read']]);
    }

    // PATCH /api/installation/{id}/pay
    #[Route('/{id}/pay', name: 'pay', methods: ['PATCH'])]
    public function payInstallation(int $id): JsonResponse
    {
        $installation = $this->entityManager->getRepository(Installation::class)->find($id);
        if (!$installation) {
            return $this->json(['error' => 'Instalación no encontrada'], 404);
        }
        // Aquí podrías marcar como pagada, o guardar un registro de pago
        // Por ejemplo, $installation->setPaid(true);
        $this->entityManager->flush();
        return $this->json(['status' => 'success', 'message' => 'Pago realizado correctamente'], 200);
    }

    // PATCH /api/installation/{id}/complete
    #[Route('/{id}/complete', name: 'installation_complete', methods: ['PATCH'])]
    public function completeInstallation(int $id): JsonResponse
    {
        $installation = $this->entityManager->getRepository(Installation::class)->find($id);
        if (!$installation) {
            return $this->json(['error' => 'Instalación no encontrada'], 404);
        }
        $installation->setState("completado");
        $this->entityManager->flush();
        return $this->json(['status' => 'success', 'data' => $installation], 200, [], ['groups' => ['installation:read']]);
    }
}