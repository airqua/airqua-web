import {FC} from "react";
import {CaretDownOutlined, CaretUpOutlined, MinusOutlined} from "@ant-design/icons";
import {theme} from "antd";

type Props = {
    current: number;
    prev: number;
}

export const TrendArrow: FC<Props> = ({ current, prev }) => {
    const { token } = theme.useToken();

    if(current > prev) {
        return <CaretUpOutlined style={{ color: token.colorError }} />;
    }

    if(current < prev) {
        return <CaretDownOutlined style={{ color: token.colorSuccess }} />;
    }

    return <MinusOutlined style={{ color: token.colorTextTertiary }} />;
}