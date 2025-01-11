import {FC} from "react";
import {Card} from "antd";
import styles from './AccountSensors.module.css';

export const AccountSensors: FC = () => {
    return (
        <Card
            className={styles.card}
            classNames={{ body: styles.cardBody }}
        />
    )
}