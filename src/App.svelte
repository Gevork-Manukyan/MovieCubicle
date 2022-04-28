<script>
	import NavBar from "./NavBar.svelte";

	Parse.initialize(PARSE_APP_ID, PARSE_SECRET_KEY);
	Parse.serverURL = PARSE_URL;


</script>


<header>
	<h1 id="title">Movie Gang</h1>
	<NavBar />
</header>
<main>

</main>
<footer>

</footer>


<style>
	#title {
		margin: 0;
		padding: 17px 0px 17px 20px;
		color: #fff;
	}
</style>
