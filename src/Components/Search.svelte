<script>
    import searchStore from "../Stores/SearchStore.js";
    import movieDataStore from "../Stores/MovieDataStore.js";
    import { searchMovie } from "../services/Api.svelte";
    import PostCard from "./PostCard.svelte";
    import NavBar from "./NavBar.svelte";
    
    export let params
    let movies=[];

    const inputValue=params.inputvalue

    async function fetchMovies(inputValue){
        let res=await searchMovie(inputValue);
        movies=res.results;
    }

    fetchMovies(inputValue);
    $: console.log("these are my movies: " +movies);

    movieDataStore.set(movies)
    searchStore.set(movies)
</script>
<nav>
    <NavBar />    
</nav>
<div>{#each movies as movie, index}
    <PostCard movieDetails={movie} index={index}/>
{/each}</div>