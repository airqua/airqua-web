import {withAuth} from "../../hocs/withAuth.ts";
import {GuidePageWrapper} from "../../components/GuidePageWrapper/GuidePageWrapper.tsx";
import {HowToGuide} from "./components/HowToGuide.tsx";

export const HowToPage = withAuth(() => (
    <GuidePageWrapper>
        <HowToGuide />
    </GuidePageWrapper>
));