<?php

namespace App\Http\Controllers;

use App\Services\FishingService;
use Illuminate\Http\Request;

class GameController extends Controller
{
    private FishingService $fishingService;

    public function __construct()
    {
        $this->fishingService = app(FishingService::class);
    }

    public function start()
    {
        return response()->json($this->fishingService->initGame());
    }

    public function move(Request $request)
    {
        $validated = $this->validateRequest($request);

        try {
            $result = $this->fishingService->processMove(
                $validated['rodType'],
                $validated['baitType'],
                $validated['baitQuantity']
            );

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'trace' => config('app.debug') ? $e->getTrace() : null
            ], 500);
        }
    }

    private function validateRequest(Request $request): array
    {
        return $request->validate([
            'rodType' => 'required|in:small,medium,large',
            'baitType' => 'required|in:red,blue,green',
            'baitQuantity' => 'required|integer|min:1|max:100'
        ]);
    }
}
