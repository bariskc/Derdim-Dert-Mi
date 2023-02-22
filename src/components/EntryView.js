import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import tr from 'timeago.js/lib/lang/tr';

const EntryView = (props) => {
    timeago.register('tr', tr);
    const { entry } = props;
    const { id, user, context, timestamp } = entry;
    const { username } = user;
    return (
        <div className='card p-4 mt-1 mb-1'>
            <Link to={`/users/${username}`} className="text-dark">@{username}</Link>
            {context} <Link to={`/dertler/info/${id}`} className="text-dark">..devamı</Link>
            <TimeAgo datetime={timestamp} locale='tr' />
        </div>
    );
};

export default EntryView;