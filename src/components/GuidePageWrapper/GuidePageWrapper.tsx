import {FC, PropsWithChildren} from "react";
import styles from './GuidePageWrapper.module.css';

export const GuidePageWrapper: FC<PropsWithChildren> = ({ children }) => (
    <div className={styles.content}>
        {children}
    </div>
)