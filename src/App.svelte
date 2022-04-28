<script>
	import NavBar from "./NavBar.svelte";
	import { getAllDailyTrending, getCustomTrending } from "./services/Api.svelte"

</script>


<header>
	<h1 id="title">Movie Gang</h1>
	<NavBar />
</header>
<main>
	<button>
		hello
	</button>
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
