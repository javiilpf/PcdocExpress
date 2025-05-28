<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

#[Route('/api', name: 'api_')]
class AuthController extends AbstractController
{
    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager, JWTTokenManagerInterface $jwtManager): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            if (!isset($data['email']) || !isset($data['password'])) {
                return $this->json([
                    'message' => 'Faltan credenciales'
                ], Response::HTTP_BAD_REQUEST);
            }

            // Buscar el usuario por email
            $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);

            // Validar credenciales
            if (!$user || !$passwordHasher->isPasswordValid($user, $data['password'])) {
                return $this->json([
                    'message' => 'Email o contraseña incorrectos'
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Generar token JWT
            // $token = $jwtManager->create($user);

            return $this->json([
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'roles' => $user->getRoles()
                ],
                'token' => "no funciona",
                'message' => 'Logged in successfully'
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'message' => 'Error en el servidor: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager, JWTTokenManagerInterface $jwtManager): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            $user = new User();
            $user->setEmail($data['email']);
            $user->setPassword($passwordHasher->hashPassword($user, $data['password']));

            $entityManager->persist($user);
            $entityManager->flush();

            $token = $jwtManager->create($user);

            return $this->json([
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'roles' => $user->getRoles()
                ],
                'token' => $token,
                'message' => 'Usuario registrado correctamente'
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return $this->json([
                'message' => 'Error en el registro: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/user', name: 'user_info', methods: ['GET'])]
    public function getUserInfo(UserInterface $user): JsonResponse
    {
        if (!$user instanceof User) {
            return $this->json([
                'message' => 'Usuario no válido'
            ], Response::HTTP_BAD_REQUEST);
        }

        return $this->json([
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles()
            ]
        ]);
    }

    #[Route('/logout', name: 'logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        return new JsonResponse(['message' => 'Logged out successfully']);
    }
    #[Route('/users/{id}/role', name: 'update_role', methods: ['PUT'])]
public function updateRole(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
{
    $data = json_decode($request->getContent(), true);

    if (!isset($data['role'])) {
        return $this->json(['error' => 'El rol es obligatorio'], Response::HTTP_BAD_REQUEST);
    }

    $user = $entityManager->getRepository(User::class)->find($id);

    if (!$user) {
        return $this->json(['error' => 'Usuario no encontrado'], Response::HTTP_NOT_FOUND);
    }

    $user->setRoles([$data['role']]);
    $entityManager->flush();

    return $this->json(['message' => 'Rol actualizado correctamente']);
}
#[Route('/users', name: 'get_users', methods: ['GET'])]
public function getUsers(EntityManagerInterface $entityManager): JsonResponse
{
    // Obtener todos los usuarios de la base de datos
    $users = $entityManager->getRepository(User::class)->findAll();

    // Serializar los datos de los usuarios
    $userData = array_map(function (User $user) {
        return [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
        ];
    }, $users);

    return $this->json($userData);
}
}