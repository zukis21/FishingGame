<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\FishingService;
use Illuminate\Validation\ValidationException;

class GameController extends Controller
{
    private FishingService $fishingService;

    public function __construct()
    {
        $this->fishingService = app(FishingService::class);
    }

    public function start(Request $request)
    {
        $request->session()->put('gameState', $this->fishingService->initGame());
        return response()->json($request->session()->get('gameState'));
    }

    public function getState(Request $request)
    {
        $gameState = $request->session()->get('gameState');
        if (!$gameState) {
            return $this->start($request);
        }
        return response()->json($gameState);
    }

    public function move(Request $request)
    {
        try {
            $validated = $this->validateRequest($request);
            $gameState = $this->ensureGameState($request);

            $rodCost = ['small' => 5, 'medium' => 10, 'large' => 15][$validated['rodType']];
            $baitCost = ['red' => 1, 'blue' => 2, 'green' => 3][$validated['baitType']];
            $totalCost = $rodCost + ($baitCost * $validated['baitQuantity']);

            if ($totalCost > $gameState['gold']) {
                return response()->json([
                    'error' => 'Gold is not enough. You need ' . $totalCost . ' gold, but it only has ' . $gameState['gold']
                ], 422);
            }

            $result = $this->fishingService->processMove(
                $validated['rodType'],
                $validated['baitType'],
                $validated['baitQuantity'],
                $gameState
            );

            $request->session()->put('gameState', $result);
            return response()->json($result);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Input not valid',
                'errors' => $e->errors(),
                'gameState' => $request->session()->get('gameState')
            ], 422);
        }
    }

    private function validateRequest(Request $request): array
    {
        return $request->validate([
            'rodType' => 'required|in:small,medium,large',
            'baitType' => 'required|in:red,blue,green',
            'baitQuantity' => 'required|integer|min:1|max:100'
        ], [
            'baitQuantity.max' => 'The number of baits should not exceed 100',
            'baitQuantity.min' => 'Minimum number of baits 1'
        ]);
    }

    private function ensureGameState(Request $request): array
    {
        if (!$request->session()->has('gameState')) {
            $request->session()->put('gameState', $this->fishingService->initGame());
        }
        return $request->session()->get('gameState');
    }

    public function advanceDay(Request $request)
    {
        $gameState = $request->session()->get('gameState');
        $newState = $this->fishingService->advanceDay($gameState); // Pass current state
        $request->session()->put('gameState', $newState);
        return response()->json($newState);
    }
}
