import {FC} from "react";
import {Map} from "react-map-gl";
import {MAP_INITIAL_VIEWSTATE, MAPBOX_LIGHT_THEME_STYLE} from "../../../../constants/constants.ts";
import "mapbox-gl/dist/mapbox-gl.css";

export const SensorsMap: FC = () => {
    return (
        <Map
            mapboxAccessToken={window.mapboxAccessToken}
            initialViewState={MAP_INITIAL_VIEWSTATE}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            mapStyle={MAPBOX_LIGHT_THEME_STYLE}
        />
    )
}