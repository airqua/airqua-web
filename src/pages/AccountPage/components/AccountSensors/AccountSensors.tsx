import {FC, useState} from "react";
import {App, Badge, Button, Card, Flex, Switch, Table, TableProps, Tooltip, Typography} from "antd";
import styles from './AccountSensors.module.css';
import {DeleteOutlined, EditOutlined, GlobalOutlined, KeyOutlined, PlusOutlined} from "@ant-design/icons";
import {Coordinates, SensorOwn} from "../../../../types/domain.ts";
import {useSensorsOwn} from "../../../../queries/useSensorsOwn.ts";
import {sensorsSensorIdVisiblePut} from "../../../../api/sensors/sensorsSensorIdVisiblePut.ts";
import {sensorsSensorIdDelete} from "../../../../api/sensors/sensorsSensorIdDelete.ts";
import {MapModal} from "../MapModal/MapModal.tsx";
import {CredentialsModal} from "../CredentialsModal/CredentialsModal.tsx";
import {EditSensorModal} from "../EditSensorModal/EditSensorModal.tsx";
import {CreateSensorModal} from "../CreateSensorModal/CreateSensorModal.tsx";

export const AccountSensors: FC = () => {
    const { message, modal } = App.useApp();

    const { data: sensors, isLoading, refetch } = useSensorsOwn();

    const [createSensorOpen, setCreateSensorOpen] = useState(false);

    const [mapCoordinates, setMapCoordinates] = useState<Coordinates | null>(null);
    const [credentialsSensorId, setCredentialsSensorId] = useState<string | null>(null);

    const handleVisibilityToggle = (sensorId: string, visible: boolean) => {
        sensorsSensorIdVisiblePut(sensorId, visible).then(() => {
            void message.success('Visibility changed');
            void refetch();
        }).catch((e) => {
            console.error(e);
            void message.error('Error encountered while changing visibility');
        });
    }

    const [editSensorModal, setEditSensorModal] = useState<SensorOwn | null>(null);

    const handleSensorDelete = async (sensorId: string) => {
        if(await modal.confirm({ title: 'Delete sensor?' })) {
            try {
                await sensorsSensorIdDelete(sensorId);
                void message.success('Sensor deleted');
                void refetch();
            } catch(e) {
                console.error(e);
                void message.error('Error encountered while deleting sensor');
            }
        }
    }

    const columns: TableProps<SensorOwn>['columns'] = [
        {
            key: 'address',
            dataIndex: 'address',
            title: 'Address',
            render: (address: SensorOwn['address'], { active }) => (
                <Flex align="center" gap={16}>
                    <Tooltip title={active ? 'Active' : 'Inactive'}>
                        <Badge color={active ? 'green' : 'red'} />
                    </Tooltip>
                    <Flex vertical>
                        <Typography.Text>{address.street}</Typography.Text>
                        <Typography.Text type="secondary">{address.city}</Typography.Text>
                    </Flex>
                </Flex>
            )
        },
        {
            key: 'coordinates',
            dataIndex: 'coordinates',
            title: 'Coordinates',
            render: (coordinates: SensorOwn['coordinates']) => (
                <Button
                    icon={<GlobalOutlined />}
                    onClick={() => setMapCoordinates(coordinates)}
                >Show map</Button>
            )
        },
        {
            key: 'id',
            dataIndex: 'id',
            title: 'Credentials',
            render: (id: SensorOwn['id']) => (
                <Button
                    icon={<KeyOutlined />}
                    onClick={() => setCredentialsSensorId(id)}
                >Show credentials</Button>
            )
        },
        {
            key: 'visible',
            dataIndex: 'visible',
            title: 'Visibility',
            render: (visible: SensorOwn['visible'], { id }) => (
                <Switch
                    value={visible}
                    onChange={(v) => handleVisibilityToggle(id, v)}
                />
            )
        },
        {
            key: 'edit',
            title: 'Edit',
            render: (_, sensor) => (
                <Button
                    icon={<EditOutlined />}
                    onClick={() => setEditSensorModal(sensor)}
                >Edit</Button>
            )
        },
        {
            key: 'delete',
            title: 'Delete',
            render: (_, { id }) => (
                <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleSensorDelete(id)}
                >Delete</Button>
            )
        }
    ]

    return (
        <Card
            title={(
                <Flex align="center" justify="space-between">
                    <Typography.Title level={3} className={styles.noMargin}>Sensors</Typography.Title>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setCreateSensorOpen(true)}
                    >Add sensor</Button>
                </Flex>
            )}
            className={styles.card}
            classNames={{ body: styles.cardBody }}
        >
            <Table
                columns={columns}
                dataSource={sensors?.map((sensor) => ({ ...sensor, key: sensor.id }))}
                loading={isLoading}
                pagination={{ pageSize: 9 }}
            />
            <MapModal
                point={mapCoordinates}
                onClose={() => setMapCoordinates(null)}
            />
            <CredentialsModal
                sensorId={credentialsSensorId}
                onClose={() => setCredentialsSensorId(null)}
            />
            <EditSensorModal
                sensor={editSensorModal}
                onClose={() => setEditSensorModal(null)}
                onUpdate={refetch}
            />
            <CreateSensorModal
                open={createSensorOpen}
                onClose={() => setCreateSensorOpen(false)}
                onCreate={refetch}
            />
        </Card>
    )
}