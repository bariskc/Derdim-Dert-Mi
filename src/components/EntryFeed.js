import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDertler, getNewDertler, getNewDertlerCount, getOldDertler } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import EntryView from './EntryView';
import Spinner from './Spinner';

const EntryFeed = () => {
	const [entryPage, setEntryPage] = useState({ content: [], last: true, number: 0 });
	const [newEntriesCount, setNewEntriesCount] = useState(0);
	const { username } = useParams();
	const path = username ? `/api/1.0/users/${username}/dertler?currentPage=` : '/api/1.0/dertler?currentPage=';
	const initialDertlerLoadProgress = useApiProgress('get', path);

	let lastEntryId = 0;
	let firstEntryId = 0;
	if (entryPage.content.length > 0) {
		firstEntryId = entryPage.content[0].id;
		const lastEntriesIndex = entryPage.content.length - 1;
		lastEntryId = entryPage.content[lastEntriesIndex].id;
	}
	const oldDertlerPath = username ? `/api/1.0/users/${username}/dertler/${lastEntryId}` : `/api/1.0/dertler/${lastEntryId}`;
	const loadOldEntriesProgress = useApiProgress('get', oldDertlerPath, true);
	const newEntryPath = username ? `/api/1.0/users/${username}/dertler/${firstEntryId}?direction=after` : `/api/1.0/dertler/${firstEntryId}?direction=after`;

	const loadNewEntriesProgress = useApiProgress('get', newEntryPath, true);
	useEffect(() => {
		const getCount = async () => {
			const response = await getNewDertlerCount(firstEntryId, username);			
			setNewEntriesCount(response.data.count);
		};

		let looper = setInterval(getCount, 5000);
		return function cleanup() {
			clearInterval(looper);
		};
	}, [firstEntryId, username]);

	useEffect(() => {
		const loadEntries = async (page) => {
			try {
				const response = await getDertler(username, page);
				setEntryPage(previousEntryPage => ({
					...response.data,
					content: [...previousEntryPage.content, ...response.data.content]
				}));
			} catch (error) {
				console.log(error);				
			}
		}
		loadEntries();
	}, [username]);

	const loadOldEntries = async () => {
		const response = await getOldDertler(lastEntryId, username);
		setEntryPage(previousEntryPage => ({
			...response.data,
			content: [...previousEntryPage.content, ...response.data.content]
		}));
	}


	const loadNewEntries = async () => {
		const response = await getNewDertler(firstEntryId, username);
		setEntryPage(previousEntryPage => ({
			...previousEntryPage,
			content: [...response.data, ...previousEntryPage.content]
		}));
		setNewEntriesCount(0);
	}
	const { content, last } = entryPage;

	if (content.length === 0) {
		return <div className='alert alert-secondary text-center'>{initialDertlerLoadProgress ? <Spinner /> : "Görünütlenecek dert yok"}</div>
	}
	return (
		<div>
			{newEntriesCount > 0 && <div className='alert alert-secondary text-center'
				onClick={loadNewEntriesProgress ? () => { } : loadNewEntries} style={{ cursor: 'pointer' }}>
				{loadNewEntriesProgress ? <Spinner /> : "Yeni dertler var"}
			</div>}
			{content.map(entry => {
				return <EntryView key={entry.id} entry={entry} />;
			})}
			{!last && <div className='alert alert-secondary text-center' onClick={loadOldEntriesProgress ? () => { } : loadOldEntries} style={{ cursor: 'pointer' }}>
				{loadOldEntriesProgress ? <Spinner /> : "Daha fazla"}
			</div>}
		</div>

	);
};

export default EntryFeed;