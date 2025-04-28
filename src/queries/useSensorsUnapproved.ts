import {useQuery} from "@tanstack/react-query";
import {sensorsUnapprovedGet} from "../api/sensors/sensorsUnapprovedGet.ts";

export const useSensorsUnapproved = () => useQuery({
    queryKey: ['sensorsUnapproved'],
    queryFn: () => sensorsUnapprovedGet().then(({ payload }) => payload)
})