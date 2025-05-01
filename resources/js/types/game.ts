export type FishSize = "small" | "medium" | "large";
export type FishColor = "red" | "blue" | "green";

export interface Fish {
    size: FishSize;
    color: FishColor;
}

export interface GameForecast {
    fishCounts: Record<FishSize, number>;
    colorDistribution: Record<FishColor, number>;
}

export interface GameState {
    gold: number;
    day: number;
    forecast: GameForecast;
    inventory: Fish[];
    result: "win" | "lose" | null;
}
