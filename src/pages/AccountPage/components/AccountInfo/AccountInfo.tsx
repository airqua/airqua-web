import {FC, useState} from "react";
import {App, Button, Card, Divider, Flex, Input, Typography} from "antd";
import styles from './AccountInfo.module.css';
import {useOwnProfile} from "../../../../stores/OwnProfileStore.ts";
import {ApiOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {accountVerifyPost} from "../../../../api/account/verify/accountVerifyPost.ts";
import {AuthSessions} from "../AccountSessions/AccountSessions.tsx";
import {useToken} from "../../../../queries/useToken.ts";
import {EditProfileModal} from "../EditProfileModal/EditProfileModal.tsx";
import {accountTokenPut} from "../../../../api/account/token/accountTokenPut.ts";
import {authSessionsDelete} from "../../../../api/auth/sessions/authSessionsDelete.ts";
import {accountDelete} from "../../../../api/account/accountDelete.ts";
import {useNavigate} from "react-router-dom";

export const AccountInfo: FC = () => {
    const { modal, message } = App.useApp();

    const { profile, setProfile } = useOwnProfile();
    const { data: token } = useToken();
    const navigate = useNavigate();

    const [verifyLoading, setVerifyLoading] = useState(false);
    const handleVerifyClick = async () => {
        if(await modal.confirm({ title: 'Resend verification email?' })) {
            setVerifyLoading(true);
            try {
                await accountVerifyPost();
                message.success('Success! Please check your inbox')
            } catch(e) {
                console.error(e);
                message.error('Seems like previous email you received is still valid');
            } finally {
                setVerifyLoading(false);
            }
        }
    }

    const [editAccountModalOpen, setEditAccountModalOpened] = useState(false);

    const [tokenRegenLoading, setTokenRegenLoading] = useState(false);
    const handleTokenRegenerate = async () => {
        if(await modal.confirm({ title: 'Generate new token?' })) {
            setTokenRegenLoading(true);
            try {
                await accountTokenPut();
                message.success('Success! Please update all sensors that might use old token');
            } catch(e) {
                console.error(e);
                message.error('Unknown error encountered while generating new token');
            } finally {
                setTokenRegenLoading(false);
            }
        }
    }

    const [sessionsDeleteLoading, setSessionsDeleteLoading] = useState(false);
    const handleSessionsDelete = async () => {
        if(await modal.confirm({ title: 'Delete all sessions except current?' })) {
            setSessionsDeleteLoading(true);
            try {
                await authSessionsDelete();
                message.success('Success! All other devices will be logged out');
            } catch(e) {
                console.error(e);
                message.error('Unknown error encountered while deleting sessions');
            } finally {
                setTokenRegenLoading(false);
            }
        }
    }

    const [accountDeleteLoading, setAccountDeleteLoading] = useState(false);
    const handleAccountDelete = async () => {
        if(await modal.confirm({ title: 'Delete all sessions except current?' })) {
            setAccountDeleteLoading(true);
            try {
                await accountDelete();
                message.success('We are sorry that you have to go');
                setProfile(null);
                navigate('/');
            } catch(e) {
                console.error(e);
                message.error('Unknown error encountered while deleting account');
            } finally {
                setAccountDeleteLoading(false);
            }
        }
    }

    return (
        <Card
            title={(
                <Flex vertical gap={4}>
                    <Typography.Title level={3} className={styles.noMargin}>
                        {profile?.first_name} {profile?.last_name}
                    </Typography.Title>
                    <Flex gap={6}>
                        <Typography.Title level={5} className={styles.noMargin}>
                            {profile?.email}
                        </Typography.Title>
                        {!profile?.verified && (
                            <Button
                                type="primary"
                                size="small"
                                icon={<ExclamationCircleOutlined />}
                                loading={verifyLoading}
                                onClick={handleVerifyClick}
                            >Verify</Button>
                        )}
                    </Flex>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => setEditAccountModalOpened(true)}
                    >Edit profile</Button>
                </Flex>
            )}
            className={styles.card}
            classNames={{ header: styles.cardHeader, body: styles.cardBody }}
        >
            <Flex vertical gap={16} flex="1 0">
                <Flex vertical gap={8}>
                    <Typography.Title level={5} className={styles.noMargin}>Token</Typography.Title>
                    <Input.Password value={token?.token} />
                    <Button
                        type="primary"
                        danger
                        icon={<ApiOutlined />}
                        loading={tokenRegenLoading}
                        onClick={handleTokenRegenerate}
                    >Generate new token</Button>
                </Flex>
                <Divider className={styles.noMargin} />
                <Flex vertical flex="1 0">
                    <Typography.Title level={5} className={styles.noMargin}>Sessions</Typography.Title>
                    <AuthSessions />
                    <Flex vertical gap={6}>
                        <Button
                            type="primary"
                            danger
                            icon={<DeleteOutlined />}
                            loading={sessionsDeleteLoading}
                            onClick={handleSessionsDelete}
                        >Delete all sessions</Button>
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            loading={accountDeleteLoading}
                            onClick={handleAccountDelete}
                        >Delete account</Button>
                    </Flex>
                </Flex>
            </Flex>
            <EditProfileModal
                open={editAccountModalOpen}
                onClose={() => setEditAccountModalOpened(false)}
            />
        </Card>
    )
}