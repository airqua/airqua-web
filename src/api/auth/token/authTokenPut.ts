import {requestService} from "../../requestService.ts";
import {Token} from "../../../types/domain.ts";

export const authTokenPut = () => requestService<Token>({
    url: '/auth/token',
    method: 'PUT',
})