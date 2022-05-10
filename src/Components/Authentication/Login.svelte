<script>
    import { link } from "svelte-spa-router";
    import {push, pop, replace} from 'svelte-spa-router'
</script>


<header>

</header>
<main>
    <button on:click={() => pop()}>Go back</button>
    <h3><a href="/" use:link>Go Back</a></h3>
    <h3><a use:link={"/"}>Go Back</a></h3>
</main>
<footer>

</footer>


<style>
	
</style>
