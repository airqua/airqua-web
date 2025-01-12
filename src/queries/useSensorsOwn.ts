import {useQuery} from "@tanstack/react-query";
import {sensorsOwnGet} from "../api/sensors/sensorsOwnGet.ts";

export const useSensorsOwn = () => useQuery({
    queryKey: ['sensorsOwn'],
    queryFn: () => sensorsOwnGet().then(({ payload }) => payload)
})