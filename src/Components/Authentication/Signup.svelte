<script>
  import { link } from "svelte-spa-router";
  import {push, pop, replace} from 'svelte-spa-router'
</script>


<header>

</header>
<main>
    <button on:click={() => push('/login')}>Login</button>
    <h3><a use:link={{href: "/login", disabled: false}}>Go to Login</a></h3>
</main>
<footer>

</footer>


<style>
	
</style>
