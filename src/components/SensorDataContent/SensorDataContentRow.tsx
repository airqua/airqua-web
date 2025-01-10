import {FC, useMemo, useState} from "react";
import {SensorReading, SensorReadingValue} from "../../types/domain.ts";
import styles from "./SensorDataContent.module.css";
import {Button, Empty, Flex, Tooltip, Typography} from "antd";
import cx from 'classnames';
import {TrendArrow} from "../TrendArrow/TrendArrow.tsx";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {SensorDataChart} from "../SensorDataChart/SensorDataChart.tsx";
import dayjs from "dayjs";

type Props = {
    value: SensorReadingValue;
    readings?: SensorReading[];
    expanded: boolean;
    compressed: boolean;
    onToggleExpand: VoidFunction;
}

export const SensorDataContentRow: FC<Props> = ({
    value,
    readings,
    expanded,
    compressed,
    onToggleExpand
}) => {
    // FIXME that's not good
    const prevReadingValue = readings?.[1]?.values.find((v) => v.metric.id === value.metric.id);

    const [chartSelectedDate, setChartSelectedDate] = useState(dayjs());
    const chartReadings = useMemo(() => readings?.filter(
        ({ created_at }) => dayjs(created_at).isSame(chartSelectedDate, 'date')
    ), [readings, chartSelectedDate]);

    return (
        <div className={cx(styles.valueRow, {
            [styles.valueRowExpanded]: expanded,
            [styles.valueRowCompressed]: compressed
        })} onClick={onToggleExpand}>
            <Flex className={styles.valueRowPanel} align="center" justify="space-between">
                <Typography.Title className={styles.valueRowText} level={4}>{value.metric.id.toUpperCase()}</Typography.Title>
                <Flex align="center" gap={8}>
                    {prevReadingValue && (
                        <TrendArrow current={value.value} prev={prevReadingValue.value} />
                    )}
                    <Typography.Title className={styles.valueRowText} level={4}>{value.value} {value.metric.unit}</Typography.Title>
                </Flex>
            </Flex>
            {readings?.length ? (
                <Flex vertical>
                    <Flex justify="space-between">
                        <Flex vertical>
                            <Typography.Text>{value.metric.name}</Typography.Text>
                            <Tooltip title={value.metric.description}>
                                <Typography.Paragraph
                                    type="secondary"
                                    ellipsis={{
                                        rows: 2,
                                        expandable: false
                                    }}
                                    className={styles.valueRowText}
                                >{value.metric.description}</Typography.Paragraph>
                            </Tooltip>
                        </Flex>
                        <Flex>
                            <Button
                                type="text"
                                size="small"
                                icon={<LeftOutlined />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setChartSelectedDate((d) => d.subtract(1, 'day'));
                                }}
                            />
                            <Button
                                type="text"
                                size="small"
                                icon={<RightOutlined />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setChartSelectedDate((d) => d.add(1, 'day'));
                                }}
                            />
                        </Flex>
                    </Flex>
                    <SensorDataChart value={value} readings={chartReadings!} />
                </Flex>
            ) : (
                <Flex align="center" justify="center">
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={<>It seems there's no data yet<br/>Come back in a little while</>}
                    />
                </Flex>
            )}
        </div>
    )
}