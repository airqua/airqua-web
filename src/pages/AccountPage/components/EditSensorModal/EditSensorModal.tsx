import {FC, useState} from "react";
import {Coordinates, SensorOwn, SensorPatch} from "../../../../types/domain.ts";
import {App, Button, Flex, Form, FormProps, Input, InputNumber, Modal} from "antd";
import {sensorSensorIdPatch} from "../../../../api/sensors/sensorSensorIdPatch.ts";
import {GlobalOutlined} from "@ant-design/icons";
import {MapModal} from "../MapModal/MapModal.tsx";

type Props = {
    sensor: SensorOwn | null;
    onClose: VoidFunction;
    onUpdate: VoidFunction;
}

export const EditSensorModal: FC<Props> = ({ sensor, onClose, onUpdate }) => {
    const { message } = App.useApp();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleFinish: FormProps<SensorPatch>['onFinish'] = (values) => {
        setLoading(true);
        sensorSensorIdPatch(sensor!.id, values).then(() => {
            void message.success('Sensor changes saved');
            onUpdate();
        }).catch((e) => {
            console.error(e);
            void message.error('Error encountered while editing sensor');
        }).finally(() => setLoading(false));
    }

    const [mapCoordinates, setMapCoordinates] = useState<Coordinates | null>(null);

    return (
        <Modal
            title="Edit sensor"
            open={Boolean(sensor)}
            onOk={form.submit}
            okButtonProps={{ loading }}
            onCancel={onClose}
            destroyOnClose
        >
            <Form<SensorPatch>
                form={form}
                layout="vertical"
                initialValues={sensor || undefined}
                onFinish={handleFinish}
                preserve={false}
            >
                <Form.Item<SensorPatch> label="Address">
                    <Flex vertical gap={6}>
                        <Form.Item<SensorPatch> name={['address', 'street']} noStyle>
                            <Input placeholder="Address" />
                        </Form.Item>
                        <Form.Item<SensorPatch> name={['address', 'city']} noStyle>
                            <Input placeholder="City" />
                        </Form.Item>
                    </Flex>
                </Form.Item>
                <Form.Item<SensorPatch> label="Coordinates">
                    <Flex gap={6}>
                        <Form.Item<SensorPatch> name={['coordinates', 'lat']} noStyle>
                            <InputNumber
                                placeholder="Latitude"
                                step="0.00001"
                                style={{ flex: '1 0' }}
                            />
                        </Form.Item>
                        <Form.Item<SensorPatch> name={['coordinates', 'lng']} noStyle>
                            <InputNumber
                                placeholder="Longitude"
                                step="0.00001"
                                style={{ flex: '1 0' }}
                            />
                        </Form.Item>
                        <Button
                            icon={<GlobalOutlined />}
                            onClick={() => setMapCoordinates(form.getFieldValue('coordinates'))}
                        >Show map</Button>
                    </Flex>
                </Form.Item>
            </Form>
            <MapModal
                point={mapCoordinates}
                onClose={() => setMapCoordinates(null)}
                draggable
                onDragEnd={(v) => form.setFieldValue('coordinates', v)}
            />
        </Modal>
    )
}