import {FC, useState} from "react";
import {Button, Flex, Layout, Menu, MenuProps} from "antd";
import {Link, Outlet} from "react-router-dom";
import styles from './LayoutWrapper.module.css';
import {API_DOCS_URL} from "../../constants/constants.ts";
import {ExportOutlined, LoginOutlined} from "@ant-design/icons";
import {AuthModal, AuthModalMode} from "../AuthModal/AuthModal.tsx";

const ITEMS: MenuProps['items'] = [
    {
        key: '/howto',
        label: (
            <Link to="/howto">Quick start</Link>
        )
    },
    {
        key: 'api-docs',
        label: (
            <a href={API_DOCS_URL} target="_blank">
                <Flex justify="center" align="center" gap={6}>
                    <ExportOutlined />
                    API
                </Flex>
            </a>
        )
    },
    {
        key: '/about',
        label: (
            <Link to="/about">About</Link>
        )
    }
]

export const LayoutWrapper: FC = () => {
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authModalMode, setAuthModalMode] = useState<AuthModalMode>('login');

    return (
        <Layout className={styles.layout}>
            <Layout.Header className={styles.header}>
                <Flex align="center">
                    {/* TODO logo */}
                    <Link to="/" className={styles.title}>
                        AirQua
                    </Link>
                </Flex>
                <Flex align="center" gap={16}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        disabledOverflow
                        items={ITEMS}
                    />
                    <Button
                        type="primary"
                        size="large"
                        icon={<LoginOutlined />}
                        onClick={() => setAuthModalOpen(true)}
                    >
                        Login
                    </Button>
                </Flex>
            </Layout.Header>
            <Layout.Content className={styles.content}>
                <Outlet />
                <AuthModal
                    open={authModalOpen}
                    onCancel={() => {
                        setAuthModalOpen(false);
                        setAuthModalMode('login');
                    }}
                    mode={authModalMode}
                    onModeChange={setAuthModalMode}
                />
            </Layout.Content>
        </Layout>
    )
}