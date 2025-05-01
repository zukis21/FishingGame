import { useState, useEffect, useMemo } from "react";
import { GameState, FishSize, FishColor } from "@/types/game";
import { DayForecast } from "@/components/DayForecast";
import { Inventory } from "@/components/Inventory";
import { ResultModal } from "@/components/ResultModal";
import { FaFish, FaCoins } from "react-icons/fa";
import { GiFishingPole } from "react-icons/gi";

const ROD_PRICES: Record<FishSize, number> = {
    small: 5,
    medium: 10,
    large: 15,
};

const BAIT_PRICES: Record<FishColor, number> = {
    red: 1,
    blue: 2,
    green: 3,
};

interface FishingGameProps {
    gameState: GameState;
    loading: boolean;
    onMove: (
        rodType: FishSize,
        baitType: FishColor,
        baitQuantity: number
    ) => void;
    onReset: () => void;
}

export const FishingGame = ({
    gameState,
    loading,
    onMove,
    onReset,
}: FishingGameProps) => {
    const [rodType, setRodType] = useState<FishSize>("small");
    const [baitType, setBaitType] = useState<FishColor>("red");
    const [baitQuantity, setBaitQuantity] = useState(1);

    const maxBaitQuantity = useMemo(() => {
        const remainingGold = gameState.gold - ROD_PRICES[rodType];
        return Math.max(0, Math.floor(remainingGold / BAIT_PRICES[baitType]));
    }, [gameState.gold, rodType, baitType]);

    useEffect(() => {
        setBaitQuantity((prev) => Math.min(prev, maxBaitQuantity || 1));
    }, [maxBaitQuantity]);

    const totalCost =
        ROD_PRICES[rodType] + baitQuantity * BAIT_PRICES[baitType];

    return (
        <div className="container py-4">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="h4 mb-0">
                            <GiFishingPole className="me-2" />
                            Fishing Game
                        </h1>
                        <div className="d-flex gap-3">
                            <span className="badge bg-light text-dark fs-6">
                                <FaCoins className="me-1" />
                                Gold: {gameState.gold}
                            </span>
                            <span className="badge bg-light text-dark fs-6">
                                Day: {gameState.day}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <DayForecast forecast={gameState.forecast} />

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (maxBaitQuantity > 0)
                                onMove(rodType, baitType, baitQuantity);
                        }}
                        className="mb-4"
                    >
                        <div className="row g-3">
                            <div className="col-md-4">
                                <div className="card h-100">
                                    <div className="card-header bg-info text-white">
                                        <h3 className="h6 mb-0">Select Rod</h3>
                                    </div>
                                    <div className="card-body">
                                        {Object.entries(ROD_PRICES).map(
                                            ([type, price]) => (
                                                <div
                                                    key={type}
                                                    className="form-check mb-2"
                                                >
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="rod"
                                                        id={`rod-${type}`}
                                                        value={type}
                                                        checked={
                                                            rodType === type
                                                        }
                                                        onChange={() =>
                                                            setRodType(
                                                                type as FishSize
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        className="form-check-label d-flex justify-content-between"
                                                        htmlFor={`rod-${type}`}
                                                    >
                                                        <span className="text-capitalize">
                                                            {type} rod
                                                        </span>
                                                        <span className="badge bg-secondary">
                                                            {price} <FaCoins />
                                                        </span>
                                                    </label>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card h-100">
                                    <div className="card-header bg-info text-white">
                                        <h3 className="h6 mb-0">Select Bait</h3>
                                    </div>
                                    <div className="card-body">
                                        {Object.entries(BAIT_PRICES).map(
                                            ([type, price]) => (
                                                <div
                                                    key={type}
                                                    className="form-check mb-2"
                                                >
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="bait"
                                                        id={`bait-${type}`}
                                                        value={type}
                                                        checked={
                                                            baitType === type
                                                        }
                                                        onChange={() =>
                                                            setBaitType(
                                                                type as FishColor
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        className="form-check-label d-flex justify-content-between"
                                                        htmlFor={`bait-${type}`}
                                                    >
                                                        <span className="text-capitalize">
                                                            {type} bait
                                                        </span>
                                                        <span className="badge bg-secondary">
                                                            {price} <FaCoins />
                                                        </span>
                                                    </label>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card h-100">
                                    <div className="card-header bg-info text-white">
                                        <h3 className="h6 mb-0">
                                            Bait Quantity
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="baitQuantity"
                                                className="form-label"
                                            >
                                                Quantity: {baitQuantity}
                                            </label>
                                            <input
                                                type="range"
                                                className="form-range"
                                                min="1"
                                                max={maxBaitQuantity}
                                                value={baitQuantity}
                                                onChange={(e) =>
                                                    setBaitQuantity(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                disabled={maxBaitQuantity === 0}
                                                id="baitQuantity"
                                            />
                                        </div>
                                        <div className="alert alert-warning">
                                            <div className="d-flex justify-content-between">
                                                <span>Total Cost:</span>
                                                <strong>
                                                    {totalCost} <FaCoins />
                                                </strong>
                                            </div>
                                            {maxBaitQuantity === 0 && (
                                                <div className="text-danger small mt-1">
                                                    Not enough gold
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-grid mt-3">
                            <button
                                type="submit"
                                disabled={loading || maxBaitQuantity === 0}
                                className={`btn btn-${
                                    loading || maxBaitQuantity === 0
                                        ? "secondary"
                                        : "success"
                                } btn-lg`}
                            >
                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        Fishing...
                                    </>
                                ) : (
                                    <>
                                        <FaFish className="me-2" />
                                        Go Fishing!
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <Inventory inventory={gameState.inventory} />
                </div>
            </div>

            {gameState.result && (
                <ResultModal result={gameState.result} onClose={onReset} />
            )}
        </div>
    );
};
