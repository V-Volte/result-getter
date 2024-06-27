import { getSubjects, getValueFromGrade } from './subjects';
import type { subject } from './subjects';
import axios from 'axios';

import { database } from './store.mjs';

let codesmap: {
	code: string;
	rcrv: boolean;
	semester_name: string;
	semester_year: number;
	semester_id: number;
}[] = [];

codesmap = await database.getCodeSemesterMap();

const codes = codesmap;

const url = 'http://results.jntuh.ac.in/resultAction';

const config = {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		Accept:
			'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
		'Accept-Encoding': '*'
	}
};

export async function getSingleResult(
	htno: string,
	examCode: number,
	degree: string = 'btech',
	type: 'intgrade' | 'rcrvintgrade' = 'intgrade',
	result: 'null' | 'gradercrv' = 'null'
): Promise<{ name: string; htno: string; subjects: subject[]; examCode: number; error?: boolean }> {
	try {
		const response = await axios.post(
			url,
			{
				degree: degree,
				etype: 'r17',
				result: result,
				grad: 'null',
				examCode: examCode,
				type: type,
				htno: htno
			},
			config
		);

		if (response.headers['Content-Length'] == 3774) throw new Error('Invalid response');

		//console.log('Request completed');

		const subjects = getSubjects(response.data);
		if (subjects.error) throw new Error('Invalid response');
		return { examCode: examCode, ...subjects };
	} catch (err: any) {
		console.error('error');
		return {
			examCode: examCode,
			name: '',
			htno: '',
			subjects: [],
			error: true
		};
	}
}

export function normalizeResults(
	results: { name: string; htno: string; subjects: subject[]; examCode: number }[]
): {
	name: string;
	htno: string;
	normalizedResults: {
		semesterName: string;
		semesterYear: number;
		semesterId: number;
		subjects: subject[];
		sgpa: number;
	}[];
	cgpa: number;
} {
	let semesterSubjectCodeMap = new Map<string, Set<string>>();

	for (let code of codes) {
		let resultsWithThisCode = results.filter((result) => result.examCode === parseInt(code.code));

		let allSubjectCodes = resultsWithThisCode.flatMap((result) =>
			result.subjects.map((subject) => subject.code)
		);

		allSubjectCodes = [...new Set(allSubjectCodes)];

		semesterSubjectCodeMap.set(
			code.semester_name,
			new Set([...(semesterSubjectCodeMap.get(code.semester_name) || []), ...allSubjectCodes])
		);
	}

	//console.dir(semesterSubjectCodeMap, { depth: 4 });

	let listOfSubjects = results.flatMap((result) => result.subjects);

	let listOfSubjectCodes = [...new Set(listOfSubjects.map((subject) => subject.code))];

	const name = results[0].name;
	const htno = results[0].htno;

	let normalizedResults = new Map<
		string,
		{
			semesterName: string;
			semesterYear: number;
			semesterId: number;
			subjects: subject[];
			sgpa: number;
		}
	>();

	let listOfFinalSubjects: subject[] = [];

	for (let subjectCode of listOfSubjectCodes) {
		const subjectsWithCode = listOfSubjects.filter((subject) => subject.code === subjectCode);
		const subjectWithMaxTotal = subjectsWithCode.reduce((maxSubject, subject) =>
			subject.total > maxSubject.total ? subject : maxSubject
		);

		listOfFinalSubjects.push(subjectWithMaxTotal);
	}

	for (let [semester, subjectCodes] of semesterSubjectCodeMap) {
		let subjects = listOfFinalSubjects.filter((subject) => subjectCodes.has(subject.code));
		if (subjects.length === 0) continue;

		let sgpa =
			subjects.reduce(
				(sgpa, subject) => sgpa + subject.credits * getValueFromGrade(subject.grade),
				0
			) / (subjects.reduce((credits, subject) => credits + subject.credits, 0) || 1);

		if (isNaN(sgpa)) sgpa = 0;
		if (subjects.map((subject) => subject.grade).includes('F')) sgpa = 0;
		if (subjects.map((subject) => subject.grade).includes('Ab')) sgpa = 0;

		normalizedResults.set(semester, {
			semesterName: semester,
			semesterYear: codes.find((code) => code.semester_name === semester)?.semester_year || 0,
			semesterId: codes.find((code) => code.semester_name === semester)?.semester_id || 0,
			subjects,
			sgpa
		});
	}

	const nrv = Array.from(normalizedResults.values());

	let cgpa = [...nrv].reduce((cgpa, semester) => cgpa + semester.sgpa, 0) / [...nrv].length;

	if (isNaN(cgpa)) cgpa = 0;

	if (nrv.find((semester) => semester.sgpa === 0)) cgpa = 0;

	return {
		name,
		htno,
		normalizedResults: Array.from(nrv).sort((x, y) => x.semesterId - y.semesterId),
		cgpa
	};
}

export async function getAllResults(htno: string, degree: string = 'btech') {
	let promises = [];

	for (let code of codes) {
		promises.push(getSingleResult(htno, parseInt(code.code), degree));
		promises.push(getSingleResult(htno, parseInt(code.code), degree, 'rcrvintgrade', 'gradercrv'));
	}

	let results = await Promise.all(promises);

	results = results.filter((result) => !result.error);

	results.sort((a, b) => a.examCode - b.examCode);

	return results;

	// nret = [];
	// 	try {
	// 		let promises = [];
	// 		for (let key in codes) {
	// 			for (let nkey in codes[key]) {
	// 				promises.push(
	// 					axios.post(
	// 						url,
	// 						{
	// 							degree: 'btech',
	// 							etype: 'r17',
	// 							result: 'null',
	// 							grad: 'null',
	// 							examCode: `${codes[key][nkey]}`,
	// 							type: 'intgrade',
	// 							htno: `${htno}`
	// 						},
	// 						config
	// 					)
	// 				);
	// 				promises.push(
	// 					axios.post(
	// 						url,
	// 						{
	// 							degree: 'btech',
	// 							etype: 'r17',
	// 							result: 'gradercrv',
	// 							grad: 'null',
	// 							examCode: `${codes[key][nkey]}`,
	// 							type: 'rcrvintgrade',
	// 							htno: `${htno}`
	// 						},
	// 						config
	// 					)
	// 				);
	// 			}
	// 		}
	// 		let results = await Promise.all(promises);
	// 		// Filter out all results with content-length 3774 (results homepage)
	// 		results = results.filter((result) => {
	// 			return result.headers['content-length'] != 3774;
	// 		});
	// 		// results.sort((a,b)=> {
	// 		//     let adata = a.config.data;
	// 		//     let acode = adata.match(/.*examCode=([0-9]{4}).*/)
	// 		//     let bdata = b.config.data;
	// 		//     let bcode = bdata.match(/.*examCode=([0-9]{4}).*/)
	// 		//     return parseInt(bcode) > parseInt(acode)
	// 		// })
	// 		let resultsdata = [];
	// 		let resultcodes = new Set();
	// 		// Adding unique results only
	// 		for (let result in results) {
	// 			let subjects = getSubjects(results[result]);
	// 			if (!resultcodes.has(subjects.examCode)) {
	// 				resultsdata.push(subjects);
	// 				resultcodes.add(subjects.examCode);
	// 			}
	// 		}
	// 		console.log(resultsdata.length);
	// 		//Remove all "PlaceholderSubject" results
	// 		resultsdata = resultsdata.filter((result) => {
	// 			return result != 'PlaceholderSubject';
	// 		});
	// 		nret = [...resultsdata];
	// 		// Sort by examCode to ensure correct order
	// 		nret.sort((a, b) => a.examCode - b.examCode);
	// 	} catch (err) {
	// 		console.log('Err' + err);
	// 	}
	// 	return nret;
}
