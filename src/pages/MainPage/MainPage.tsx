import {SensorsMap} from "./components/SensorsMap/SensorsMap.tsx";
import {withAuth} from "../../hocs/withAuth.ts";

export const MainPage = withAuth(() => {
    return (
        <SensorsMap />
    );
});