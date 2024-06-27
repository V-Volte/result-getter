import { building } from '$app/environment';
import getExamCodes from '$lib/examcodes';
import { database } from '$lib/store.mjs';
import axios from 'axios';
import { codesStore } from '$lib/codesstore';

const url = 'http://results.jntuh.ac.in/jsp/home.jsp';

console.log('Initialized');

const { data } = await axios.get(url);

const codes = await getExamCodes(data);

console.log('Got exam codes');

codesStore.addCodes(codes);

console.log('Added codes');

import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	const errorId = crypto.randomUUID();

	return {
		message: `Whoops! This was a ${status} error. Please try again later. Error ID: ${errorId}`,
		emsg: message,
		errorId
	};
};
