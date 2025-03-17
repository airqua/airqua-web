import {FC} from "react";
import {Typography} from "antd";
import styles from './HowToGuide.module.css';
import {useAuthModal} from "../../../components/LayoutWrapper/useAuthModal.ts";
import {HowToSections} from "../../../components/HowToSections/HowToSections.tsx";

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
                    <li>Select the device type</li>
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
            <HowToSections.SetupWio />
            <Typography.Title level={4}>Custom devices through MQTT</Typography.Title>
            <HowToSections.SetupMQTT />
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