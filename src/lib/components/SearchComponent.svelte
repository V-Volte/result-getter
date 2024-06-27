<script lang="ts">
	import SearchButton from './SearchButton.svelte';

	export let value: string;
	export let placeholder: string;
	export let large: boolean = false;
</script>

<div class="search-container">
	<input
		type="text"
		placeholder={placeholder || ' '}
		class={large ? 'large' : ''}
		autocomplete="off"
		bind:value
	/>
	<SearchButton {large}></SearchButton>
</div>

<style lang="scss">
	.search-container {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

		input {
			font-family: inherit;
			padding: 0.5rem 2rem 0.5rem 0.5rem;
			width: 9rem;
			border-radius: 100vw;
			border: none;
			background-color: inherit;
			color: var(--input-text-color);
			font-size: 1rem;
			font-weight: 300;
			border: 1px solid var(--input-border-color);
			transition: all 0.3s ease-in-out;
			text-align: center;

			&.large {
				font-size: 1.5rem;
				width: max-content;
				padding: 1rem 4rem 1rem 1.5rem !important;
			}

			&:focus {
				outline: none;
				box-shadow: 0 0 15px 5px var(--input-focus-box-shadow-color);
			}
		}
	}
</style>
