<script lang="ts">
	export let message: string = 'Loading...';
</script>

<div class="flex flex-col items-center justify-center">
	<svg
		class="mb-4 h-12 w-12 animate-spin text-red-700"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
	>
		<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
		></circle>
		<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
	</svg>
	<p class="text-xl text-white">{message}</p>
</div>
