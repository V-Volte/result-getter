<script lang="ts">
	export let large: boolean = false;
</script>

<button class={`search-button ${large ? 'large' : ''}`} type="submit">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 400" class="search-icon"
		><path
			fill="currentColor"
			d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
		/></svg
	>
</button>

<style lang="scss">
	.search-button {
		color: var(--search-button-color);
		background-color: transparent;
		border: none;
		border-radius: 10px;
		padding: 0.5rem 1rem;
		cursor: pointer;
		content: '\1F50D';
		height: 100%;
		transition: all 0.1s ease-in-out;
		position: absolute;
		right: 0;
		top: 0;

		&:hover {
			filter: drop-shadow(0 0 0.5rem var(--search-button-color)) brightness(2);
		}

		&:active {
			transform: scale(0.9);
		}

		&.large {
			padding: 0.5rem 1.5rem;

			.search-icon {
				width: 1.25rem;
				height: 1.5rem;
				vertical-align: -0.2rem;
			}
		}

		.search-icon {
			color: var(--search-button-color);
			width: 0.8rem;
			height: 1rem;
			vertical-align: -0.125rem;
		}
	}
</style>
