import {FC} from "react";
import {Map as MapGl, Marker} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {MAP_INITIAL_VIEWSTATE, MAPBOX_LIGHT_THEME_STYLE} from "../../constants/constants.ts";
import {Coordinates, Sensor} from "../../types/domain.ts";
import {MapSensor} from "../MapSensor/MapSensor.tsx";

type Props = {
    sensors?: Sensor[];
    point?: Coordinates;
    draggable?: boolean;
    onDragEnd?: (coordinates: Coordinates) => void;
}

export const Map: FC<Props> = ({ sensors, point, draggable, onDragEnd }) => {
    return (
        <MapGl
            mapboxAccessToken={window.mapboxAccessToken}
            initialViewState={MAP_INITIAL_VIEWSTATE}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            mapStyle={MAPBOX_LIGHT_THEME_STYLE}
        >
            {sensors?.map((sensor) => (
                <Marker
                    key={sensor.id}
                    longitude={sensor.coordinates.lng}
                    latitude={sensor.coordinates.lat}
                >
                    <MapSensor sensor={sensor} />
                </Marker>
            ))}
            {point && (
                <Marker
                    longitude={point.lng}
                    latitude={point.lat}
                    draggable={draggable}
                    onDragEnd={(v) => onDragEnd?.(v.lngLat)}
                />
            )}
        </MapGl>
    )
}