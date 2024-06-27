import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAllResults } from '$lib/getResults';

export const GET: RequestHandler = async ({ url }) => {
	const htno = url.searchParams.get('htno');

	if (!htno) {
		return error(400, 'Bad Request');
	}

	const result = await getAllResults(htno, 'btech');

	return new Response(JSON.stringify(result));
};
