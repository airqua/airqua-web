import {PageType} from "../../types/PageType.ts";
import {useNavigate, useParams} from "react-router-dom";
import {App, Spin} from "antd";
import {useEffect} from "react";
import {accountVerifyCodePost} from "../../api/account/verify/accountVerifyCodePost.ts";

export const VerifyPage: PageType = () => {
    const { code } = useParams();
    const { message } = App.useApp();
    const navigate = useNavigate();

    useEffect(() => {
        if(code) {
            accountVerifyCodePost(code).then(() => {
                void message.success('Success! You may login now');
                navigate('/login');
            }).catch(() => {
                void message.error('Error encountered while posting verification code');
            })
        }
    }, [code]);

    return <Spin fullscreen />;
}