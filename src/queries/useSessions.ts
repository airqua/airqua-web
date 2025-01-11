import {useQuery} from "@tanstack/react-query";
import {authSessionsGet} from "../api/auth/sessions/authSessionsGet.ts";

export const useSessions = () => useQuery({
    queryKey: ['sessions'],
    queryFn: () => authSessionsGet().then(({ payload }) => payload)
})