export type scode = {
	code: string;
	rcrv: boolean;
	semester_name: string;
	semester_year: number;
	semester_id: number;
};

export const semesterDetails: {
	semester_id: number;
	semester_name: string;
	semester_year: number;
}[] = [
	{ semester_id: 11, semester_name: 'I Year I semester', semester_year: 1 },
	{ semester_id: 12, semester_name: 'I Year II semester', semester_year: 1 },
	{ semester_id: 21, semester_name: 'II Year I semester', semester_year: 2 },
	{ semester_id: 22, semester_name: 'II Year II semester', semester_year: 2 },
	{ semester_id: 31, semester_name: 'III Year I semester', semester_year: 3 },
	{ semester_id: 32, semester_name: 'III Year II semester', semester_year: 3 },
	{ semester_id: 41, semester_name: 'IV Year I semester', semester_year: 4 },
	{ semester_id: 42, semester_name: 'IV Year II semester', semester_year: 4 }
];

import type { subject } from './subjects';
import type { code } from './examcodes';
import { writable } from 'svelte/store';

export type semester = {
	semester_id: number;
	semester_name: string;
	semester_year: number;
	codes: scode[];
};

export class CodesStore {
	semesters: semester[] = [];

	constructor(semesters: semester[] = []) {
		if (semesters.length) this.semesters = semesters;
		else {
			this.semesters = semesterDetails.map((semester) => {
				return {
					semester_id: semester.semester_id,
					semester_name: semester.semester_name,
					semester_year: semester.semester_year,
					codes: []
				};
			});
		}
	}

	addSemester(semester: semester) {
		this.semesters.push(semester);
	}

	addCodeToSemester(semester_id: number, code: scode) {
		let semester = this.semesters.find((semester) => semester.semester_id === semester_id);
		if (semester) {
			semester.codes.push(code);
		}
	}

	getSemesterById(semester_id: number) {
		return this.semesters.find((semester) => semester.semester_id === semester_id);
	}

	getSemesterByName(semester_name: string) {
		return this.semesters.find((semester) => semester.semester_name === semester_name);
	}

	getSemesterByYear(semester_year: number) {
		return this.semesters.find((semester) => semester.semester_year === semester_year);
	}

	getSemesterByCode(code: string) {
		return this.semesters.find((semester) => semester.codes.some((scode) => scode.code === code));
	}

	getCodesBySemesterId(semester_id: number) {
		return this.semesters.find((semester) => semester.semester_id === semester_id)?.codes;
	}

	getCodesBySemesterName(semester_name: string) {
		return this.semesters.find((semester) => semester.semester_name === semester_name)?.codes;
	}

	getCodesBySemesterYear(semester_year: number) {
		return this.semesters.find((semester) => semester.semester_year === semester_year)?.codes;
	}

	getCodesByCode(code: string) {
		return this.semesters.find((semester) => semester.codes.some((scode) => scode.code === code))
			?.codes;
	}

	getSemesters() {
		return this.semesters;
	}

	getCodes() {
		return this.semesters.map((semester) => semester.codes).flat();
	}

	getSemesterIdByCode(code: string) {
		return this.semesters.find((semester) => semester.codes.some((scode) => scode.code === code))
			?.semester_id;
	}

	getSemesterNameByCode(code: string) {
		return this.semesters.find((semester) => semester.codes.some((scode) => scode.code === code))
			?.semester_name;
	}

	getSemesterYearByCode(code: string) {
		return this.semesters.find((semester) => semester.codes.some((scode) => scode.code === code))
			?.semester_year;
	}

	addCodes(codes: code[]) {
		for (let code of codes) {
			let semester = this.getSemesterById(code.semester_id);
			if (semester) {
				this.addCodeToSemester(code.semester_id, {
					code: code.code,
					rcrv: code.rcrv,
					semester_name: semester.semester_name,
					semester_year: semester.semester_year,
					semester_id: semester.semester_id
				});
			}
		}
	}
}

export const codesStore = new CodesStore();
