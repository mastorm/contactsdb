<script lang="ts">
	export let name: string;
	export let type: string;
	export let label: string;
	export let placeholder: string;
</script>

<div class="grid">
	<label class="pb-2 font-semibold" for={name}>{label}</label>
	<input
		class="p-2 rounded-xl border border-gray-400 focus:outline-white bg-black transition-all"
		{name}
		id={name}
		{type}
		{placeholder}
		on:change
		on:blur
	/>
</div>
