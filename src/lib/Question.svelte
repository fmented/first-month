<script lang="ts" generics="T extends Record<string, Option>">
	import Choice from './Choice.svelte';
	import MultiChoice from './MultiChoice.svelte';
	import type { Option, Question } from './type';
	import What from './What.svelte';
	import When from './When.svelte';

	const { ...props }: Question<T> = $props();
</script>

{#if props.type === 'choice'}
	<Choice {...props} />
{:else if props.type === 'multiple-choice'}
	<MultiChoice {...props} />
{:else if props.type === 'what'}
	<What {...props} />
{:else}
	<When {...props} />
{/if}
