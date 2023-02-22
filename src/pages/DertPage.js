
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDert } from '../api/apiCalls';
import moment from 'moment';

const DertPage = () => {
    const [dertInfo, setDertInfo] = useState({ content: {} });
    const [dertInfoUser, setDertInfoUser] = useState({ user: {} });
    const { id } = useParams();

    useEffect(() => {        
        const loadDert = async () => {
            try {
                const response = await getDert(id);
                console.log(response.data.timestamp)
                setDertInfo(response.data);
                setDertInfoUser(response.data.user);
                
            } catch (error) {
                //		setNotFound(true);
            }
        }
        loadDert();
    }, [id]);

    return (

        <div className='container'>
            <div className='card p-2 mt-2'>
                {dertInfo &&
                    <>
                        <div>{dertInfo.context}</div>
                        <Link to={`/users/${dertInfoUser.username}`} className="text-dark">@{dertInfoUser.username}</Link>                                            
                        {moment(dertInfo.timestamp).format('DD/MM/YYYY')}
                        
                    </>
                }
            </div>
        </div>
    );
};

export default DertPage;