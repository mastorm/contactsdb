<script lang="ts">
	import { Button, Input } from '$lib/components';
</script>

<h1 class="text-2xl pb-4 font-bold">Create a new Account</h1>

<form class="grid gap-4" method="post" novalidate>
	<Input type="email" name="email" placeholder="mathias@example.com" label="E-Mail" />
	<Input type="password" name="password" placeholder="***********" label="Password" />
	<Button>Register</Button>
</form>
