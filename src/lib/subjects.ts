import * as cheerio from 'cheerio';

// import { JSSoup } from 'jssoup';

export type subject = {
	name: string;
	code: string;
	credits: number;
	grade: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'F' | 'Ab';
	internal: number;
	external: number;
	total: number;
	isPlaceholder?: boolean;
};

export function getValueFromGrade(grade: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'F' | 'Ab') {
	switch (grade) {
		case 'O':
			return 10;
		case 'A+':
			return 9;
		case 'A':
			return 8;
		case 'B+':
			return 7;
		case 'B':
			return 6;
		case 'C':
			return 5;
		case 'F':
			return 0;
		case 'Ab':
			return 0;
	}
}

export function getSubjects(input: string) {
	try {
		let subjects = new Array<subject>();
		//let soup = new JSSoup(input.data);

		const $ = cheerio.load(input);

		const tables = $('table');

		const trs = $(tables[1]).find('tr');

		for (let tr of trs.slice(1)) {
			const tds = $(tr).find('td');
			subjects.push({
				code: $(tds[0]).text(),
				name: $(tds[1]).text(),
				credits: parseFloat($(tds[6]).text()),
				grade: $(tds[5]).text() as 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'F' | 'Ab',
				internal: parseInt($(tds[2]).text()),
				external: parseInt($(tds[3]).text()),
				total: parseInt($(tds[4]).text())
			});
		}

		let ntrs = $($(tables[0]).find('tr')[0]).find('td');

		if (subjects.length == 0) throw new Error('Invalid response');

		return {
			name: $(ntrs[3]).text(),
			htno: $(ntrs[1]).text(),
			subjects: [...new Set(subjects)]
		};
	} catch (err) {
		// 	trs = tables[0].findAll('tr');
		// 	tds = trs[0].findAll('td');

		// 	let rdata = input.config['data'];
		// 	let rcode = rdata.match(/.*examCode=([0-9]{4}).*/)[1];

		// 	return {
		// 		name: tds[3].text,
		// 		htno: tds[1].text,
		// 		subjects: [...new Set(subjects)],
		// 		examCode: parseInt(rcode)
		// 	};
		//console.log('error in getSubjects');
		return {
			name: '',
			htno: '',
			subjects: [],
			error: true
		};
	}
}
