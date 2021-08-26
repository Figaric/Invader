import React, { useEffect } from "react";

interface OnMountProps {
    effect: () => void
}

const OnMount: React.FC<OnMountProps> = ({ effect }) => {
    useEffect(effect);

    return null;
}

export default OnMount;