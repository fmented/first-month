<script lang="ts">
	type Props = {
		width: number;
		height: number;
		src: string;
		alt: string;
	};

	let { width, height, src, alt }: Props = $props();
</script>

<div
	class="x"
	style="width: {width}px; height: {height}px; --width: {width}px; --height: {height}px"
>
	<img {width} {height} {src} {alt} class="y" />
</div>

<style>
	@keyframes x {
		100% {
			transform: translateX(calc(100vw - var(--width)));
		}
	}

	@keyframes y {
		100% {
			transform: translateY(calc(100vh - var(--height)));
		}
	}

	.x {
		position: fixed;
		top: 0;
		left: 0;
		animation: x 5s ease-in-out infinite alternate;
	}

	.y {
		animation: y 5s ease-in-out infinite alternate;
	}
</style>
