import {useQuery} from "@tanstack/react-query";
import {sensorsSensorIdReadingsGet} from "../api/sensors/readings/sensorsSensorIdReadingsGet.ts";

export const useSensorReadings = (sensorId: string) => useQuery({
    queryKey: ['sensorReadings', sensorId],
    queryFn: () => sensorsSensorIdReadingsGet(sensorId).then(({ payload }) => payload)
})