import {FC} from "react";
import {useToken} from "../../../../queries/useToken.ts";
import {Form, Input, Modal} from "antd";

type Props = {
    sensorId: string | null;
    onClose: VoidFunction;
}

export const CredentialsModal: FC<Props> = ({ sensorId, onClose }) => {
    const { data: token } = useToken();

    return (
        <Modal
            title="Sensor credentials"
            open={Boolean(sensorId)}
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={onClose}
        >
            <Form layout="vertical">
                <Form.Item label="Sensor identificator">
                    <Input value={sensorId || undefined} />
                </Form.Item>
                <Form.Item label="Token">
                    <Input.Password value={token?.token} />
                </Form.Item>
            </Form>
        </Modal>
    )
}