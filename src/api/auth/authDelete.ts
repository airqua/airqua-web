import {requestService} from "../requestService.ts";

export const authDelete = () => requestService({
    url: '/auth',
    method: 'DELETE',
})