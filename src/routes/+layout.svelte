<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import SearchComponent from '$lib/components/SearchComponent.svelte';

	let htno = '';

	let isMainPage: boolean;

	let theme = browser ? localStorage?.getItem('theme') || 'dark' : 'dark';

	const search = () => {
		if (htno) {
			goto(`/results/${htno.toUpperCase()}`);
		}
	};

	const switchTheme = () => {
		theme = theme === 'dark' ? 'light' : 'dark';
		if (browser) localStorage?.setItem('theme', theme);
	};
</script>

<div class={`topbar ${theme}`}></div>
<div class={`layout ${theme}`}>
	<div class="navbar">
		<a class="title" href="/">result-getter</a>
		<form action={`/results/${htno.toUpperCase()}`}>
			<!-- <div class="search-container">
				<div class="search-container">
					<input type="text" placeholder="roll number" autocomplete="off" bind:value={htno} />
					<button class="search-button" type="submit">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 400" class="search-icon"
							><path
								fill="currentColor"
								d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
							/></svg
						>
					</button>
				</div>
			</div> -->
			<SearchComponent bind:value={htno} placeholder="roll number"></SearchComponent>
		</form>
		<div class="icon-container">
			<button class="theme-switcher" on:click={switchTheme}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
					><path
						fill="currentColor"
						d="M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
					/></svg
				>
			</button>

			<a href="https://github.com/V-Volte/JNTUHResultGetter" class="github">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"
					><path
						d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
					/></svg
				>
			</a>
		</div>
	</div>

	<slot {htno} {isMainPage}></slot>

	<div class="footer">
		<div class="footer-text">Made with <span class="heart">❤️</span> for you and hate for JNTU</div>
		<div class="footer-text">&#8226;</div>
		<div class="footer-text">by <a href="https://www.github.com/V-Volte">V-Volte</a></div>
	</div>
</div>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Red+Hat+Mono:ital,wght@0,300..700;1,300..700&family=Manrope:wght@200..800&display=swap');

	@import url('$lib/assets/style.css');

	.footer {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 2rem;
		font-size: 1rem;
		color: var(--subtext-color);
		background-color: transparent;
		backdrop-filter: blur(10px);
		bottom: 0;
		position: relative;

		.heart {
			color: red;
			filter: drop-shadow(0 0 0.5rem red);
		}

		a {
			color: var(--subtext-color);
			text-decoration: none;
			font-weight: 800;
			transition: all 0.3s ease-in-out;

			&:hover {
				color: var(--gradient-start-blue);
			}
		}
	}

	.topbar {
		height: 0.5rem;
		position: sticky;
		top: 0;
		z-index: 1500;
		background-image: linear-gradient(90deg, var(--gradient-start-blue), var(--gradient-end-pink));
		width: 100%;
		right: 0;
		left: 0;
		// height: 3rem;
		// background-color: #1a1a1aaa;
		// backdrop-filter: blur(10px);
	}
	slot {
		margin: 0;
		padding: 0;
	}
	.layout {
		font-family: 'Gothic A1', 'Inter', sans-serif;
		color: var(--layout-color);
		background-color: var(--layout-background-color);
		min-width: max-content;
		min-height: calc(100vh - 0.5rem);
		padding: 0;
		left: 0;
	}

	.navbar {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		gap: 5rem;
		background-color: var(--navbar-background-color);
		backdrop-filter: blur(10px);
		box-shadow: 0 0 15px 1px var(--navbar-box-shadow-color);
		// position: sticky;
		top: 0px;
		margin-bottom: 2rem;
		z-index: 1000;

		.title {
			font-size: 1.75rem;
			font-weight: 600;
			letter-spacing: 0.1rem;
			text-align: center;
			background: linear-gradient(90deg, var(--gradient-start-blue), var(--gradient-end-pink));
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			filter: drop-shadow(0 0 0.75rem var(--gradient-start-blue))
				drop-shadow(0 0 0.75rem var(--gradient-end-pink));
			font-family: 'Red Hat Mono', monospace;
		}

		.icon-container {
			display: flex;
			gap: 1rem;

			* {
				color: var(--icon-color);
			}
		}

		.theme-switcher {
			background-color: transparent;
			border: none;
			cursor: pointer;
			padding: 0.5rem;
			right: 1rem;
			top: 1rem;

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
				transform: scale(0.9);
			}
		}

		.github {
			background-color: transparent;
			border: none;
			cursor: pointer;
			padding: 0.5rem;
			right: 1rem;
			top: 1rem;

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
				transform: scale(0.9);
			}
		}
	}

	@media (max-width: 500px) {
		.navbar {
			justify-content: space-evenly;
			gap: 1rem;
			padding: 1rem;
			.title {
				font-size: 1.25rem;
			}
		}

		.layout {
			left: 0;
			overflow-x: hidden;
			min-width: 80%;
		}

		slot {
			padding-bottom: 1rem;
			margin: 0;
		}

		.icon-container,
		.icon-container * {
			display: none;
		}
	}
</style>
