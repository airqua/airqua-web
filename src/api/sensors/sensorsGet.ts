import {requestService} from "../requestService.ts";
import {Sensor} from "../../types/domain.ts";

export const sensorsGet = () => requestService<Sensor[]>({
    url: '/sensors',
    method: 'GET',
})