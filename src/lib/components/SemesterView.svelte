<script lang="ts">
	import SubjectRow from './SubjectRow.svelte';

	export let semester: {
		semesterName: string;
		semesterYear: number;
		semesterId: number;
		subjects: {
			code: string;
			name: string;
			internal: number;
			external: number;
			total: number;
			credits: number;
			grade: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'F' | 'Ab';
		}[];
		sgpa: number;
	};
</script>

<div class="semester-container">
	<div class="semester-header">
		<div class="semester-name">{semester.semesterName}</div>
		<div class="sgpa">{semester.sgpa.toFixed(2)} <span class="subtext">SGPA</span></div>
	</div>

	<div class="subjects-container">
		{#each semester.subjects.sort((x, y) => {
			if (x.code < y.code) return -1;
			if (x.code > y.code) return 1;
			return 0;
		}) as subject}
			<SubjectRow data={subject} />
		{/each}
	</div>
</div>

<style lang="scss">
	.semester-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem;
		min-width: 50vw;
	}

	.semester-name {
		font-size: 1.5rem;
		text-transform: capitalize;
	}

	.sgpa {
		font-size: 1.5rem;

		.subtext {
			color: var(--subtext-color);
			font-weight: 200;
		}
	}

	.subjects-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		/* border: 2px solid black; */
		border-radius: 1vh;
		padding: 1.5rem;
		box-shadow: 10px 10px 20px 15px rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 500px) {
		.semester-name {
			font-size: 1.25rem;
		}

		.semester-header {
			width: 100%;
			flex-direction: column;
			padding: 2rem 0 2rem 0;
		}

		.subjects-container {
			width: fit-content !important;
			padding: 1rem 1rem 1rem 0.5rem;
			gap: 1rem;
			margin-bottom: 2rem;
		}

		.semester-container {
			width: 95vw;
			left: 0;
		}
	}
</style>
