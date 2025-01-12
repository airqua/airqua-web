import {FC, useState} from "react";
import {App, Flex, Form, FormProps, Input, Modal} from "antd";
import {AccountPatch} from "../../../../types/domain.ts";
import {useOwnProfile} from "../../../../stores/OwnProfileStore.ts";
import {accountPatch} from "../../../../api/account/accountPatch.ts";
import {getDifferentOrUndefined} from "../../../../utils/getDifferentOrUndefined.ts";
import {useNavigate} from "react-router-dom";

type EditProfileFormType = AccountPatch & {
    repeat_password: string;
}

type Props = {
    open: boolean;
    onClose: VoidFunction;
}

export const EditProfileModal: FC<Props> = ({ open, onClose }) => {
    const { message } = App.useApp();

    const { profile, setProfile } = useOwnProfile();
    const navigate = useNavigate();

    const [form] = Form.useForm<EditProfileFormType>();
    const [loading, setLoading] = useState(false);

    const handleFinish: FormProps<EditProfileFormType>['onFinish'] = (values) => {
        setLoading(true);
        accountPatch({
            old_password: values.old_password,
            first_name: getDifferentOrUndefined(profile!.first_name, values.first_name),
            last_name: getDifferentOrUndefined(profile!.last_name, values.last_name),
            email: getDifferentOrUndefined(profile!.email, values.email),
            password: values.password
        }).then(() => {
            void message.success('Profile edit complete');
            if(getDifferentOrUndefined(profile!.email, values.email)) {
                void message.success('Email was changed, check your inbox for verification email');
            }
            if(values.password) {
                setProfile(null);
                navigate('/login');
            }
        }).catch((e) => {
            console.error(e);
            void message.error('Unknown error encountered while editing profile');
        }).finally(() => setLoading(false));
    }

    return (
        <Modal
            title="Edit account"
            open={open}
            onOk={form.submit}
            okButtonProps={{ loading }}
            onCancel={onClose}
            destroyOnClose
        >
            <Form<EditProfileFormType>
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                preserve={false}
                initialValues={{
                    first_name: profile?.first_name,
                    last_name: profile?.last_name,
                    email: profile?.email
                }}
            >
                <Form.Item<EditProfileFormType>
                    name="old_password"
                    label="Current password"
                    rules={[{ required: true, whitespace: true, type: 'string' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item<EditProfileFormType>
                    label="Full name"
                >
                    <Flex gap={6}>
                        <Form.Item<EditProfileFormType>
                            name="first_name"
                            noStyle
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<EditProfileFormType>
                            name="last_name"
                            noStyle
                        >
                            <Input />
                        </Form.Item>
                    </Flex>
                </Form.Item>
                <Form.Item<EditProfileFormType>
                    name="email"
                    label="Email"
                >
                    <Input type="email" />
                </Form.Item>
                <Form.Item<EditProfileFormType>
                    name="password"
                    label="New password"
                    hasFeedback
                    rules={[
                        {
                            pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!#$%\-_=+<>])([a-zA-Z0-9!#$%\-_=+<>]+)$/,
                            message: `Password should contain at least one digit, one letter and one special character`
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item<EditProfileFormType>
                    name="repeat_password"
                    label="Confirm new password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
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