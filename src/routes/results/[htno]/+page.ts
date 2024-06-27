import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const htno = params.htno;
	const res = await fetch(`/api/v1/normalizedresults?htno=${htno}`, { method: 'GET' });
	if (res.ok) {
		let ret = await res.json();
		return ret;
	}
	return {
		status: res.status,
		error: res.statusText
	};
};
