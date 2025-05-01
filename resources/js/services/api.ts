import axios from "axios";
import { GameState, FishSize, FishColor } from "@/types/game";

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

export const processDay = async (
    skipDay: boolean,
    rodType: FishSize | null,
    baitType: FishColor | null,
    baitQuantity: number | null
) => {
    const response = await axios.post("/api/game/move", {
        skipDay,
        rodType: skipDay ? null : rodType,
        baitType: skipDay ? null : baitType,
        baitQuantity: skipDay ? null : baitQuantity,
    });
    return response.data;
};
