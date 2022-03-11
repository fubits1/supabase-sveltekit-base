<script context="module">
	import * as db from '$lib/db';
	export async function load() {
		const countries = await db.countries.all().then((data) => {
			return data;
		});

		return {
			props: { countries }
		};
	}
</script>

<script>
	export let countries;
	let query = '';
	$: state =
		query.length > 0 ? countries.filter((country) => country.name.match(query)) : countries;

	let sortDesc = false;
	$: sortDescIcon = sortDesc ? '&#9650;' : '&#9660;';
	function sort(col) {
		if (sortDesc) {
			state = state.sort((a, b) => (a[col] > b[col] ? 1 : -1));
		} else {
			state = state.sort((a, b) => (a[col] < b[col] ? 1 : -1));
		}
		sortDesc = !sortDesc;
	}
</script>

<label for="filter"
	>Filter: <input name="filter" type="text" bind:value={query} placeholder="country" /> | Query: {query}
</label>
<hr />
{#await countries}
	<p>Loading data...</p>
{:then data}
	<p>{state.length} / {countries.length} rows selected</p>
	<hr />
	<table>
		<thead
			><tr>
				{#each Object.keys(state[0]) as item}
					<th><button on:click={sort(item)}>{item} {@html sortDescIcon}</button></th>
				{/each}
			</tr></thead
		>
		{#each state as country}
			<!-- <tr><td>{country.name}</td></tr> -->
			<tr>
				{#each Object.keys(state[0]) as item}
					<td>{country[item]}</td>
				{/each}</tr
			>
		{/each}
	</table>
{/await}
