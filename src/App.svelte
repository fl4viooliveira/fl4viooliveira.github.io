<script>
	import Home from './Home.svelte'	
</script>

<style>
	:global(body) {
		background: #ffffff;
		display: grid;
		justify-content: center;
		align-content: center;
		grid-gap: 20px;
	}
	* { margin: 0; }

	.main-container{
		background: #dadadae0;
		width: 1440px;
		display: grid;
		justify-content: center;
		align-content: center;
		text-align: center;		
	}
</style>

<div class="main-container">
<Home />
</div>
