import {FC} from "react";
import {Flex, Layout, Menu, MenuProps} from "antd";
import {Link, Outlet} from "react-router-dom";
import styles from './LayoutWrapper.module.css';
import {API_DOCS_URL} from "../../constants/constants.ts";
import {ExportOutlined} from "@ant-design/icons";

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
    return (
        <Layout className={styles.layout}>
            <Layout.Header className={styles.header}>
                <Flex align="center">
                    {/* TODO logo */}
                    <Link to="/" className={styles.title}>
                        AirQua
                    </Link>
                </Flex>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    disabledOverflow
                    items={ITEMS}
                />
            </Layout.Header>
            <Layout.Content className={styles.content}>
                <Outlet />
            </Layout.Content>
        </Layout>
    )
}