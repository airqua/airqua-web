import {requestService} from "../requestService.ts";
import {PasswordPut} from "../../types/domain.ts";

export const authPasswordPut = (data: PasswordPut) => requestService({
    url: '/auth/password',
    method: 'PUT',
    data
})