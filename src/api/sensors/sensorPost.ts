import {SensorPost} from "../../types/domain.ts";
import {requestService} from "../requestService.ts";

export const sensorPost = (data: SensorPost) => requestService({
    url: '/sensors',
    method: 'POST',
    data
})