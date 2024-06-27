import * as cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs';

export type code = {
	code: string;
	rcrv: boolean;
	semester_id: number;
};

export default function getExamCodes(data: string) {
	const $ = cheerio.load(data);

	const trs = $($('table')[0]).find('tr');

	let codeList = new Array<code>();

	let stringDictionary: { [key: string]: string } = {
		' I Year I ': '11',
		' I Year II': '12',
		' II Year I ': '21',
		' II Year II': '22',
		' III Year I ': '31',
		' III Year II': '32',
		' IV Year I ': '41',
		' IV Year II': '42'
	};

	for (let tr of trs) {
		const td = $(tr).find('td')[0];
		const link = $(td).find('a')[0].attribs.href;

		if ($(td).text().includes('R18')) {
			const codePos = link.search('examCode=');
			const code = link.substring(codePos + 9, codePos + 13);

			const rcrvPos = link.search('intgrade');
			const isRcrv = link.substring(rcrvPos - 4, rcrvPos) == 'rcrv';

			for (let key in stringDictionary) {
				if ($(td).text().includes(key)) {
					//codesDictionary[stringDictionary[key] as string].push({ code: code, rcrv: isRcrv });
					codeList.push({ code: code, rcrv: isRcrv, semester_id: parseInt(stringDictionary[key]) });
					continue;
				}
			}
		}
	}

	// for (let key in codesDictionary) {
	// 	codesDictionary[key] = [...new Set(codesDictionary[key])];
	// }
	return codeList;
}
