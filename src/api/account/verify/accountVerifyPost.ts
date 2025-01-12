import {requestService} from "../../requestService.ts";

export const accountVerifyPost = () => requestService({
    url: '/account/verify',
    method: 'POST',
})