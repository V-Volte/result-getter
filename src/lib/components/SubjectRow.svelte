<script lang="ts">
	import type { subject } from '$lib/subjects.js';

	export let data: subject;

	function getGradeClass(grade: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'F' | 'Ab') {
		switch (grade) {
			case 'O':
				return 'grade-o';
			case 'A+':
				return 'grade-ap';
			case 'A':
				return 'grade-a';
			case 'B+':
				return 'grade-bp';
			case 'B':
				return 'grade-b';
			case 'C':
				return 'grade-c';
			case 'F':
				return 'grade-f';
			case 'Ab':
				return 'grade-ab';
		}
	}

	const toTitleCase = function (text: string) {
		var i, j, str, lowers, uppers;
		str = text.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
		});

		// Certain minor words should be left lowercase unless
		// they are the first or last words in the string
		lowers = [
			'A',
			'An',
			'The',
			'And',
			'But',
			'Or',
			'For',
			'Nor',
			'As',
			'At',
			'By',
			'For',
			'From',
			'In',
			'Into',
			'Near',
			'Of',
			'On',
			'Onto',
			'To',
			'With'
		];
		for (i = 0, j = lowers.length; i < j; i++)
			str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), function (txt) {
				return txt.toLowerCase();
			});

		// Certain words such as initialisms or acronyms should be left uppercase
		uppers = ['Id', 'Tv', 'I', 'Ii', 'Iii', 'Iv', 'V'];
		for (i = 0, j = uppers.length; i < j; i++)
			str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), uppers[i].toUpperCase());

		return str;
	};

	function gradeToValue(grade: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'F' | 'Ab') {
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
				return -1;
		}
	}

	let visible = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="subject"
	on:click={() => {
		visible = !visible;
	}}
	aria-expanded="false"
>
	<div class={`subject-column subject-code ${data.code.match(/\d{5}/) ? 'lab' : 'normal'}`}>
		{data.code}
	</div>
	<div class="subject-column subject-name">
		{toTitleCase(
			data.name.substring(0, (data.name.indexOf('LAB') + 1 || data.name.length + 1) - 1)
		)}
		{#if data.name.includes('LAB')}<span class="lab-tag">LAB</span>{/if}
		{#if data.credits == 0 && data.code.match(/\d{5}/)}
			<span class="nc-tag" title="This subject is worth 0 credits.">NC</span>
		{/if}
	</div>

	<div class="subject-column">{data.total}</div>

	<div class={`subject-column subject-grade ${getGradeClass(data.grade)}`}>{data.grade}</div>
</div>

<div class={`expandable ${visible ? '' : 'invisible'}`}>
	<div class="left">
		<div class="subject-column subject-expanded">
			{data.internal} <span class="subtext">Internal</span>
		</div>
		<div class="subject-column subject-expanded">
			{data.external} <span class="subtext"> External</span>
		</div>
		<div class="subject-column subject-expanded">
			{data.credits} <span class="subtext"> Credits</span>
		</div>
	</div>

	<div class="right">
		<div class="subject-column subject-expanded">
			{gradeToValue(data.grade)}&nbsp;<span class="subtext">Points</span>
		</div>
	</div>
</div>

<style lang="scss">
	.subject {
		display: grid;
		align-items: center;
		justify-content: center;
		grid-template-columns: 15% 65% 10% 10%;
		/* max-width: 50vw; */
		cursor: pointer;
		gap: 1rem;
		/* padding: 0.25rem 0rem 0.25rem 1.5rem; */
	}

	.expandable {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 2rem;
		font-size: 0.9rem;
		background-color: var(--expandable-background-color);
		border-radius: 0 0 1rem 1rem;
		box-shadow: 0 0 2px 2px var(--expandable-box-shadow-color) inset;
		gap: 1rem;
		transition: all 0.5s ease-in-out;

		.left {
			display: grid;
			align-items: center;
			justify-content: center;
			grid-template-columns: 1fr 1fr 1fr;
			max-width: 20vw;
			min-width: 10vw;
			gap: 1rem;
		}

		.right {
			display: flex;
			justify-content: flex-end;
		}
	}

	.invisible {
		display: none;
	}

	.subject-column {
		text-align: start;
		display: inline;

		.subtext {
			color: var(--subtext-color);
			font-weight: 300;
		}
	}

	.subject-code {
		text-align: center;
	}

	.subject-code.normal {
		color: var(--subject-normal-color);
		font-weight: 600;
		filter: drop-shadow(0 0 0.5rem var(--subject-normal-color));
	}

	.subject-code.lab {
		color: var(--subject-lab-color);
		font-weight: 600;
		filter: drop-shadow(0 0 0.5rem var(--subject-lab-color));
	}

	.subject-grade {
		text-align: start;
	}

	.subject-name {
		text-align: left;

		.lab-tag {
			color: #4089e9;
			font-size: 0.75rem;
			font-weight: 800;
			filter: drop-shadow(0 0 0.5rem #4089e9);
			padding: 0.25rem 0.5rem;
			border-radius: 0.5rem;
			margin-left: 0.5rem;
		}

		.nc-tag {
			color: #f44336;
			font-size: 0.75rem;
			font-weight: 800;
			filter: drop-shadow(0 0 0.5rem #f44336);
			padding: 0.25rem 0.5rem;
			border-radius: 0.5rem;
			margin-left: 0.5rem;
			cursor: help;
		}
	}

	.expand {
		border: none;
		outline: none;
		background-color: transparent;
		cursor: pointer;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
	}

	.grade-o {
		color: var(--o-grade-color);
		font-weight: 800;
		filter: drop-shadow(0 0px 0.5rem var(--o-grade-color));
	}

	.grade-ap {
		color: var(--ap-grade-color);
		font-weight: 800;
		filter: drop-shadow(0 0 0.75rem var(--ap-grade-color));
	}

	.grade-a {
		color: var(--a-grade-color);
		filter: drop-shadow(0 0 0.75rem var(--a-grade-color));
		font-weight: 700;
	}

	.grade-bp {
		color: var(--bp-grade-color);
		filter: drop-shadow(0 0 0.75rem var(--bp-grade-color));
		font-weight: 600;
	}

	.grade-b {
		color: var(--b-grade-color);
		filter: drop-shadow(0 0 0.75rem var(--b-grade-color));
		font-weight: 600;
	}

	.grade-c {
		color: var(--c-grade-color);
		filter: drop-shadow(0 0 0.75rem var(--c-grade-color));
		font-weight: 600;
	}

	.grade-f {
		color: var(--f-grade-color);
		filter: drop-shadow(0 0 0.75rem var(--f-grade-color));
		font-weight: 600;
	}

	.grade-ab {
		color: var(--ab-grade-color);
	}

	@media (max-width: 500px) {
		.subject {
			grid-template-columns: 1fr 4fr 1fr 1fr;
			padding: 0.2rem;
			width: 100%;
			font-size: 0.9rem;
		}

		.expandable {
			font-size: 0.8rem;
			padding: 0.5rem 1rem;
			gap: 0.5rem;

			.left {
				grid-template-columns: 1fr 1fr;
				max-width: 100%;
			}
		}
	}
</style>
