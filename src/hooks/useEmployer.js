import { useEffect, useState } from "react";

export const useEmployer = email => {
    const [isEmployer, setIsEmployer] = useState(false);

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/employer?email=${email}`)
                .then(res => res.json())
                .then(data => {
                setIsEmployer(data.isEmployer)
            })
        }
    }, [email])

    return [isEmployer]
}