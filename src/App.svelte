<script>
	import Router, {push} from 'svelte-spa-router'
	import {wrap} from 'svelte-spa-router/wrap'
	import Login from './Components/Authentication/Login.svelte'
	import SignUp from './Components/Authentication/Signup.svelte'
	import MovieDetail from "./Components/MovieDetail.svelte"
	import Menu from "./Components/Menu.svelte";
	import authenticationStore from "./Stores/AuthenticationStore"
	import favoritesStore from "./Stores/FavoritesStore"
import Search from './Components/search/search.svelte';
	

	// Authentication check
	const currentUser = Parse.User.current()
	if (currentUser === null){		
		push("/login")
		authenticationStore.set({
			user: undefined
		})

	} else {
		authenticationStore.set({
			user: currentUser
		})
	}	


	// Get favorites
	const userFavorites = new Set(currentUser?.get("favorites"))
	favoritesStore.set(userFavorites)
	// console.log("APP: ", userFavorites)

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
		'/movie/:index': MovieDetail,
		'/search/:inputvalue': Search
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
  