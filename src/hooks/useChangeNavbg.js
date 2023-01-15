import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useChangeBg = () => {
    const [color, setColor] = useState('green')
    const location = useLocation()
    useEffect(() => {
        if (location.pathname === '/') {
            setColor('transparent');
        }
        else if (location.pathname === '/jobs/product') {
            setColor('black');
        }
        else if (location.pathname === '/jobs/engineering') {
            setColor('black');
        }
        else if (location.pathname === '/jobs/datascience') {
            setColor('black');
        }
        else if (location.pathname === '/register') {
            setColor('black');
        }
        else if (location.pathname === '/login') {
            setColor('black');
        }
        else {
            setColor('transparent');
        }
    }, [location.pathname]);

    return [color];
}