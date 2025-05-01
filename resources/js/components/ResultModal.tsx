import { GameState } from "@/types/game";
import { FaTrophy, FaSadTear, FaRedo } from "react-icons/fa";

interface ResultModalProps {
    result: NonNullable<GameState["result"]>;
    onClose: () => void;
}

export const ResultModal = ({ result, onClose }: ResultModalProps) => {
    const config = {
        win: {
            title: "Congratulations!",
            message: "You won the game with your fishing skills!",
            icon: <FaTrophy className="text-warning" size={48} />,
            bg: "bg-success",
        },
        lose: {
            title: "Game Over",
            message: "Better luck next time!",
            icon: <FaSadTear className="text-danger" size={48} />,
            bg: "bg-danger",
        },
    }[result];

    return (
        <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className={`modal-content ${config.bg} text-white`}>
                    <div className="modal-body text-center py-5">
                        <div className="mb-4">{config.icon}</div>
                        <h2 className="modal-title mb-3">{config.title}</h2>
                        <p className="mb-4">{config.message}</p>
                        <button
                            onClick={onClose}
                            className="btn btn-light px-4"
                        >
                            <FaRedo className="me-2" />
                            Play Again
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
