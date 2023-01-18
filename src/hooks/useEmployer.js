import { useEffect, useState } from "react";

export const useEmployer = email => {
    const [isEmployer, setIsEmployer] = useState(false);
    const [employerLoading, setEmployerLoading] = useState(false)

    console.log(isEmployer)

    useEffect(() => {
        if (email) {
            setEmployerLoading(true)
            fetch(`http://localhost:5000/users/employer?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsEmployer(data.isEmployer)
                    setEmployerLoading(false)
            })
        }
    }, [email])

    return [isEmployer, employerLoading]
}