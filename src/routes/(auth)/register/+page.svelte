<script lang="ts">
	import { Button, Input } from '$lib/components';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	$: errorMessage = form?.apiResponse?.message;
</script>

<h1 class="text-2xl pb-4 font-bold">Create a new Account</h1>

{#if errorMessage}
	<p class="text-red-400 pb-3">
		{form?.apiResponse?.message}
	</p>
{/if}

<form class="grid gap-4" method="post" novalidate>
	<Input type="email" name="email" placeholder="mathias@example.com" label="E-Mail" />
	<Input type="password" name="password" placeholder="***********" label="Password" />
	<Button>Register</Button>
</form>
