import {requestService} from "../../requestService.ts";

export const accountVerifyCodePost = (code: string) => requestService({
    url: `/account/verify/${code}`,
    method: 'POST'
})