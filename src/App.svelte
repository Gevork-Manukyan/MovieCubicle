<script>
	import Router from 'svelte-spa-router'
	import Login from './Components/Authentication/Login.svelte'
	import SignUp from './Components/Authentication/Signup.svelte'
	import NavBar from "./Components/NavBar.svelte";
	import Menu from "./Components/menu.svelte";
	import { getAllDailyTrending, getCustomTrending } from "./services/Api.svelte"

	// TODO: Remove below test code
	async function createParseUser() {
		// Creates a new Parse "User" object, which is created by default in your Parse app
		let user = new Parse.User();
		// Set the input values to the new "User" object
		user.set("username", "steve");
		user.set("email", "Test1@test.com");
		user.set("password", "123456");
		try {
			// Call the save method, which returns the saved object if successful
			user = await user.save();
			if (user !== null) {
			// Notify the success by getting the attributes from the "User" object, by using the get method (the id attribute needs to be accessed directly, though)
			alert(
				`New object created with success! ObjectId: ${
				user.id
				}, ${user.get("username")}`
			);
			}
		} catch (error) {
			alert(`Error: ${error.message}`);
		}
	}
	// createParseUser()
</script>


<header>
	<!-- <h1 id="title">Movie Gang</h1>
	<NavBar /> -->
</header>
<main>

	<!-- <Menu /> -->
	<Router routes={{
		'/': SignUp,
		'/login': Login,
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
  