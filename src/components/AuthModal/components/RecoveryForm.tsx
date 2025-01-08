import {FC} from "react";
import {Form, FormInstance, FormProps, Input} from "antd";
import {RecoverPost} from "../../../types/domain.ts";
import {COMMON_FORM_PROPS} from "../constants.ts";

type Props = {
    form: FormInstance<RecoverPost>;
    onFinish: FormProps<RecoverPost>['onFinish'];
}

export const RecoveryForm: FC<Props> = ({ form, onFinish }) => {
    return (
        <Form<RecoverPost>
            {...COMMON_FORM_PROPS}
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
        >
            <Form.Item<RecoverPost>
                name="email"
                label="Email"
                rules={[{
                    required: true,
                    type: 'email'
                }]}
            >
                <Input placeholder="john@example.com" />
            </Form.Item>
        </Form>
    )
}