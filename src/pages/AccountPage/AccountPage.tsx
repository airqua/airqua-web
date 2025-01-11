import {withAuth} from "../../hocs/withAuth.ts";
import styles from './AccountPage.module.css';
import {AccountSensors} from "./components/AccountSensors/AccountSensors.tsx";
import {AccountInfo} from "./components/AccountInfo/AccountInfo.tsx";

export const AccountPage = withAuth(() => {
    return (
        <div className={styles.container}>
            <AccountSensors />
            <AccountInfo />
        </div>
    );
}, true);