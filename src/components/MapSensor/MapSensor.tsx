import {FC, useState} from "react";
import cx from 'classnames';
import {Sensor} from "../../types/domain.ts";
import styles from './MapSensor.module.css';
import {Flex, Popover, Typography} from "antd";
import {SensorDataContent} from "../SensorDataContent/SensorDataContent.tsx";
import {useIsMobile} from "../../hooks/useIsMobile.ts";

const getSensorStatus = (sensor: Sensor) => {
    if(!sensor.active || !sensor.last_reading) return 'inactive';
    return sensor.last_reading?.values.every((value) => value.value <= value.metric.max) ? 'normal' : 'abnormal';
}

type Props = {
    sensor: Sensor;
}

export const MapSensor: FC<Props> = ({ sensor }) => {
    const isMobile = useIsMobile();

    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);

    const handleHoverChange = (open: boolean) => {
        setHovered(open);
        setClicked(false);
    };

    const handleClickChange = (open: boolean) => {
        setHovered(false);
        setClicked(open);
    };

    const handleClose = () => {
        setHovered(false);
        setClicked(false);
    }

    const briefSensorContent = (
        <Flex vertical>
            {sensor.last_reading?.values.map((value) => (
                <Typography.Text key={value.id}>
                    <Typography.Text strong>{value.metric.name}</Typography.Text> - {value.value} {value.metric.unit}
                </Typography.Text>
            ))}
        </Flex>
    )

    const innerPopover = (
        <Popover
            content={<SensorDataContent sensor={sensor} onClose={handleClose} />}
            trigger="click"
            open={clicked}
            onOpenChange={handleClickChange}
        >
            <div className={cx(styles.sensor, styles[`${getSensorStatus(sensor)}Readings`])}/>
        </Popover>
    );

    if(isMobile) {
        return innerPopover;
    }

    return (
        <Popover
            title={sensor.address.street}
            content={briefSensorContent}
            trigger="hover"
            open={hovered}
            onOpenChange={handleHoverChange}
        >
            {innerPopover}
        </Popover>
    )
}