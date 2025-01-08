import {FC, useState} from "react";
import {Button, Flex, Form, Modal} from "antd";
import {LoginPost, RecoverPost} from "../../types/domain.ts";
import {LoginForm} from "./components/LoginForm.tsx";
import {SignupForm, SignupFormType} from "./components/SignupForm.tsx";
import {RecoveryForm} from "./components/RecoveryForm.tsx";
import {useLoginHandler} from "./hooks/useLoginHandler.ts";
import {useSignupHandler} from "./hooks/useSignupHandler.ts";
import {useRecoverHandler} from "./hooks/useRecoverHandler.ts";

export type AuthModalMode = 'login' | 'signup' | 'recovery';
type Props = {
    open: boolean;
    onCancel: VoidFunction;
    mode: AuthModalMode;
    onModeChange: (mode: AuthModalMode) => void;
}

const MODAL_TITLE_MAP: Record<AuthModalMode, string> = {
    'login': 'Login',
    'signup': 'Sign up',
    'recovery': 'Forgot your password?',
};

const MODAL_OK_TEXT_MAP: Record<AuthModalMode, string> = {
    'login': 'Login',
    'signup': 'Sign up',
    'recovery': 'Send recovery email',
};

export const AuthModal: FC<Props> = ({ open, onCancel, mode, onModeChange }) => {
    const [loginForm] = Form.useForm<LoginPost>();
    const [signupForm] = Form.useForm<SignupFormType>();
    const [recoveryForm] = Form.useForm<RecoverPost>();

    const [loading, setLoading] = useState(false);
    const [handleLogin] = useLoginHandler({
        setLoading,
        onSuccess: onCancel
    });
    const [handleSignup] = useSignupHandler({
        setLoading,
        onSuccess: () => onModeChange('login')
    });
    const [handleRecover] = useRecoverHandler({
        setLoading,
        onSuccess: () => onModeChange('login')
    })

    const submitFuncMap: Record<AuthModalMode, VoidFunction> = {
        'login': loginForm.submit,
        'signup': signupForm.submit,
        'recovery': recoveryForm.submit
    };

    return (
        <Modal
            title={MODAL_TITLE_MAP[mode]}
            open={open}
            footer={(originNode) => (
                <Flex align="center" justify="space-between">
                    {mode === 'login' && <Button type="link" onClick={() => onModeChange('signup')}>Sign up</Button>}
                    {mode === 'signup' && <Button type="link" onClick={() => onModeChange('login')}>Already registered?</Button>}
                    {mode === 'recovery' && <Button type="link" onClick={() => onModeChange('login')}>Login</Button>}
                    <Flex align="center" gap={8}>
                        {originNode}
                    </Flex>
                </Flex>
            )}
            onOk={submitFuncMap[mode]}
            okText={MODAL_OK_TEXT_MAP[mode]}
            okButtonProps={{ loading }}
            onCancel={onCancel}
            cancelButtonProps={{ loading }}
            centered
            destroyOnClose
        >
            {mode === 'login' && (
                <LoginForm
                    form={loginForm}
                    onModeChange={onModeChange}
                    onFinish={handleLogin}
                />
            )}
            {mode === 'signup' && (
                <SignupForm
                    form={signupForm}
                    onFinish={handleSignup}
                />
            )}
            {mode === 'recovery' && (
                <RecoveryForm
                    form={recoveryForm}
                    onFinish={handleRecover}
                />
            )}
        </Modal>
    )
}