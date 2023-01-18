import { useEffect, useState } from "react"

export const useJobSeeker = email => {
    const [isJobSeeker, setIsJobSeeker] = useState(false);
    const [jobSeekerLoading, setJobSeekerLoading] = useState(false);

    useEffect(() => {
        setJobSeekerLoading(true)
        if (email) {
            fetch(`http://localhost:5000/users/jobseeker?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsJobSeeker(data.isJobSeeker)
                    setJobSeekerLoading(false)
            })
        }
    },[email])

    return [isJobSeeker, jobSeekerLoading]
}