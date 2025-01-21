import {FC} from "react";
import {Button, Flex, Tooltip, Typography} from "antd";
import styles from './HowToGuide.module.css';
import {useAuthModal} from "../../../components/LayoutWrapper/useAuthModal.ts";
import {ExportOutlined} from "@ant-design/icons";
import {FLASHER_DOWNLOAD_MAC, FLASHER_DOWNLOAD_WIN} from "../../../constants/constants.ts";
import {Link} from "react-router-dom";

export const HowToGuide: FC = () => {
    const { openModal } = useAuthModal();

    return (
        <div className={styles.textContainer}>
            <Typography.Title level={3}>Getting started</Typography.Title>
            <Typography.Paragraph>
                AirQua natively supports <Typography.Link
                href="https://wiki.seeedstudio.com/Wio-Terminal-Getting-Started/"
                target="_blank"
                rel="norefferer noopener"
            >Wio Terminal</Typography.Link> devices through <Typography.Link
                href="https://github.com/airqua/airqua-terminal"
                target="_blank"
                rel="norefferer noopener"
            >custom firmware</Typography.Link> and
                direct data transfer via REST API or MQTT for DIY sensors.
            </Typography.Paragraph>
            <Typography.Paragraph>
                To connect your own sensor:
                <ol>
                    <li><Typography.Link onClick={() => openModal('signup')}>Create an account</Typography.Link></li>
                    <li>Click <Typography.Text strong>+</Typography.Text> in the devices section</li>
                    <li>Select the device type <Typography.Text italic>(Own - for transmission via REST/MQTT)</Typography.Text></li>
                    <li>
                        Enter the address and mark the location on the map (<Typography.Text italic>
                        You don't have to put a point directly on your house -
                        to maintain privacy you can choose the nearest crossroads
                    </Typography.Text>)
                    </li>
                    <li>Click <Typography.Text strong>Create</Typography.Text></li>
                    <li>You will get a token and device identificator - note them for later!</li>
                </ol>
            </Typography.Paragraph>

            <Typography.Title level={3}>Setting up your device</Typography.Title>
            <Typography.Title level={4}>Wio Terminal</Typography.Title>
            <Typography.Paragraph>
                For Wio Terminal devices, AirQua provides <Typography.Link
                    href="https://github.com/airqua/airqua-terminal"
                    target="_blank"
                    rel="norefferer noopener"
                >custom firmware</Typography.Link> and a <Typography.Link
                    href="https://github.com/airqua/airqua-terminal-flasher"
                    target="_blank"
                    rel="norefferer noopener"
                >simple GUI</Typography.Link> to install it.
            </Typography.Paragraph>
            <Typography.Paragraph>
                The installation process is as simple as possible, just follow the steps below:
                <ol>
                    <li>
                        <Flex vertical gap={6}>
                            Download and install AirQua Terminal flasher for your platform
                            <Flex gap={8}>
                                <a href={FLASHER_DOWNLOAD_WIN} target="_blank" rel="noreferrer noopener">
                                    <Button icon={<ExportOutlined />}>Windows</Button>
                                </a>
                                <a href={FLASHER_DOWNLOAD_MAC} target="_blank" rel="noreferrer noopener">
                                    <Button icon={<ExportOutlined />}>macOS</Button>
                                </a>
                                <Tooltip title="Coming soon...">
                                    <Button disabled icon={<ExportOutlined />}>Linux</Button>
                                </Tooltip>
                            </Flex>
                        </Flex>
                    </li>
                    <li>
                        Create the device in <Link to="/account">your account</Link>, obtain device id and token
                    </li>
                    <li>
                        If you've just bought the device and its your first flash - leave first option as is;
                        if not - select <Typography.Text strong>Update</Typography.Text>
                    </li>
                    <li>Insert device id and token into the app</li>
                    <li>Connect your Multigas Sensor into the left port of your Wio Terminal</li>
                    <li>Connect your Wio Terminal with provided USB cable and turn it on</li>
                    <li>Click <Typography.Text strong>Flash!</Typography.Text></li>
                    <li>After the flash process is complete, device will reboot and start sending its first readings</li>
                </ol>
            </Typography.Paragraph>
            <Typography.Title level={4}>Custom devices through MQTT</Typography.Title>
            <Typography.Paragraph>
                <Typography.Text strong>MQTT server credentials:</Typography.Text>
                <ul>
                    <li><Typography.Text strong>Host:</Typography.Text> mqtt.airqua.uk (TLS)</li>
                    <li><Typography.Text strong>Port:</Typography.Text> 8883</li>
                    <li><Typography.Text strong>Login:</Typography.Text> apikey</li>
                    <li><Typography.Text strong>Password:</Typography.Text> <Typography.Text italic>your personal token</Typography.Text></li>
                </ul>
                An object with pairs of keys of metric ids and float values is expected in the publication.
                Publication should be sent into the topic named exactly as the id of the device.
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Example:</Typography.Text>
                <pre>
                    PUBLISH<br />
                    topicName "0194519f-ebb5-7820-aa24-e3e10954db01"<br/>
                    payload "&#123;"co2": 450&#125;"
                </pre>
            </Typography.Paragraph>
            <Typography.Title level={4}>Custom devices through REST</Typography.Title>
            <Typography.Paragraph>
                Readings should be sent to <Typography.Text code>
                POST /sensors/&#123;sensorId&#125;/readings
            </Typography.Text>. Detailed documentation is available
                on <Typography.Link href="https://api.airqua.uk">https://api.airqua.uk</Typography.Link>.
            </Typography.Paragraph>
        </div>
    )
}