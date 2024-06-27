<script>
	export let htno;
</script>

<svelte:head>
	<title>Error | result-getter</title>
</svelte:head>

<main>
	<h1>Invalid Hall Ticket Number</h1>
	<p>The hall ticket number <strong>{htno}</strong> is invalid.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 20px;
	}

	h1 {
		font-size: 24px;
		margin-bottom: 10px;
	}

	p {
		font-size: 18px;
	}
</style>
