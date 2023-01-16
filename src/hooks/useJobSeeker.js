import { useEffect, useState } from "react"

export const useJobSeeker = email => {
    const [isJobSeeker, setIsJobSeeker] = useState(false);

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/jobseeker?email=${email}`)
                .then(res => res.json())
                .then(data => {
                setIsJobSeeker(data.isJobSeeker)
            })
        }
    },[email])

    return [isJobSeeker]
}