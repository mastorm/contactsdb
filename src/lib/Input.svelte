<script lang="ts">
	import { page } from '$app/stores';
	import { error } from '@sveltejs/kit';
	export let name: string;
	export let type: string;
	export let label: string;
	export let placeholder: string;

	$: myErrors = $page?.form?.[name] as { _errors: string[] } | undefined;
	$: hasErrors = myErrors && myErrors._errors.length > 0;
</script>

<div class="grid">
	<label class="pb-2 font-semibold" class:text-red-400={hasErrors} for={name}>{label}</label>
	<input
		class:text-red-400={hasErrors}
		class="p-2 rounded-xl border border-gray-400 focus:outline-white bg-black transition-all"
		{name}
		id={name}
		{type}
		{placeholder}
		on:change
		on:blur
	/>
	{#if hasErrors}
		<ul class="text-red-400 list-disc px-8 py-2">
			{#each myErrors?._errors ?? [] as error}
				<li>{error}</li>
			{/each}
		</ul>
	{/if}
</div>
