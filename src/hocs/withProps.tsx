import {FC} from "react";

export const withProps = (Component: FC<any>, props: any) => {
    return (matchProps: any) => {
        return <Component {...props} {...matchProps} />
    }
}