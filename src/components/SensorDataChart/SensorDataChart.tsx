import {FC, useMemo} from "react";
import {SensorReading, SensorReadingValue} from "../../types/domain.ts";
import {Line} from "react-chartjs-2";
import dayjs from "dayjs";

const OPTIONS = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        title: { display: false },
    },
    scales: {
        x: {
            type: 'time' as const,
            time: {
                displayFormats: {
                    hour: 'HH:mm'
                }
            },
        },
    },
};

type Props = {
    value: SensorReadingValue;
    readings: SensorReading[];
}

export const SensorDataChart: FC<Props> = ({ value, readings }) => {
    const chartData = useMemo(() => {
        const dataPoints = readings.map(({ values, created_at }) => ({
            x: created_at,
            y: values.find(({ metric }) =>
                metric.id === value.metric.id
            )?.value
        })).filter((v) => v.y !== undefined);

        const startOfDay = dayjs(readings[0]?.created_at).startOf('day');
        const endOfDay = startOfDay.endOf('day');

        return {
            datasets: [
                {
                    label: "Readings",
                    data: dataPoints,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderWidth: 2,
                    tension: 0.4,
                },
                {
                    label: "Max",
                    data: [
                        { x: startOfDay.toISOString(), y: value.metric.max },
                        { x: endOfDay.toISOString(), y: value.metric.max }
                    ],
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 0
                },
            ],
        };
    }, [readings, value]);

    return (
        <Line options={OPTIONS} data={chartData} height={135} width={400} />
    )
}