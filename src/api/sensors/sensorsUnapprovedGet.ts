import {requestService} from "../requestService.ts";
import {Sensor} from "../../types/domain.ts";

export const sensorsUnapprovedGet = () => requestService<Sensor[]>({
    url: '/sensors/unapproved',
    method: 'GET',
})