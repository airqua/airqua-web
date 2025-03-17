import {FC} from "react";
import {SensorType} from "../../../../constants/constants.ts";
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import {ExportOutlined} from "@ant-design/icons";

type Props = {
    type: SensorType;
    onClose: VoidFunction;
}

export const CreateSensorSuccess: FC<Props> = ({ type, onClose }) => {
    const navigate = useNavigate();

    return (
        <Result
            status="success"
            title="Success!"
            subTitle="Once the sensor is approved by moderation team, it will show on the map"
            extra={[
                ...(type === 'wiot' ? [
                    <Button type="primary" onClick={() => navigate('/howto')} key="wiot">How to set up Wio Terminal?</Button>
                ] : []),
                ...(type === 'custom' ? [
                    <Button type="primary" onClick={() => navigate('/howto')} key="mqtt">MQTT Setup</Button>,
                    <Button
                        type="primary"
                        key="api"
                        icon={<ExportOutlined />}
                        href="https://api.airqua.uk"
                        target="_blank"
                    >API Docs</Button>
                ] : []),
                <Button onClick={onClose} key="close">Close</Button>
            ]}
        />
    )
}