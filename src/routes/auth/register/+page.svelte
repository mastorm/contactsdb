<script lang="ts">
	import { Button, Input } from '$lib';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1 class="text-2xl pb-4 font-bold">Create a new Account</h1>

<pre>
    {JSON.stringify(form, null, 2)}
</pre>

<form class="grid gap-4" method="post">
	<Input type="email" name="email" placeholder="mathias@example.com" label="E-Mail" />
	<Input type="password" name="password" placeholder="***********" label="Password" />
	<Button>Register</Button>
</form>
