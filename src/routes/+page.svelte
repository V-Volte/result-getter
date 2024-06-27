<script>
	export const isMainPage = true;
</script>

<div class="main-page">
	<div class="title">result-getter</div>

	<div class="text">
		<p>
			is a website that allows you to view and share your aggregate JNTUH results in a clean,
			concise format.
		</p>
	</div>

	<div class="column-container">
		<div class="column">
			<h2>Aggregate results</h2>
			<p class="caption">
				View your semester-wise results and CGPA. Use when the JNTU server is up and running nicely.
			</p>
			<a href="/results" class="button">View results</a>
		</div>
		<div class="separator"></div>
		<div class="column">
			<h2>Real-time results</h2>
			<p class="caption">
				View your results as soon as they are out. Use when the JNTU server is down or slow.
			</p>
			<a href="/realtime" class="button">View results</a>
		</div>
	</div>
</div>

<style lang="scss">
	.main-page {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: calc(100vh - 15rem);
		gap: 1rem;

		.title {
			font-size: 4rem;
			font-weight: 600;
			font-family: 'Red Hat Mono', monospace;
			background: linear-gradient(90deg, var(--gradient-start-blue), var(--gradient-end-pink));
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			filter: drop-shadow(0 0 1rem var(--gradient-start-blue))
				drop-shadow(0 0 1rem var(--gradient-end-pink));
		}

		.text {
			font-size: 1.5rem;
			font-weight: 400;
			text-align: center;
			max-width: 40vw;
			line-height: 2.25rem;
		}

		.column-container {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 2rem;
			margin-top: 2rem;
			max-width: 50vw;

			.separator {
				width: 0.1rem;
				height: 100%;
				background-color: var(--layout-color);
				filter: blur(1px);
			}

			.column {
				display: flex;
				flex-direction: column;
				padding: 1rem;
				gap: 1rem;
				align-items: center;
				// border-radius: 1rem;
				// box-shadow: 10px 10px 20px 15px rgba(0, 0, 0, 0.2);
				// background-color: var(--card-background-color);
				transition: all 0.3s ease-in-out;

				h2 {
					font-size: 2rem;
					font-weight: 600;
					margin: 0;
				}

				.caption {
					font-size: 1rem;
					font-weight: 200;
					text-align: center;
				}

				.button {
					padding: 0.5rem 1rem;
					border-radius: 5rem;
					border: 1px solid var(--layout-color);
					text-decoration: none;
					color: var(--layout-color);
					transition: all 0.3s ease-in-out;

					&:hover {
						box-shadow: 0 0.5rem 2rem var(--input-focus-box-shadow-color);
					}
				}
			}
		}
	}

	@media (max-width: 900px) {
		.main-page {
			height: max-content;
			.title {
				font-size: 3rem;
			}

			.text {
				font-size: 1.25rem;
				max-width: 80vw;
			}

			.column-container {
				flex-direction: column;
				gap: 2rem;
				max-width: 80vw;

				.separator {
					width: 100%;
					height: 0.1rem;
				}

				.column {
					padding: 1rem;
					gap: 1rem;
					// border-radius: 1rem;
					// box-shadow: 10px 10px 20px 15px rgba(0, 0, 0, 0.2);
					// background-color: var(--card-background-color);
					transition: all 0.3s ease-in-out;

					h2 {
						font-size: 1.5rem;
					}

					.caption {
						font-size: 1rem;
					}

					.button {
						padding: 0.5rem 1rem;
						border-radius: 5rem;
						border: 1px solid var(--layout-color);
						text-decoration: none;
						color: var(--layout-color);
						transition: all 0.3s ease-in-out;

						&:hover {
							box-shadow: 0 0.5rem 2rem var(--input-focus-box-shadow-color);
						}
					}
				}
			}
		}
	}
</style>
