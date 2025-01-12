import {requestService} from "../requestService.ts";
import {SensorOwn} from "../../types/domain.ts";

export const sensorsOwnGet = () => requestService<SensorOwn[]>({
    url: '/sensors/own',
    method: 'GET',
})