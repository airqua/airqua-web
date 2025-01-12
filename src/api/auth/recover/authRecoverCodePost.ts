import {RecoverCodePost} from "../../../types/domain.ts";
import {requestService} from "../../requestService.ts";

export const authRecoverCodePost = (code: string, data: RecoverCodePost) => requestService({
    url: `/auth/recover/${code}`,
    method: 'POST',
    data
})