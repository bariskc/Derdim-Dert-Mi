import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../api/apiCalls';
import ProfileCard from '../components/ProfileCard';
import Spinner from '../components/Spinner';
import { useApiProgress } from '../shared/ApiProgress';
const SettingsPage = () => {

    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);
    const { username } = useParams();

    const pendingAPICall = useApiProgress('get', '/api/1.0/users/' + username, true);
    useEffect(() => {
        setNotFound(false);
    }, [user]);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(username);
                setUser(response.data)
            } catch (error) {
            }
        }
        loadUser();
    }, [username]);

    if (notFound) {
        return (
            <div className='container'>
                <div className="alert alert-danger">
                    User Not Found
                </div>
            </div>
        )
    }

    if (pendingAPICall || user.username !== username) {
        return (
            <Spinner />
        )
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <ProfileCard user={user} />
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;