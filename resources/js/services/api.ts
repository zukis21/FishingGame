import axios from "axios";
import { GameState } from "@/types/game";

const api = axios.create({
    baseURL: "/api",
});

export const startGame = async (): Promise<GameState> => {
    const response = await api.get("/game/start");
    return response.data;
};

export const makeMove = async (
    rodType: FishSize,
    baitType: FishColor,
    baitQuantity: number
): Promise<GameState> => {
    const response = await api.post("/game/move", {
        rodType,
        baitType,
        baitQuantity,
    });
    return response.data;
};
