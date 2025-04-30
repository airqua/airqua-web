import {FC} from "react";
import {PageType} from "../types/PageType.ts";
import {useOwnProfile} from "../stores/OwnProfileStore.ts";
import {authGet} from "../api/auth/authGet.ts";
import {redirect} from "react-router-dom";
import {AUTH_REDIRECT_URL} from "../constants/constants.ts";

export const checkAuth = async (required?: boolean) => {
    const profile = useOwnProfile.getState().profile;
    if(profile) return null;

    try {
        const { payload } = await authGet();
        if(payload) {
            useOwnProfile.setState({ profile: payload });
            return null;
        }
        return required ? redirect(AUTH_REDIRECT_URL) : null;
    } catch {
        return required ? redirect(AUTH_REDIRECT_URL) : null;
    }
};

export const flushAuth = () => {
    useOwnProfile.setState({ profile: null });
}

export const withAuth = (Component: FC, required?: boolean): PageType => {
    const PageComponent = (Component as PageType);
    PageComponent.loader = () => checkAuth(required);
    return PageComponent;
}