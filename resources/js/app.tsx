import { createRoot } from "react-dom/client";
import { useFishingGame } from "@/hooks/useFishingGame";
import { FishingGame } from "@/components/FishingGame";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
    const { gameState, loading, error, handleMove, resetGame } =
        useFishingGame();

    if (error) return <ErrorMessage message={error} onRetry={resetGame} />;
    if (!gameState) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-blue-50 p-4">
            <FishingGame
                gameState={gameState}
                onMove={handleMove}
                loading={loading}
                onReset={resetGame}
            />
        </div>
    );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
