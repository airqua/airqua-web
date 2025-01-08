import {requestService} from "../requestService.ts";
import {User} from "../../types/domain.ts";

export const authGet = () => requestService<User>({
    url: '/auth',
    method: 'GET'
})