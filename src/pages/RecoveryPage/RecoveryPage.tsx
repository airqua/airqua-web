import {PageType} from "../../types/PageType.ts";
import {App, Button, Card, Flex, Form, FormProps, Input} from "antd";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {authRecoverCodePost} from "../../api/auth/recover/authRecoverCodePost.ts";
import {RecoverCodePost} from "../../types/domain.ts";
import {SignupFormType} from "../../components/AuthModal/components/SignupForm.tsx";
import styles from './RecoveryPage.module.css';

type FormType = RecoverCodePost & {
    repeat_password: string;
}

export const RecoveryPage: PageType = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const { message } = App.useApp();

    const [form] = Form.useForm<FormType>();
    const [loading, setLoading] = useState(false);

    const handleFinish: FormProps<FormType>['onFinish'] = (values) => {
        if(!code) return;
        setLoading(true);
        authRecoverCodePost(code, { password: values.password }).then(() => {
            void message.success('Success, you can login now');
            navigate('/login');
        }).catch((e) => {
            console.error(e);
            void message.error('Error encountered while recovering password');
        }).finally(() => setLoading(false));
    }

    return (
        <Flex align="center" justify="center" className={styles.container}>
            <Card title="Recover password" className={styles.card}>
                <Form<FormType>
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                >
                    <Form.Item<SignupFormType>
                        name="password"
                        label="Password"
                        hasFeedback
                        rules={[
                            { required: true, type: "string" },
                            {
                                type: 'string',
                                min: 8,
                                message: 'Password should be at least 8 characters'
                            },
                            {
                                pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!#$%\-_=+<>])([a-zA-Z0-9!#$%\-_=+<>]+)$/,
                                message: `Password should contain at least one digit, one letter and one special character`
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item<SignupFormType>
                        name="repeat_password"
                        label="Confirm password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, whitespace: true, type: 'string' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords should match'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    );
}