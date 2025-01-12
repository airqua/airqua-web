import {FC} from "react";
import {Form, FormInstance, FormProps, Input, Typography} from "antd";
import {RecoverPost} from "../../../types/domain.ts";
import {COMMON_FORM_PROPS} from "../constants.ts";
import ReCAPTCHA from "react-google-recaptcha";
import {RECAPTCHA_API_KEY} from "../../../constants/constants.ts";
import {SignupFormType} from "./SignupForm.tsx";

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
            <Form.Item<SignupFormType>
                name="recaptcha"
                label=" "
                rules={[{ required: true }]}
                colon={false}
                extra={(
                    <>
                        This site is protected by reCAPTCHA.
                        Google <Typography.Link href="https://policies.google.com/privacy" target="_blank" rel="norefferer noopener">
                        Privacy Policy
                    </Typography.Link> and <Typography.Link href="https://policies.google.com/terms" target="_blank" rel="norefferer noopener">
                        Terms of Service
                    </Typography.Link> apply.
                    </>
                )}
            >
                <ReCAPTCHA sitekey={RECAPTCHA_API_KEY} />
            </Form.Item>
        </Form>
    )
}