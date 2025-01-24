<?php

namespace App\Controller;

use App\DTO\PayloadDTO;
use App\Service\PayloadService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

final class ApiController extends AbstractController
{
    #[Route(
        path:'/api/crawler-request',
        name: 'app_crawler_request',
        methods: ['POST']
    )]
    public function crawlerRequest(Request $request, PayloadService $payloadService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $payloadDTO = new PayloadDTO();
        $payloadDTO->setFileUrl($data['fileUrl']);
        $responseDTO = $payloadService->save($payloadDTO);

        return $this->json([
            'message' => $responseDTO->getMessage()
        ], $responseDTO->getHttpStatusCode());
    }
}
