import {FC} from "react";
import {Modal} from "antd";
import {Map} from "../../../../components/Map/Map.tsx";
import {Coordinates} from "../../../../types/domain.ts";
import styles from './MapModal.module.css';

type Props = {
    point: Coordinates | null;
    onClose: VoidFunction;
}

export const MapModal: FC<Props> = ({ point, onClose }) => {
    return (
        <Modal
            open={Boolean(point)}
            onCancel={onClose}
            footer={null}
            classNames={{ content: styles.modalContent, body: styles.modalBody }}
        >
            <Map point={point || undefined} />
        </Modal>
    )
}