import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getSingleResult } from '$lib/getResults';

export const GET: RequestHandler = async ({ url }) => {
	const htno = url.searchParams.get('htno');

	if (!htno) {
		return error(400, 'Bad Request');
	}

	const result = await getSingleResult(htno, 1780);

	console.log(result);

	return new Response(JSON.stringify(result));
};
