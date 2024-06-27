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

	const share = async () => {
		const shareData = {
			title: `${x.name} | result-getter - Aggregate results`,
			text: `Check out ${x.name}'s results on result-getter. ${x.cgpa && `Their CGPA is ${x.cgpa?.toFixed(2)}!`}`,
			url: window.location.href
		};

		if (navigator.canShare && navigator.canShare(shareData)) {
			navigator.share(shareData);
		} else {
			await navigator.clipboard.writeText(window.location.href);
			let complete = true;
			setTimeout(() => {
				complete = false;
			}, 500);
		}
	};

	const print = () => {
		window.print();
	};
</script>

<svelte:head>
	<title>{x.htno} | result-getter - Aggregate results</title>
</svelte:head>

<div class="results-container">
	<div class="header">
		<div class="name">{x.name}</div>
		<div class="cgpa">{x.cgpa ? x.cgpa.toFixed(2) : 'No'} <span class="subtext">CGPA</span></div>
	</div>

	<div class="button-container">
		<button class="share-button" type="button" on:click={share}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
				><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
					d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"
				/></svg
			>
			<div class="button-text">Share your results</div>
		</button>
		<button class="download-button" on:click={print}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
				><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
					d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
				/></svg
			>
			<div class="button-text">Download your results</div>
		</button>
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

	.button-container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin: 1rem;

		.share-button,
		.download-button {
			background-color: transparent;
			border: none;
			cursor: pointer;
			padding: 0.5rem;
			right: 1rem;
			top: 1rem;
			font-family: inherit;

			svg {
				width: 1.5rem;
				height: 1.5rem;
				fill: var(--icon-color);
				transition: all 0.3s ease-in-out;
			}

			&:hover {
				svg {
					filter: drop-shadow(0 0 0.5rem var(--search-button-color));
				}
			}

			&:active {
				svg {
					transform: scale(0.9);
				}
			}

			.button-text {
				font-size: 1rem;
				font-weight: 300;
				color: var(--icon-color);
				font-family: inherit;
				transition: all 0.3s ease-in-out;
			}
		}

		.share-button {
			svg {
				fill: var(--gradient-start-blue);
			}

			&:hover {
				svg {
					filter: drop-shadow(0 0 0.5rem var(--gradient-start-blue));
				}
			}
		}
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

		.button-container .button-text {
			display: none;
		}

		.button-container {
			gap: 1rem;
			margin: 0;

			.share-button,
			.download-button {
				svg {
					width: 1rem;
					height: 1rem;
				}
			}
		}
	}

	@media print {
		.results-container {
			width: 100%;
			padding: 0;
		}

		.header {
			width: 95%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			* {
				text-align: center;
				print-color-adjust: exact;
			}
		}

		.button-container {
			display: none;
		}

		* {
			print-color-adjust: exact;
		}
	}
</style>
