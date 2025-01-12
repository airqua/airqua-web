import {FC, useState} from "react";
import {SensorOwn, SensorPatch} from "../../../../types/domain.ts";
import {App, Flex, Form, FormProps, Input, InputNumber, Modal} from "antd";
import {sensorSensorIdPatch} from "../../../../api/sensors/sensorSensorIdPatch.ts";

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

    return (
        <Modal
            title="Edit sensor"
            open={Boolean(sensor)}
            onOk={form.submit}
            okButtonProps={{ loading }}
            onCancel={onClose}
        >
            <Form<SensorPatch>
                form={form}
                layout="vertical"
                initialValues={sensor || undefined}
                onFinish={handleFinish}
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
                            />
                        </Form.Item>
                        <Form.Item<SensorPatch> name={['coordinates', 'lng']} noStyle>
                            <InputNumber
                                placeholder="Longitude"
                                step="0.00001"
                            />
                        </Form.Item>
                    </Flex>
                </Form.Item>
            </Form>
        </Modal>
    )
}