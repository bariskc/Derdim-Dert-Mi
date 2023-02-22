import React, { useEffect, useState } from 'react';
import { postDert } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';


const EntrySubmit = () => {
    const [focused, setFocused] = useState(false);
    const [entry, setEntry] = useState('');
    const [errors, setErrors] = useState({});


    useEffect(() => {
        if (!focused) {
            setEntry('');
            setErrors({});            
        }
    }, [focused]);
    useEffect(() => {
        setErrors({});
    },[entry])
    const pendingAPICall = useApiProgress('post', '/api/1.0/dertler')
    const onClickEntry = async () => {
        const body = {
            context: entry
        }
        try {
            await postDert(body);
            setFocused(false);
        } catch (error) {
            console.log(error);
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors)
            }
        }
    }
    let textAreaClass = 'form-control';
    if (errors.content) {
        textAreaClass += 'is-invalid';
    }
    return (
        <div className='card p-1 flex-fill'>
            <textarea className={textAreaClass} rows={focused ? 3 : 1} onFocus={() => setFocused(true)}
                onChange={(event) => setEntry(event.target.value)}
                value={entry} />
            <div className=''>{errors.context}</div>
            {focused && <div className='text-right mt-1'>
                <button className='btn btn-secondary m-2' onClick={() => setFocused(false)} disabled={pendingAPICall}>Vazgeç</button>
                <ButtonWithProgress className='btn btn-primary m-2' onClick={onClickEntry} text={'Gönder'} pendingAPICall={pendingAPICall} disabled={pendingAPICall}/>
            </div>}
        </div>
    );
};

export default EntrySubmit;