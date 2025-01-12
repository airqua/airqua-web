import {requestService} from "../requestService.ts";

export const accountDelete = () => requestService({
    url: '/account',
    method: 'DELETE'
})