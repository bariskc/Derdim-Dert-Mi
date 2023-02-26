import React from 'react';
import { useSelector } from 'react-redux';
import EntryFeed from '../components/EntryFeed';
import EntrySubmit from '../components/EntrySubmit';

const HomePage = () => {
    const { isLoggedIn } = useSelector(store => ({ isLoggedIn: store.isLoggedIn }));
    console.log("home page")
    return (
        <div className='container'>
            <div className='row'>            
                <div className='col'>
                    <div className='mt-2 mb-2'>
                        {isLoggedIn && <EntrySubmit />}
                    </div>
                    <EntryFeed />
                </div>
                
            </div>

        </div>
    );
};

export default HomePage;