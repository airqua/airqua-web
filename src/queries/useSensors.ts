import {useQuery} from "@tanstack/react-query";
import {sensorsGet} from "../api/sensors/sensorsGet.ts";

export const useSensors = () => useQuery({
    queryKey: ['sensors'],
    queryFn: () => sensorsGet().then(({ payload }) => payload)
})