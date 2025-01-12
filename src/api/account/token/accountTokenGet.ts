import {requestService} from "../../requestService.ts";
import {Token} from "../../../types/domain.ts";

export const accountTokenGet = () => requestService<Token>({
    url: '/account/token',
    method: 'GET'
})