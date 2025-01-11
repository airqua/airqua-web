import {useQuery} from "@tanstack/react-query";
import {authTokenGet} from "../api/auth/token/authTokenGet.ts";

export const useToken = () => useQuery({
    queryKey: ['token'],
    queryFn: () => authTokenGet().then(({ payload }) => payload)
})