import {App, FormProps} from "antd";
import {RecoverPost} from "../../../types/domain.ts";
import {authRecoverPost} from "../../../api/auth/authRecoverPost.ts";

type Params = {
    setLoading: (loading: boolean) => void;
    onSuccess: VoidFunction;
}

export const useRecoverHandler = ({ setLoading, onSuccess }: Params): [FormProps<RecoverPost>['onFinish']] => {
    const { message } = App.useApp();

    return [
        (values) => {
            setLoading(true);
            authRecoverPost(values).then(() => {
                void message.success('We\'ve sent you a magic link! Please check your email...');
                onSuccess();
            }).catch((err) => {
                void message.error('Something went wrong, please try again');
                console.error(err);
            }).finally(() => {
                setLoading(false);
            })
        }
    ]
}