import { useEffect, useState } from "react";


const useNavbg = () => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 100) {
                setActive(true);
            } else {
                setActive(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return [active]
};

export default useNavbg;