import {FC} from "react";
import {PageType} from "../types/PageType.ts";
import {useOwnProfile} from "../stores/OwnProfileStore.ts";
import {authGet} from "../api/auth/authGet.ts";
import {redirect} from "react-router-dom";
import {AUTH_REDIRECT_URL} from "../constants/constants.ts";

export const checkAuth = async () => {
    const profile = useOwnProfile.getState().profile;
    if(profile) return null;

    try {
        const { payload } = await authGet();
        if(payload) {
            useOwnProfile.setState({ profile: payload });
            return null;
        }
        return redirect(AUTH_REDIRECT_URL);
    } catch {
        return redirect(AUTH_REDIRECT_URL);
    }
};

export const withAuth = (Component: FC): PageType => {
    const PageComponent = (Component as PageType);
    PageComponent.loader = checkAuth;
    return PageComponent;
}