import {requestService} from "../requestService.ts";

export const sensorsSensorIdVisiblePut = (sensorId: string, visible: boolean) => requestService({
    url: `/sensors/${sensorId}/visible`,
    method: 'PUT',
    data: { visible }
})