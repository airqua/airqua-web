import {requestService} from "../requestService.ts";
import {LoginPost} from "../../types/domain.ts";

export const authLoginPost = (data: LoginPost) => requestService({
    url: '/auth/login',
    method: 'POST',
    data
})