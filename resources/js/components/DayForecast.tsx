import { GameForecast } from "@/types/game";
import { WiRaindrop, WiDaySunny, WiCloudy } from "react-icons/wi";

interface DayForecastProps {
    forecast: GameForecast;
}

export const DayForecast = ({ forecast }: DayForecastProps) => {
    const getWeatherIcon = (count: number) => {
        if (count > 10) return <WiDaySunny className="text-warning" />;
        if (count > 5) return <WiCloudy className="text-info" />;
        return <WiRaindrop className="text-primary" />;
    };

    return (
        <div className="card mb-4">
            <div className="card-header bg-info text-white">
                <h2 className="h5 mb-0">Today's Forecast</h2>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="h6 text-muted mb-3">Fish Population</h3>
                        <ul className="list-group">
                            {Object.entries(forecast.fishCounts).map(
                                ([size, count]) => (
                                    <li
                                        key={size}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <span className="text-capitalize">
                                            {size}
                                        </span>
                                        <span className="badge bg-primary rounded-pill">
                                            {count} {getWeatherIcon(count)}
                                        </span>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h3 className="h6 text-muted mb-3">
                            Color Distribution
                        </h3>
                        <div
                            className="progress mb-2"
                            style={{ height: "20px" }}
                        >
                            <div
                                className="progress-bar bg-danger"
                                style={{
                                    width: `${forecast.colorDistribution.red}%`,
                                }}
                            >
                                {forecast.colorDistribution.red}%
                            </div>
                        </div>
                        <div
                            className="progress mb-2"
                            style={{ height: "20px" }}
                        >
                            <div
                                className="progress-bar bg-primary"
                                style={{
                                    width: `${forecast.colorDistribution.blue}%`,
                                }}
                            >
                                {forecast.colorDistribution.blue}%
                            </div>
                        </div>
                        <div className="progress" style={{ height: "20px" }}>
                            <div
                                className="progress-bar bg-success"
                                style={{
                                    width: `${forecast.colorDistribution.green}%`,
                                }}
                            >
                                {forecast.colorDistribution.green}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
