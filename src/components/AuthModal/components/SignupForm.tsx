import {FC} from "react";
import {Flex, Form, FormInstance, FormProps, Input} from "antd";
import {SignupPost} from "../../../types/domain.ts";
import {COMMON_FORM_PROPS} from "../constants.ts";

export type SignupFormType = SignupPost & {
    repeat_password: string;
}

type Props = {
    form: FormInstance<SignupFormType>;
    onFinish: FormProps<SignupFormType>['onFinish'];
}

export const SignupForm: FC<Props> = ({ form, onFinish }) => {
    return (
        <Form<SignupFormType>
            {...COMMON_FORM_PROPS}
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
        >
            <Form.Item<SignupFormType> label='Name'>
                <Flex gap={16}>
                    <Form.Item<SignupFormType>
                        noStyle
                        name="first_name"
                        rules={[{ required: true, whitespace: true, type: 'string' }]}
                        style={{ flex: '1 0' }}
                    >
                        <Input placeholder="John" />
                    </Form.Item>
                    <Form.Item<SignupFormType>
                        noStyle
                        name="last_name"
                        rules={[{ required: true, whitespace: true, type: 'string' }]}
                        style={{ flex: '1 0' }}
                    >
                        <Input placeholder="Doe" />
                    </Form.Item>
                </Flex>
            </Form.Item>
            <Form.Item<SignupFormType>
                name="email"
                label="Email"
                hasFeedback
                rules={[{
                    required: true,
                    type: 'email'
                }]}
            >
                <Input placeholder="john@example.com" />
            </Form.Item>
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
        </Form>
    )
}