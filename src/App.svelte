<script>
	import Router, {push} from 'svelte-spa-router'
	import {wrap} from 'svelte-spa-router/wrap'
	import Login from './Components/Authentication/Login.svelte'
	import SignUp from './Components/Authentication/Signup.svelte'
	import NavBar from "./Components/NavBar.svelte";
	import Menu from "./Components/menu.svelte";
	import { getAllDailyTrending, getCustomTrending } from "./services/Api.svelte"
	import authenticationStore from "./Stores/AuthenticationStore"
	


	const currentUser = Parse.User.current()
	if (currentUser === null){		
		push("/login")
	} else {
		authenticationStore.set({
			user: currentUser
		})
	}

</script>


<header>
	<!-- <h1 id="title">Movie Gang</h1> -->
	<!-- <NavBar /> -->
</header>
<main>

	<Router routes={{
		'/': Menu,
		'/login': Login,
		'/signup': SignUp,
	}} />

</main>
<footer>

</footer>


<style>
	/* #title {
		margin: 0;
		padding: 17px 0px 17px 20px;
		color: #fff;
	} */
</style>
  