import {requestService} from "../../requestService.ts";
import {Token} from "../../../types/domain.ts";

export const accountTokenPut = () => requestService<Token>({
    url: '/account/token',
    method: 'PUT',
})