import {FC} from "react";
import {Button, Result} from "antd";

type Props = {
    onClose: VoidFunction;
}

export const CreateSensorError: FC<Props> = ({ onClose }) => (
    <Result
        status="error"
        title="Error!"
        subTitle="Try again later or contact hi@airqua.uk (if you are a developer yourself - console output would be much appreciated :*)"
        extra={[
            <Button onClick={onClose} key="close">Close</Button>
        ]}
    />
)