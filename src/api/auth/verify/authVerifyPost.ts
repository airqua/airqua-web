import {requestService} from "../../requestService.ts";

export const authVerifyPost = () => requestService({
    url: '/auth/verify',
    method: 'POST',
})