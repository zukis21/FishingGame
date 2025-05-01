import { useState, useEffect, useCallback } from "react";
import { startGame, makeMove } from "@/services/api";
import { GameState, FishSize, FishColor } from "@/types/game";
import axios from "axios";

export const useFishingGame = () => {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const initializeGame = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/game/start");

            if (!response.data?.gold) {
                throw new Error("Invalid game initialization");
            }

            setGameState(response.data);
            setError(null);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to start game"
            );
            console.error("Initialization error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleMove = useCallback(
        async (
            rodType: FishSize,
            baitType: FishColor,
            baitQuantity: number
        ) => {
            if (!gameState || loading) return;

            try {
                setLoading(true);
                const response = await axios.post("/api/game/move", {
                    rodType,
                    baitType,
                    baitQuantity,
                });

                if (!response.data?.gold) {
                    throw new Error("Server returned invalid game state");
                }

                setGameState(response.data);
                setError(null);
            } catch (err) {
                let errorMessage = "Failed to process move";

                if (axios.isAxiosError(err)) {
                    errorMessage = err.response?.data?.error || err.message;

                    if (err.response?.status === 400) {
                        errorMessage += ". Please try restarting the game.";
                    }
                }

                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        },
        [gameState, loading]
    );

    useEffect(() => {
        initializeGame();
    }, [initializeGame]);

    return {
        gameState,
        loading,
        error,
        handleMove,
        resetGame: initializeGame,
    };
};
