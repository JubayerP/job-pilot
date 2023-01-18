import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import { useJobSeeker } from '../../../hooks/useJobSeeker';
import AlertDialog from '../../shared/Alert/Alert';
import Category from '../Category/Category';
import Header from '../Header/Header';

const Home = () => {
    const { user } = useContext(AuthContext)
    const [isJobSeeker] = useJobSeeker(user?.email);

    const { data: currentUser, isLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/user/${user?.email}`)
            const data = await res.json();
            return data;
        }
    })

    if(isLoading){
        return 'Loading.....'
    }

    return (
        <div>
            <Header />
            {
              isJobSeeker &&  (!currentUser?.passion && !currentUser?.address && !currentUser?.resume) && <AlertDialog />
            }
            <Category />
        </div>
    );
};

export default Home;