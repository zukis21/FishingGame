import { FaTrophy, FaSadTear, FaRedo, FaArrowRight } from "react-icons/fa";

interface ResultModalProps {
    result: "win" | "lose" | "draw";
    currentGold: number;
    currentDay: number;
    onContinue: () => void;
    onNewGame: () => void;
}

export const ResultModal = ({
    result,
    currentGold,
    currentDay,
    onContinue,
    onNewGame,
}: ResultModalProps) => {
    const config = {
        win: {
            title: "You Won!",
            icon: <FaTrophy className="text-warning" size={48} />,
            bg: "bg-success",
        },
        lose: {
            title: "You Lost",
            icon: <FaSadTear className="text-danger" size={48} />,
            bg: "bg-danger",
        },
        draw: {
            title: "Draw!",
            icon: <FaRedo className="text-info" size={48} />,
            bg: "bg-info",
        },
    }[result];

    return (
        <div
            className="modal show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className={`modal-content ${config.bg} text-white`}>
                    <div className="modal-header border-0">
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onContinue}
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body text-center py-4">
                        <div className="mb-3">{config.icon}</div>
                        <h3>{config.title}</h3>
                        <p className="mb-1">Gold: {currentGold}</p>
                        <p>Current Day: {currentDay}</p>
                    </div>
                    <div className="modal-footer border-0 justify-content-center">
                        <button
                            onClick={onContinue}
                            className="btn btn-outline-light me-2"
                        >
                            <FaArrowRight className="me-2" />
                            Continue to Day {currentDay + 1}
                        </button>
                        <button onClick={onNewGame} className="btn btn-light">
                            <FaRedo className="me-2" />
                            New Game
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
