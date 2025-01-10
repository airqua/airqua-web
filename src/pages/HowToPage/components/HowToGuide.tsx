import {FC} from "react";
import {Typography} from "antd";
import {Link} from "react-router-dom";
import styles from './HowToGuide.module.css';

export const HowToGuide: FC = () => (
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
                <li><Link to="/signup">Create an account</Link></li>
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
            For Wio Terminal devices, AirQua provides custom firmware and a simple GUI app to install it.
            TODO add link and stuff
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
        <Typography.Title level={4}>Custom services through REST</Typography.Title>
        <Typography.Paragraph>
            Readings should be sent to <Typography.Text code>
                POST /sensors/&#123;sensorId&#125;/readings
            </Typography.Text>. Detailed documentation is available
            on <Typography.Link href="https://api.airqua.uk">https://api.airqua.uk</Typography.Link>.
        </Typography.Paragraph>
    </div>
)