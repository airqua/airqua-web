import {useQuery} from "@tanstack/react-query";
import {accountTokenGet} from "../api/account/token/accountTokenGet.ts";

export const useToken = () => useQuery({
    queryKey: ['token'],
    queryFn: () => accountTokenGet().then(({ payload }) => payload)
})