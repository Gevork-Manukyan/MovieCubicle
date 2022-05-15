<script>
	import Router, {push} from 'svelte-spa-router'
	import {wrap} from 'svelte-spa-router/wrap'
	import Login from './Components/Authentication/Login.svelte'
	import SignUp from './Components/Authentication/Signup.svelte'
	import MovieDetail from "./Components/MovieDetail.svelte"
	import Search from "./Components/Search.svelte"
	import Menu from "./Components/Menu.svelte";
	import authenticationStore from "./Stores/AuthenticationStore"
	import favoritesStore from "./Stores/FavoritesStore"
	import genreStore from "./Stores/GenreStore"
	import TriviaPage from './Components/Trivia/TriviaPage.svelte';
	import {getMovieGenre} from './services/Api.svelte'
	

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
	$: if (currentUser !== null && currentUser !== undefined) {
		const userFavorites = new Set(currentUser?.get("favorites"))
		favoritesStore.set(userFavorites)
	}


	getMovieGenre().then(data => {
		let obj = {} 
		data.genres.forEach(element => {
			obj[element.id] = element.name
		})
		genreStore.set(obj)
	})


</script>


<main>

	<Router routes={{
		'/': Menu,
		'/login': Login,
		'/signup': SignUp,
		'/movie/:index': MovieDetail,
		'/search/:inputvalue': Search,
		'/trivia': TriviaPage
	}} />

</main>