import { writable, readonly } from 'svelte/store';
import { DBInterface } from './db';
import axios from 'axios';
import getExamCodes from './examcodes';
import type { code } from './examcodes';

export interface codeStoreItem {
	code: string;
	rcrv: boolean;
	semester_name: string;
	semester_year: number;
}

const db = new DBInterface();
let codes: codeStoreItem[] = [];

// await db.init();

// console.log('Initialized');

// const { data } = await axios.get(url);

// await getExamCodes(data, db);

// let csmap: codeStoreItem[] = await db.getCodeSemesterMap();

// codes = csmap;

export const database = db;
