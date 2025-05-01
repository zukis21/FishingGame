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

    private const ROD_PRICES = [
        'small' => 5,
        'medium' => 10,
        'large' => 15
    ];

    private const BAIT_PRICES = [
        'red' => 1,
        'blue' => 2,
        'green' => 3
    ];

    public function initGame(): array
    {
        $this->gameState = [
            'gold' => 100,
            'day' => 1,
            'forecast' => $this->generateForecast(),
            'inventory' => [],
            'result' => null
        ];
        return $this->gameState;
    }

    public function getCurrentState(): array
    {
        return $this->gameState ?? $this->initGame();
    }

    public function processMove(string $rodType, string $baitType, int $baitQuantity): array
    {
        $currentState = $this->getCurrentState();

        $totalCost = self::ROD_PRICES[$rodType] + (self::BAIT_PRICES[$baitType] * $baitQuantity);

        if ($totalCost > $currentState['gold']) {
            throw new \RuntimeException('Not enough gold');
        }

        $this->gameState['gold'] -= $totalCost;
        $fishCaught = $this->catchFish($rodType, $baitType, $baitQuantity);
        $totalValue = $this->calculateFishValue($fishCaught);

        // Update state
        $this->gameState['inventory'] = [...$this->gameState['inventory'], ...$fishCaught];
        $this->gameState['gold'] += $totalValue;
        $this->gameState['day']++;
        $this->gameState['forecast'] = $this->generateForecast();
        $this->gameState['result'] = $this->checkResult();

        return $this->gameState;
    }

    private function generateForecast(): array
    {
        return [
            'fishCounts' => [
                'small' => rand(5, 15),
                'medium' => rand(1, 5),
                'large' => rand(1, 3)
            ],
            'colorDistribution' => [
                'red' => 30,
                'blue' => 40,
                'green' => 30
            ]
        ];
    }

    private function catchFish(string $rodType, string $baitType, int $quantity): array
    {
        return array_map(fn() => [
            'size' => $rodType,
            'color' => $baitType
        ], range(1, $quantity));
    }

    private function calculateFishValue(array $fishCaught): int
    {
        $valueMap = [
            'small' => [
                'red' => rand(1, 5),
                'blue' => rand(3, 5),
                'green' => 5
            ],
            'medium' => [
                'red' => rand(5, 10),
                'blue' => rand(8, 10),
                'green' => 10
            ],
            'large' => [
                'red' => rand(10, 15),
                'blue' => rand(13, 15),
                'green' => 15
            ]
        ];

        return array_reduce(
            $fishCaught,
            fn($sum, $fish) => $sum + $valueMap[$fish['size']][$fish['color']],
            0
        );
    }

    private function checkResult(): ?string
    {
        return match (true) {
            $this->gameState['gold'] > 100 => 'win',
            $this->gameState['gold'] < 100 => 'lose',
            default => null
        };
    }
}
