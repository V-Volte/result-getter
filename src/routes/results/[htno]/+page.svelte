<script lang="ts">
	import SemesterView from '$lib/components/SemesterView.svelte';
	import type { subject } from '$lib/subjects.js';

	export let data: {
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
	};

	$: x = data;
</script>

<svelte:head>
	<title>{x.htno} | result-getter - Aggregate results</title>
</svelte:head>

<div class="results-container">
	<div class="header">
		<div class="name">{x.name}</div>
		<div class="cgpa">{x.cgpa?.toFixed(2)} <span class="subtext">CGPA</span></div>
	</div>

	<div>
		{#each x.normalizedResults as result}
			<SemesterView semester={result} />
		{/each}
	</div>
</div>

<style lang="scss">
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 52.5vw;
	}

	.name {
		font-size: 2rem;
	}

	.cgpa {
		font-size: 2rem;

		.subtext {
			color: var(--subtext-color);
			font-weight: 200;
		}
	}

	.results-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
	}

	@media (max-width: 500px) {
		.results-container {
			left: 0;
			right: 0;
			padding: 0;
			margin-bottom: 1rem;
			width: 100vw;
			overflow-x: hidden;
		}

		.header {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 80%;
			gap: 2rem;
			padding: 0;
		}

		.name {
			font-size: 1.5rem;
			text-align: center;
		}
	}
</style>
