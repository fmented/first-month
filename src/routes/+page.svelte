<script lang="ts">
	import QuestionWithMultipleAnswer from '$lib/MultiChoice.svelte';
	import QuestionWithOptions from '$lib/Choice.svelte';
	import What from '$lib/What.svelte';
	import Roller from '$lib/Roller.svelte';
	import Bounce from '$lib/Bounce.svelte';
	import Envelope from '$lib/Envelope.svelte';

	let roller: Roller | undefined = $state();

	let n = $state(0);

	function unlock() {
		roller?.roll();
	}
</script>

<svelte:head>
	<title
		>I need you, i still love you, but i know my place, it's hell, i wish you a happy life, thank
		you for everything</title
	>
</svelte:head>
<Envelope>
	<Roller word="thank you" />
	<Roller word="for every" />
	<Roller word="precious" />
	<Roller word="memories" />
	<Roller word="we shared" />
	<Roller word="im a trash" />
	<Roller word="im sorry" easterEgg />
</Envelope>
