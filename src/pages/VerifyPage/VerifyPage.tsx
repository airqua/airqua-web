import {PageType} from "../../types/PageType.ts";
import {useNavigate, useParams} from "react-router-dom";
import {App, Spin} from "antd";
import {useEffect} from "react";
import {accountVerifyCodePost} from "../../api/account/verify/accountVerifyCodePost.ts";
import {useOwnProfile} from "../../stores/OwnProfileStore.ts";

export const VerifyPage: PageType = () => {
    const { code } = useParams();
    const { message } = App.useApp();
    const navigate = useNavigate();
    const { profile } = useOwnProfile();

    useEffect(() => {
        if(code) {
            accountVerifyCodePost(code).then(() => {
                if(profile) {
                    void message.success('Success!');
                    navigate('/account');
                } else {
                    void message.success('Success! You may login now');
                    navigate('/login');
                }
            }).catch(() => {
                void message.error('Error encountered while posting verification code');
            })
        }
    }, [code, profile]);

    return <Spin fullscreen />;
}