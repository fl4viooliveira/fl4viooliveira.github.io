<script>
	import tilt from './tilt.js';
	
	let reverse = false;
</script>

<style>
	:global(body) {
		display: grid;
		justify-content: center;
		align-content: center;
		grid-gap: 20px;
	}
	* { margin: 0; }
	div {
		height: 200px;
		width: 200px;
		background: linear-gradient(45deg, #cc00ff, #d9055d);
		color: white;
		
		display: grid;
		justify-content: center;
		align-content: center;
		text-align: center;
	}
</style>

<div use:tilt={{ scale: 1.1, reverse }}>
	<h3>Svelte Tilt Test!</h3>
	<p>
		Just hover!
	</p>
</div>

<button on:click={() => reverse = !reverse}>
	toggle tilt direction
</button>
