import { useEffect, useState } from "react";

export const useEmployer = email => {
    const [isEmployer, setIsEmployer] = useState(false);
    const [employerLoading, setEmployerLoading] = useState(true)

    useEffect(() => {
        if (email) {
            setEmployerLoading(true)
            fetch(`https://job-pilot-server.vercel.app/users/employer?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsEmployer(data.isEmployer)
                    setEmployerLoading(false)
                })
        }
    }, [email])

    return [isEmployer, employerLoading]
}