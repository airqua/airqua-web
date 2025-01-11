import {requestService} from "../../requestService.ts";
import {Token} from "../../../types/domain.ts";

export const authTokenGet = () => requestService<Token>({
    url: '/auth/token',
    method: 'GET'
})