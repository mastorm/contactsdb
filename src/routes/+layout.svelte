<script lang="ts">
	import type { LayoutData } from './$types';
	import '../app.css';
	import AppLayout from './AppLayout.svelte';

	export let data: LayoutData;
</script>

<AppLayout>
	{JSON.stringify(data)}
	<slot />
</AppLayout>
