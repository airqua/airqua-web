import {FC} from "react";
import {Form, FormInstance, FormProps, Input, Typography} from "antd";
import {LoginPost} from "../../../types/domain.ts";
import {COMMON_FORM_PROPS} from "../constants.ts";
import {AuthModalMode} from "../AuthModal.tsx";

type Props = {
    form: FormInstance<LoginPost>;
    onFinish: FormProps<LoginPost>['onFinish'];
    onModeChange: (mode: AuthModalMode) => void;
}

export const LoginForm: FC<Props> = ({ form, onFinish, onModeChange }) => (
    <Form<LoginPost>
        {...COMMON_FORM_PROPS}
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
    >
        <Form.Item<LoginPost>
            name="email"
            label="Email"
            rules={[{
                required: true,
                type: 'email'
            }]}
        >
            <Input placeholder="john@example.com" />
        </Form.Item>
        <Form.Item<LoginPost>
            name="password"
            label="Password"
            rules={[{
                required: true,
            }]}
            extra={(
                <Typography.Link
                    onClick={() => onModeChange('recovery')}
                >Forgot your password?</Typography.Link>
            )}
        >
            <Input.Password />
        </Form.Item>
    </Form>
)