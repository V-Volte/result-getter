<script lang="ts">
	import SearchComponent from '$lib/components/SearchComponent.svelte';

	export let htno: string = '';
</script>

<div class="hello-container">
	<h1>Check your results here!</h1>
	<div>
		<form action={`/results/${htno.toUpperCase()}`}>
			<SearchComponent bind:value={htno} large={true} placeholder="hallticket number"
			></SearchComponent>
		</form>
	</div>

	<h3 class="note">
		If results have just come out and/or the JNTU server is down, try <a
			class="results-link"
			href="/realtime/"
		>
			clicking here.
		</a>
	</h3>

	<div class="notice">
		<div class="note">
			<h3>Notice</h3>
		</div>
		<h2>This only works currently for BTech students of regulation R18 or above.</h2>
	</div>
</div>

<style lang="scss">
	.hello-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: calc(100vh - 15rem);
		gap: 1rem;
	}

	.note {
		font-size: 1rem;
		font-weight: 200;

		a.results-link {
			color: var(--gradient-start-blue);
			text-decoration: none;
			font-weight: 400;
			transition: all 0.3s ease-in-out;

			&:hover {
				filter: drop-shadow(0 0 0.5rem var(--gradient-start-blue));
			}
		}
	}

	.notice {
		font-size: 0.8rem;
		font-weight: 200;
		background-color: rgba(
			$color: var(--notice-background-color),
			$alpha: var(--notice-background-alpha)
		);
		color: var(--notice-text-color);
		padding: 1rem 1.5rem;
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		h2 {
			font-weight: 200;
			font-size: 1rem;
			margin: 0;
		}

		.note {
			font-size: 0.8rem;
			font-weight: 200;

			h3 {
				font-size: 1rem;
				font-weight: 400;
				margin: 0;
			}
		}
	}

	@media (max-width: 500px) {
		.hello-container {
			padding: 1rem;
		}
	}
</style>
