<?php

namespace App\Services;

class FishingService
{
    /**
     * Create a new class instance.
     */
    // public function __construct()
    // {
    //     //
    // }

    private array $gameState;

    public function __construct()
    {
        $this->initGame();
    }

    // private const ROD_PRICES = [
    //     'small' => 5,
    //     'medium' => 10,
    //     'large' => 15
    // ];

    // private const BAIT_PRICES = [
    //     'red' => 1,
    //     'blue' => 2,
    //     'green' => 3
    // ];

    public function initGame(): array
    {
        $this->gameState = [
            'gold' => 100,
            'day' => 1,
            'forecast' => $this->generateRandomForecast(),
            'inventory' => [],
            'result' => 'draw'
        ];
        return $this->gameState;
    }

    public function getCurrentState(): array
    {
        return $this->gameState ?? $this->initGame();
    }

    public function processMove(string $rodType, string $baitType, int $baitQuantity, array $currentState): array
    {
        $gameState = $currentState;

        //Count cost
        $rodCost = ['small' => 5, 'medium' => 10, 'large' => 15][$rodType];
        $baitCost = ['red' => 1, 'blue' => 2, 'green' => 3][$baitType];
        $totalCost = $rodCost + ($baitCost * $baitQuantity);

        // Process fishing
        $gameState['gold'] -= $totalCost;
        $fishCaught = $this->catchFish($rodType, $baitType, $baitQuantity);
        $totalValue = $this->calculateFishValue($fishCaught);
        $gameState['gold'] += $totalValue;

        // Determine result before incrementing day
        $gameState['result'] = $this->determineResult($gameState['gold']);
        $gameState['inventory'] = [...$gameState['inventory'], ...$fishCaught];

        return $gameState;
    }

    public function advanceDay(array $currentState): array
    {
        $gameState = $currentState;
        $gameState['day']++;
        $gameState['forecast'] = $this->generateRandomForecast();
        $gameState['result'] = null;
        return $gameState;
    }

    private function determineResult(int $gold): string
    {
        if ($gold > 100) return 'win';
        if ($gold < 100) return 'lose';
        return 'draw';
    }

    private function generateRandomForecast(): array
    {
        return [
            'fishCounts' => [
                'small' => rand(5, 15),
                'medium' => rand(1, 5),
                'large' => rand(1, 3)
            ],
            'colorDistribution' => $this->generateColorDistribution()
        ];
    }

    private function generateColorDistribution(): array
    {
        $red = rand(20, 40);
        $blue = rand(20, 60 - $red);
        $green = 100 - $red - $blue;

        return [
            'red' => $red,
            'blue' => $blue,
            'green' => $green
        ];
    }

    private function catchFish(string $rodType, string $baitType, int $quantity): array
    {
        return array_fill(0, $quantity, [
            'size' => $rodType,
            'color' => $baitType
        ]);
    }

    private function calculateFishValue(array $fishCaught): int
    {
        $valueMap = [
            'small' => ['red' => rand(1, 5), 'blue' => rand(3, 5), 'green' => 5],
            'medium' => ['red' => rand(5, 10), 'blue' => rand(8, 10), 'green' => 10],
            'large' => ['red' => rand(10, 15), 'blue' => rand(13, 15), 'green' => 15]
        ];

        return array_reduce(
            $fishCaught,
            fn($sum, $fish) => $sum + $valueMap[$fish['size']][$fish['color']],
            0
        );
    }
}
