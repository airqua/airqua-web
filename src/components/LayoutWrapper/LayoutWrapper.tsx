import {FC, useEffect, useMemo, useState} from "react";
import {App, Button, Flex, Layout, Menu, MenuProps, Popover, theme} from "antd";
import {Link, Outlet, useLocation} from "react-router-dom";
import styles from './LayoutWrapper.module.css';
import {API_DOCS_URL, GITHUB_ORG_URL} from "../../constants/constants.ts";
import {
    ExportOutlined,
    GithubOutlined,
    LoginOutlined,
    LogoutOutlined,
    MenuOutlined,
    UserOutlined
} from "@ant-design/icons";
import {AuthModal, AuthModalMode} from "../AuthModal/AuthModal.tsx";
import {useOwnProfile} from "../../stores/OwnProfileStore.ts";
import {authDelete} from "../../api/auth/authDelete.ts";
import {flushAuth} from "../../hocs/withAuth.ts";
import {AuthModalProvider} from "./useAuthModal.ts";
import {useIsMobile} from "../../hooks/useIsMobile.ts";

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
                <Flex align="center" gap={6}>
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
    },
    {
        key: 'github',
        label: (
            <a href={GITHUB_ORG_URL} target="_blank">
                <Flex align="center" gap={6}>
                    <GithubOutlined />
                    GitHub
                </Flex>
            </a>
        )
    }
]

export const LayoutWrapper: FC = () => {
    const { token } = theme.useToken();
    const { state, pathname } = useLocation();
    const {message} = App.useApp();

    const isMobile = useIsMobile();

    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authModalMode, setAuthModalMode] = useState<AuthModalMode>('login');
    const { profile } = useOwnProfile();

    useEffect(() => {
        if(!state?.modal) return;

        if(profile) {
            void message.info('You are already logged in');
            return;
        }

        setAuthModalOpen(true);
        setAuthModalMode(state.modal);
    }, [state?.modal, profile])

    const handleDelete = () => {
        return authDelete().then(() => flushAuth());
    }

    const authModalContext = useMemo(() => ({
        openModal: (mode: AuthModalMode) => {
            if(profile) {
                void message.info('You are already logged in');
                return;
            }

            setAuthModalOpen(true);
            setAuthModalMode(mode);
        }
    }), [profile]);

    const items: MenuProps['items'] = [
        ...ITEMS,
        ...(profile?.admin ? [{
            key: '/admin',
            label: (
                <Link to="/admin">Admin</Link>
            )
        }] : [])
    ]

    const mobileMenuItems: MenuProps['items'] = [
        ...items,
        {
            type: 'divider',
        },
        ...(profile ? [
            {
                key: 'account',
                label: (
                    <Link to="/account">
                        <Flex align="center" gap={6}>
                            <UserOutlined />
                            My account
                        </Flex>
                    </Link>
                )
            },
            {
                key: 'logout',
                label: (
                    <Flex align="center" gap={6} onClick={handleDelete}>
                        <LogoutOutlined />
                        Logout
                    </Flex>
                )
            }
        ] : [{
            key: 'login',
            label: (
                <Flex align="center" gap={6} onClick={() => setAuthModalOpen(true)}>
                    <LoginOutlined />
                    Login
                </Flex>
            )
        }])
    ];

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                    {isMobile ? (
                        <Popover
                            trigger="click"
                            placement="bottom"
                            styles={{ body: { padding: 0, overflow: 'hidden' } }}
                            open={mobileMenuOpen}
                            onOpenChange={setMobileMenuOpen}
                            content={(
                                <Menu
                                    mode="inline"
                                    disabledOverflow
                                    items={mobileMenuItems}
                                    selectedKeys={[pathname]}
                                    onClick={() => setMobileMenuOpen(false)}
                                />
                            )}
                        >
                            <Button type="text" icon={<MenuOutlined style={{ color: token.colorTextLightSolid }} />} />
                        </Popover>
                    ) : (
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            disabledOverflow
                            items={items}
                            selectedKeys={[pathname]}
                        />
                    )}
                    {!isMobile && (
                        <>
                            {profile ? (
                                <Flex align="center" gap={8}>
                                    <Link to="/account">
                                        <Button
                                            ghost
                                            size="large"
                                            icon={<UserOutlined />}
                                        >My account</Button>
                                    </Link>
                                    <Button
                                        ghost
                                        size="large"
                                        danger
                                        icon={<LogoutOutlined />}
                                        onClick={handleDelete}
                                    />
                                </Flex>
                            ) : (
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<LoginOutlined />}
                                    onClick={() => setAuthModalOpen(true)}
                                >
                                    Login
                                </Button>
                            )}
                        </>
                    )}
                </Flex>
            </Layout.Header>
            <Layout.Content className={styles.content}>
                <AuthModalProvider value={authModalContext}>
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
                </AuthModalProvider>
            </Layout.Content>
        </Layout>
    )
}