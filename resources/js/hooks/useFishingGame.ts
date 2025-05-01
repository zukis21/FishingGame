import { useState, useEffect, useCallback } from "react";
import { startGame, makeMove } from "@/services/api";
import { GameState, FishSize, FishColor } from "@/types/game";
import axios from "axios";

export const useFishingGame = () => {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchGameState = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/game/state");
            setGameState(response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to fetch game state");
        } finally {
            setLoading(false);
        }
    };

    const initializeGame = async () => {
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
    };

    const handleMove = async (
        rodType: FishSize,
        baitType: FishColor,
        baitQuantity: number
    ) => {
        setLoading(true);

        try {
            const response = await axios.post("/api/game/move", {
                rodType,
                baitType,
                baitQuantity,
            });

            if (!response.data?.gold) {
                throw new Error("Server returned invalid game state");
            }

            setGameState(response.data);
        } catch (err: any) {
            if (err.response?.data?.errors?.baitQuantity) {
                const errorMsg = err.response.data.errors.baitQuantity[0];
                alert(errorMsg);
            } else if (err.response?.data?.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while processing");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAdvanceDay = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/game/advance");
            setGameState(response.data);
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to advance day");
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     initializeGame();
    // }, [initializeGame]);

    // Load game state on initial render
    useEffect(() => {
        fetchGameState();
    }, []);

    return {
        gameState,
        loading,
        error,
        handleMove,
        initializeGame,
        handleAdvanceDay,
    };
};
