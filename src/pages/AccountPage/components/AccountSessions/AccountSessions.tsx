import {FC} from "react";
import {Flex, Typography} from "antd";
import {useSessions} from "../../../../queries/useSessions.ts";
import styles from './AccountSessions.module.css';
import dayjs from "dayjs";

export const AuthSessions: FC = () => {
    const { data: sessions } = useSessions();

    return (
        <Flex vertical flex="1 0">
            {sessions?.map((session) => (
                <Flex key={session.id} align="center" justify="space-between" className={styles.session}>
                    <Typography.Text strong>{session.id}</Typography.Text>
                    <Flex vertical>
                        <Typography.Text type="secondary">
                            Created: {dayjs(session.created_at).format('DD.MM.YYYY HH:mm')}
                        </Typography.Text>
                        <Typography.Text type="secondary">
                            Valid until: {dayjs(session.valid_until).format('DD.MM.YYYY HH:mm')}
                        </Typography.Text>
                    </Flex>
                </Flex>
            ))}
        </Flex>
    )
}