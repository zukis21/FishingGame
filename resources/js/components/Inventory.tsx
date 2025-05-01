import { Fish } from "@/types/game";
import { FaFish } from "react-icons/fa";

interface InventoryProps {
    inventory: Fish[];
}

export const Inventory = ({ inventory }: InventoryProps) => {
    const countFish = () => {
        const counts = {
            small: { red: 0, blue: 0, green: 0 },
            medium: { red: 0, blue: 0, green: 0 },
            large: { red: 0, blue: 0, green: 0 },
        };

        inventory.forEach((fish) => {
            counts[fish.size][fish.color]++;
        });

        return counts;
    };

    const fishCounts = countFish();
    const getColorClass = (color: string) => {
        switch (color) {
            case "red":
                return "bg-danger";
            case "blue":
                return "bg-primary";
            case "green":
                return "bg-success";
            default:
                return "bg-secondary";
        }
    };

    return (
        <div className="card">
            <div className="card-header bg-info text-white">
                <h2 className="h5 mb-0 d-flex align-items-center">
                    <FaFish className="me-2" />
                    Your Catch
                </h2>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Size</th>
                                <th className="text-center">Red</th>
                                <th className="text-center">Blue</th>
                                <th className="text-center">Green</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(fishCounts).map(
                                ([size, colors]) => (
                                    <tr key={size}>
                                        <td className="text-capitalize">
                                            {size}
                                        </td>
                                        {Object.entries(colors).map(
                                            ([color, count]) => (
                                                <td
                                                    key={color}
                                                    className="text-center"
                                                >
                                                    {count > 0 ? (
                                                        <span
                                                            className={`badge ${getColorClass(
                                                                color
                                                            )} rounded-pill`}
                                                        >
                                                            {count}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted">
                                                            0
                                                        </span>
                                                    )}
                                                </td>
                                            )
                                        )}
                                    </tr>
                                )
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th colSpan={3} className="text-center">
                                    <span className="badge bg-dark rounded-pill">
                                        {inventory.length} fishes
                                    </span>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};
