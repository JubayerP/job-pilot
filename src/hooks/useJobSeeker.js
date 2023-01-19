import { useEffect, useState } from "react";

export const useJobSeeker = email => {
    const [isJobSeeker, setIsJobSeeker] = useState(false);
    const [jobSeekerLoading, setJobSeekerLoading] = useState(false);

    useEffect(() => {
        setJobSeekerLoading(true)
        if (email) {
            fetch(`https://job-pilot-server.vercel.app/users/jobseeker?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsJobSeeker(data.isJobSeeker)
                    setJobSeekerLoading(false)
                })
        }
    }, [email])

    return [isJobSeeker, jobSeekerLoading]
}