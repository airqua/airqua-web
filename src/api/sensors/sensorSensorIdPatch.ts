import {SensorPatch} from "../../types/domain.ts";
import {requestService} from "../requestService.ts";

export const sensorSensorIdPatch = (sensorId: string, data: SensorPatch) => requestService({
    url: `/sensors/${sensorId}`,
    method: 'PATCH',
    data
})