<script>
	import { GoogleAnalytics } from '@beyonk/svelte-google-analytics'
	import Home from './Home.svelte'	
</script>

<GoogleAnalytics properties={[ 'G-WQV15FT6HQ' ]} />
<Home />

<style>
	:global(body){
		margin: 0;
		padding: 0;
	}
</style>