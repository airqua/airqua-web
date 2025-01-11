import {requestService} from "../../requestService.ts";

export const authSessionsDelete = () => requestService({
    url: '/auth/sessions',
    method: 'DELETE',
})