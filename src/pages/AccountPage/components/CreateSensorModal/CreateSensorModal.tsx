import {FC, useState} from "react";
import {Button, Flex, Form, FormProps, Input, InputNumber, Modal, Segmented} from "antd";
import {Coordinates, SensorPost} from "../../../../types/domain.ts";
import {GlobalOutlined} from "@ant-design/icons";
import {MapModal} from "../MapModal/MapModal.tsx";
import {sensorPost} from "../../../../api/sensors/sensorPost.ts";
import {SENSOR_TYPES_SEGMENTS, SensorType} from "../../../../constants/constants.ts";
import {CreateSensorSuccess} from "./CreateSensorSuccess.tsx";
import {CreateSensorError} from "./CreateSensorError.tsx";

type Props = {
    open: boolean;
    onClose: VoidFunction;
    onCreate: VoidFunction;
}

export const CreateSensorModal: FC<Props> = ({ open, onClose, onCreate }) => {
    const [form] = Form.useForm<SensorPost>();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState<SensorType>('wiot');
    const [state, setState] = useState<'form' | 'success' | 'error'>('form');

    const [mapCoordinates, setMapCoordinates] = useState<Coordinates | null>(null);

    const handleFinish: FormProps<SensorPost>['onFinish'] = (values) => {
        setLoading(true);
        sensorPost(values).then(() => {
            onCreate();
            setState('success');
        }).catch((e) => {
            console.error(e);
            setState('error');
        }).finally(() => setLoading(false));
    }

    return (
        <Modal
            title="Add sensor"
            open={open}
            onOk={form.submit}
            okButtonProps={{ loading }}
            onCancel={onClose}
            destroyOnClose
            footer={state !== 'form' ? null : undefined}
        >
            {state === 'form' && (
                <>
                    <Form<SensorPost>
                        form={form}
                        layout="vertical"
                        onFinish={handleFinish}
                        preserve={false}
                    >
                        <Form.Item label="Type">
                            <Segmented
                                options={SENSOR_TYPES_SEGMENTS}
                                value={type}
                                onChange={setType}
                            />
                        </Form.Item>
                        <Form.Item<SensorPost> label="Address">
                            <Flex vertical gap={6}>
                                <Form.Item<SensorPost>
                                    name={['address', 'street']}
                                    noStyle
                                    rules={[{ type: 'string', required: true, whitespace: true }]}
                                >
                                    <Input placeholder="Address" />
                                </Form.Item>
                                <Form.Item<SensorPost>
                                    name={['address', 'city']}
                                    noStyle
                                    rules={[{ type: 'string', required: true, whitespace: true }]}
                                >
                                    <Input placeholder="City" />
                                </Form.Item>
                            </Flex>
                        </Form.Item>
                        <Form.Item<SensorPost> label="Coordinates">
                            <Flex gap={6}>
                                <Form.Item<SensorPost>
                                    name={['coordinates', 'lat']}
                                    noStyle
                                    rules={[{ type: 'number', required: true }]}
                                >
                                    <InputNumber
                                        placeholder="Latitude"
                                        step="0.00001"
                                        style={{ flex: '1 0' }}
                                    />
                                </Form.Item>
                                <Form.Item<SensorPost>
                                    name={['coordinates', 'lng']}
                                    noStyle
                                    rules={[{ type: 'number', required: true }]}
                                >
                                    <InputNumber
                                        placeholder="Longitude"
                                        step="0.00001"
                                        style={{ flex: '1 0' }}
                                    />
                                </Form.Item>
                                <Button
                                    icon={<GlobalOutlined />}
                                    onClick={() => {
                                        const coordinates = form.getFieldValue('coordinates');
                                        setMapCoordinates({
                                            lat: coordinates?.lat || 51.4545,
                                            lng: coordinates?.lng || -2.5879
                                        })
                                    }}
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
                </>
            )}
            {state === 'success' && <CreateSensorSuccess type={type} onClose={onClose} />}
            {state === 'error' && <CreateSensorError onClose={onClose} />}
        </Modal>
    )
}