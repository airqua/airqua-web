import {FC, useState} from "react";
import {useOwnProfile} from "../../stores/OwnProfileStore.ts";
import {Navigate} from "react-router-dom";
import {withAuth} from "../../hocs/withAuth.ts";
import {App, Badge, Button, Flex, Popconfirm, Table, TableProps, Tooltip, Typography} from "antd";
import {useSensorsUnapproved} from "../../queries/useSensorsUnapproved.ts";
import {Coordinates, Sensor, SensorOwn} from "../../types/domain.ts";
import {CheckOutlined, GlobalOutlined} from "@ant-design/icons";
import {MapModal} from "../AccountPage/components/MapModal/MapModal.tsx";
import {sensorsSensorIdApprovePut} from "../../api/sensors/sensorsSensorIdApprovePut.ts";

export const AdminPage: FC = withAuth(() => {
    const { profile } = useOwnProfile();
    const { message } = App.useApp();

    const { data, isLoading, refetch } = useSensorsUnapproved();

    const [mapCoordinates, setMapCoordinates] = useState<Coordinates | null>(null);

    const handleApprove = (id: string) => {
        return sensorsSensorIdApprovePut(id, true).then(() => {
            void message.success('Approved!');
            void refetch();
        }).catch((e) => {
            console.error(e);
            void message.error(JSON.stringify(e));
        });
    }

    const columns: TableProps<Sensor>['columns'] = [
        {
            dataIndex: 'id',
            title: '#'
        },
        {
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
            key: 'approve',
            title: 'Approve',
            render: (_, sensor) => (
                <Popconfirm
                    title="Approve this sensor?"
                    description="It will become visible for everyone"
                    onConfirm={() => handleApprove(sensor.id)}
                >
                    <Button
                        icon={<CheckOutlined />}
                    >Approve</Button>
                </Popconfirm>
            )
        }
    ]

    if(!profile?.admin) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(r) => r.id}
                loading={isLoading}
            />
            <MapModal
                point={mapCoordinates}
                onClose={() => setMapCoordinates(null)}
            />
        </>
    );
}, true);