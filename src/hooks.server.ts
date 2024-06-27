import { building } from '$app/environment';
import getExamCodes from '$lib/examcodes';
import { database } from '$lib/store.mjs';
import axios from 'axios';

const url = 'http://results.jntuh.ac.in/jsp/home.jsp';

console.log('Initializing');

await database.init();

console.log('Initialized');

await database.createTables();

console.log('Created tables');

const { data } = await axios.get(url);

await getExamCodes(data, database);

console.log('Got exam codes');

import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	const errorId = crypto.randomUUID();

	return {
		message: 'Whoops!',
		errorId
	};
};
