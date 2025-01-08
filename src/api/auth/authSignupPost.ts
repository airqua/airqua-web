import {SignupPost} from "../../types/domain.ts";
import {requestService} from "../requestService.ts";

export const authSignupPost = (data: SignupPost) => requestService({
    url: '/auth/signup',
    method: 'POST',
    data
})