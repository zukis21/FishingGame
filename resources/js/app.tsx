import { createRoot } from "react-dom/client";
import { useFishingGame } from "@/hooks/useFishingGame";
import { FishingGame } from "@/components/FishingGame";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect } from "react";

function App() {
    const {
        gameState,
        loading,
        error,
        handleMove,
        initializeGame,
        handleAdvanceDay,
    } = useFishingGame();

    const handleReset = () => {
        initializeGame();
    };

    if (error) return <ErrorMessage message={error} onRetry={handleReset} />;
    if (!gameState) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-blue-50 p-4">
            <FishingGame
                gameState={gameState}
                loading={loading}
                onMove={handleMove}
                onAdvanceDay={handleAdvanceDay}
                onReset={handleReset}
            />
        </div>
    );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
