import {requestService} from "../../requestService.ts";
import {Session} from "../../../types/domain.ts";

export const authSessionsGet = () => requestService<Session[]>({
    url: '/auth/sessions',
    method: 'GET',
})