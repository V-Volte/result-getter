import sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';

export class DBInterface {
	db: sqlite.Database<sqlite3.Database, sqlite3.Statement> = null!;
	hasInitialized: boolean = false;
	async init() {
		try {
			this.db = await sqlite.open({
				filename: `./db/main.db`,
				driver: sqlite3.Database
			});

			this.hasInitialized = true;
		} catch (e) {
			console.error(e);
			return false;
		}

		return true;
	}

	async close() {
		await this.db.close();
	}

	async checkCodeExists(code: string) {
		try {
			const result = await this.db.get('SELECT COUNT(code) FROM codes WHERE code = ?', [code]);
			return result !== undefined;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	async checkCodesExist(codes: string[]) {
		try {
			const results = await this.db.all('SELECT code FROM codes WHERE code IN (?)', [codes]);
			return results.length === codes.length;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	async diffCodes(codes: string[]) {
		try {
			const results = await this.db.all('SELECT code FROM codes WHERE code NOT IN (?)', [codes]);
			return results;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	async getCodeSemesterMap(): Promise<
		{
			code: string;
			rcrv: boolean;
			semester_name: string;
			semester_year: number;
			semester_id: number;
		}[]
	> {
		try {
			const results = await this.db.all(
				'SELECT code, rcrv, semester_name, semester_year, codes.semester_id FROM semesters INNER JOIN codes ON codes.semester_id = semesters.semester_id;'
			);
			return results;
		} catch (e) {
			console.error("Couldn't get code semester map");
			return [];
		}
	}

	async addCode(code: string, semester_id: number, rcrv: boolean = false) {
		try {
			await this.db.run('INSERT INTO codes (code, semester_id, rcrv) VALUES (?, ?, ?)', [
				code,
				semester_id,
				rcrv
			]);
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	async addCodes(codes: { code: string; semester_id: number; rcrv: boolean }[]) {
		try {
			let uniqueCodesMap = new Map<string, { code: string; semester_id: number; rcrv: boolean }>();

			for (let code of codes) {
				if (!uniqueCodesMap.has(code.code)) {
					uniqueCodesMap.set(code.code, code);
				} else {
					if (code.rcrv) {
						uniqueCodesMap.set(code.code, code);
					}
				}
			}

			let uniqueCodes = Array.from(uniqueCodesMap.values());

			for (let code of uniqueCodes) {
				await this.db.run('INSERT INTO codes (code, semester_id, rcrv) VALUES (?, ?, ?)', [
					code.code,
					code.semester_id,
					code.rcrv
				]);
			}
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	async addSemesters(
		semesters: { semester_id: number; semester_name: string; semester_year: number }[]
	) {
		try {
			for (let semester of semesters) {
				await this.db.run(
					'INSERT INTO semesters (semseter_id, semester_name, semester_year) VALUES (?, ?, ?)',
					[`${semester.semester_id}`, semester.semester_name, semester.semester_year]
				);
			}
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	async addBranches(branches: { branch_id: number; branch_name: string }[]) {
		try {
			for (let branch of branches) {
				await this.db.run('INSERT INTO branches (branch_id, branch_name) VALUES (?, ?)', [
					`${branch.branch_id}`,
					branch.branch_name
				]);
			}
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	async addColleges(colleges: { college_id: number; college_name: string }[]) {
		try {
			for (let college of colleges) {
				await this.db.run('INSERT INTO colleges (college_id, college_name) VALUES (?, ?)', [
					`${college.college_id}`,
					college.college_name
				]);
			}
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	async getCollegeById(college_id: number) {
		try {
			const result = await this.db.get('SELECT college_name FROM colleges WHERE college_id = ?', [
				college_id
			]);
			return result;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	async getAllColleges() {
		try {
			const results = await this.db.all('SELECT college_id, college_name FROM colleges');
			return results;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	async getBranchById(branch_id: number) {
		try {
			const result = await this.db.get('SELECT branch_name FROM branches WHERE branch_id = ?', [
				branch_id
			]);
			return result;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	async getAllBranches() {
		try {
			const results = await this.db.all('SELECT branch_id, branch_name FROM branches');
			return results;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	async getSemesterById(semester_id: string) {
		try {
			const result = await this.db.get(
				'SELECT semester_name, semester_year FROM semesters WHERE semester_id = ?',
				[semester_id]
			);
			return result;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	async getAllSemesters() {
		try {
			const results = await this.db.all(
				'SELECT semester_id, semester_name, semester_year FROM semesters'
			);
			return results;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	async clearAllCodes() {
		try {
			await this.db.run('DELETE FROM codes');
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}
}

export function generateSemesterId(semester_name: string) {
	// write if condition for If semester name matches the pattern "[I - IV] year [I - II] semester"

	function romanToNumber(roman: string) {
		const romanMap: { [key: string]: number } = {
			I: 1,
			II: 2,
			III: 3,
			IV: 4
		};

		return romanMap[roman];
	}

	if (semester_name.match(/^(I|II|III|IV)\syear\s(I|II)\ssemester$/gm)) {
		return `${romanToNumber(semester_name.split(' ')[0])}${semester_name.split(' ')[2]}`;
	} else if (semester_name.match(/^(I|II|III|IV)-(I|II)$/gm)) {
		return `${romanToNumber(semester_name.split('-')[0])}${romanToNumber(semester_name.split('-')[1])}`;
	} else if (semester_name.match(/^[1-4]-[1|2]$/)) return semester_name;
	else return null;
}
