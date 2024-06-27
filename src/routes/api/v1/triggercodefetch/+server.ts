import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { codesStore } from '$lib/codesstore';
import axios from 'axios';
import getExamCodes from '$lib/examcodes';

export const GET: RequestHandler = async ({ url }) => {
	const requrl = 'http://results.jntuh.ac.in/jsp/home.jsp';

	console.log('Initialized');

	let data: any = null;

	while (data === null) {
		try {
			const response = await axios.get(requrl);
			data = response.data;
		} catch (e) {
			console.error('Failed to fetch data, retrying...');
		}
	}

	const codes = getExamCodes(data);

	console.log('Got exam codes');

	codesStore.addCodes(codes);

	console.log('Added codes');

	return new Response(JSON.stringify({ success: true }));
};
