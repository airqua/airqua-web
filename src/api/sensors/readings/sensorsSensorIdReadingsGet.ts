import {requestService} from "../../requestService.ts";
import {SensorReading} from "../../../types/domain.ts";

export const sensorsSensorIdReadingsGet = (sensorId: string) => requestService<SensorReading[]>({
    url: `/sensors/${sensorId}/readings`,
    method: 'GET'
})