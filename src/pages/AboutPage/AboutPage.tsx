import {withAuth} from "../../hocs/withAuth.ts";
import {GuidePageWrapper} from "../../components/GuidePageWrapper/GuidePageWrapper.tsx";
import {AboutInfo} from "./components/AboutInfo.tsx";

export const AboutPage = withAuth(() => {
    return (
        <GuidePageWrapper>
            <AboutInfo />
        </GuidePageWrapper>
    );
});