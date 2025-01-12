import {AccountPatch} from "../../types/domain.ts";
import {requestService} from "../requestService.ts";

export const accountPatch = (data: AccountPatch) => requestService({
    url: '/account',
    method: 'PATCH',
    data
})