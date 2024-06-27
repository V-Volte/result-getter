import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAllResults, normalizeResults } from '$lib/getResults';

export const GET: RequestHandler = async ({ url }) => {
	const htno = url.searchParams.get('htno')?.toUpperCase();

	if (!htno) {
		return error(400, 'Bad Request');
	}

	const result = await getAllResults(htno, 'btech');

	const normalizedResults = normalizeResults(result);

	console.log(`HTNO ${htno}`);

	return new Response(JSON.stringify(normalizedResults));
};
