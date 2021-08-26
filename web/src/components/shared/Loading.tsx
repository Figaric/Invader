import React from "react";
import Layout from "./Layout";
import { SpinnerIcon } from "@chakra-ui/icons";
import { usePrefersReducedMotion, keyframes } from "@chakra-ui/react";

interface LoadingProps {
    withoutLayout?: boolean;
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Loading: React.FC<LoadingProps> = ({ withoutLayout = false }) => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const animation = prefersReducedMotion
        ? undefined
        : `${spin} infinite 1s linear`;

    const Spinner = () => (
        <SpinnerIcon
            fontSize={23}
            color={"white"}
            mt={8}
            animation={animation} />
    );

    if(withoutLayout) {
        return (
            <Spinner />
        );
    }

    return (
        <Layout>
            <Spinner />
        </Layout>
    );
}

export default Loading;