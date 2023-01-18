import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useChangeBg = () => {
    const [color, setColor] = useState('green')
    const location = useLocation()
    useEffect(() => {
        if (location.pathname === '/') {
            setColor('transparent');
        }
        else {
            setColor('black');
        }
    }, [location.pathname]);

    return [color];
}