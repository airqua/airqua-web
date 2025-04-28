import {requestService} from "../requestService.ts";
import {SensorApprovePut} from "../../types/domain.ts";

export const sensorsSensorIdApprovePut = (sensorId: string, approved: boolean) => requestService({
    url: `/sensors/${sensorId}/approve`,
    method: 'PUT',
    data: { approved } as SensorApprovePut
})