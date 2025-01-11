import {FC, useState} from "react";
import {App, Form, FormProps, Input, Modal} from "antd";
import {PasswordPut} from "../../../../types/domain.ts";
import {authPasswordPut} from "../../../../api/auth/authPasswordPut.ts";

type ChangePasswordFormType = PasswordPut & {
    repeat_password: string;
}

type Props = {
    open: boolean;
    onClose: VoidFunction;
    onChange: VoidFunction;
}

export const ChangePasswordModal: FC<Props> = ({ open, onClose, onChange }) => {
    const { message } = App.useApp()

    const [form] = Form.useForm<ChangePasswordFormType>();
    const [loading, setLoading] = useState(false);

    const handleFinish: FormProps<ChangePasswordFormType>['onFinish'] = (values) => {
        setLoading(true);
        authPasswordPut({
            old_password: values.old_password,
            password: values.password
        }).then(() => {
            void message.success('Password changed successfully');
            onChange();
        }).catch((e) => {
            console.error(e);
            void message.error('Unknown error encountered while changing password');
        }).finally(() => setLoading(false));
    }

    return (
        <Modal
            title="Change password"
            open={open}
            onOk={form.submit}
            okButtonProps={{ loading }}
            onCancel={onClose}
            destroyOnClose
        >
            <Form<ChangePasswordFormType>
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                preserve={false}
            >
                <Form.Item<ChangePasswordFormType>
                    name="old_password"
                    label="Current password"
                    rules={[{ required: true, whitespace: true, type: 'string' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item<ChangePasswordFormType>
                    name="password"
                    label="New password"
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
                <Form.Item<ChangePasswordFormType>
                    name="repeat_password"
                    label="Confirm new password"
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
            </Form>
        </Modal>
    )
}