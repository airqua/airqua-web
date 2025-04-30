import {useLayoutEffect, useState} from "react";

const QUERY = '(max-width: 450px)';
const getMatches = () => window.matchMedia(QUERY).matches;

export const useIsMobile = () => {
    const [matches, setMatches] = useState<boolean>(() => getMatches());

    const handleChange = () => {
        setMatches(getMatches());
    }

    useLayoutEffect(() => {
        const matchMedia = window.matchMedia(QUERY);

        handleChange();

        if(matchMedia.addListener) {
            matchMedia.addListener(handleChange);
        } else {
            matchMedia.addEventListener('change', handleChange);
        }

        return () => {
            if(matchMedia.removeListener) {
                matchMedia.removeListener(handleChange);
            } else {
                matchMedia.removeEventListener('change', handleChange);
            }
        }
    }, []);

    return matches;
}