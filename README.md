# rx-svelte-forms
Reactive svelte forms inspired by angular reactive forms.

## Installation
Using yarn
```bash
yarn add rx-svelte-forms
```
Using npm
```bash
npm install rx-svelte-forms
```

## Usage
```svelte
<script lang="ts">
	import fb, { validators, form, FormControl } from "rx-svelte-forms";

	/* Custom Async validator */
	class CustomAsyncValidators {
		static isEmailInUse(ctrl: FormControl<string>): Promise<string | undefined> {
			return new Promise(res => {
				setTimeout(() => res(undefined), 1000)
			})
		}
	}

	const userForm = fb.group({
		name: ["", [validators.required(), validators.isString(), validators.isAlpha(), validators.minLength(3), validators.maxLength(16)]],
		email: ["", [validators.required(), validators.isString(), validators.isEmail({ require_tld: true })], [CustomAsyncValidators.isEmailInUse]],
		termsAndConditions: [false, [validators.requiredTrue()]]
	})

	$: userForm$ = $userForm;
	$: name = userForm$.value.name;
	$: email = userForm$.value.email;
	$: terms = userForm$.value.termsAndConditions;

	function onSubmit() {
		console.log(userForm.value);
	}
</script>

<form use:form={userForm} on:submit|preventDefault={onSubmit}>
	<label>
		Name:
		<input type="text" name="name" />
		{#if name.touched && name.error}
			<p>{name.error}</p>
		{/if}
	</label>

	<label>
		Email:
		<input type="email" name="email" />
		{#if email.touched && email.error}
			<p>{email.error}</p>
		{/if}
	</label>

	<label>
		Terms and Conditions:
		<input type="checkbox" name="termsAndConditions" />
		{#if terms.touched && terms.error}
			<p>{terms.error}</p>
		{/if}
	</label>

	<button type="submit" disabled={userForm$.pending || userForm$.invalid}>
		Submit
	</button>
</form>


<div style="white-space: pre;">
	{JSON.stringify(userForm$, undefined, 4)}
</div>

<style>
	:global(.rsf-touched.rsf-error) {
		border: 1px solid red;
	}
</style>
```
