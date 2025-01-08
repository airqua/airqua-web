import {requestService} from "../requestService.ts";
import {RecoverPost} from "../../types/domain.ts";

export const authRecoverPost = (data: RecoverPost) => requestService({
    url: '/auth/recover',
    method: 'POST',
    data
})