import {requestService} from "../requestService.ts";

export const sensorsSensorIdDelete = (sensorId: string) => requestService({
    url: `/sensors/${sensorId}`,
    method: 'DELETE',
})