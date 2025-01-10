import {FC, useState} from "react";
import {Sensor} from "../../types/domain.ts";
import {Button, Flex, Typography} from "antd";
import styles from './SensorDataContent.module.css';
import {CloseOutlined} from "@ant-design/icons";
import {useSensorReadings} from "../../queries/useSensorReadings.ts";
import {SensorDataContentRow} from "./SensorDataContentRow.tsx";

type Props = {
    sensor: Sensor;
    onClose: VoidFunction;
}

export const SensorDataContent: FC<Props> = ({ sensor, onClose }) => {
    const { data: readings } = useSensorReadings(sensor.id);
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    return (
        <Flex vertical className={styles.container}>
            <Flex justify="space-between" className={styles.titleContainer}>
                <Typography.Title level={3} className={styles.title}>
                    {sensor.address.street}, {sensor.address.city}
                </Typography.Title>
                <Button
                    type="text"
                    size="small"
                    icon={<CloseOutlined />}
                    onClick={onClose}
                />
            </Flex>
            {sensor.last_reading?.values.map((value) => (
                <SensorDataContentRow
                    key={value.id}
                    value={value}
                    readings={readings}
                    expanded={expandedRow === value.id}
                    compressed={Boolean(expandedRow && expandedRow !== value.id)}
                    onToggleExpand={() => setExpandedRow((r) => r === value.id ? null : value.id)}
                />
            ))}
        </Flex>
    )
}