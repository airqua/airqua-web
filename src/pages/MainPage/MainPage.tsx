import {withAuth} from "../../hocs/withAuth.ts";
import { Map } from '../../components/Map/Map.tsx';
import {useSensors} from "../../queries/useSensors.ts";

export const MainPage = withAuth(() => {
    const { data: sensors } = useSensors();

    return (
        <Map sensors={sensors} />
    );
});