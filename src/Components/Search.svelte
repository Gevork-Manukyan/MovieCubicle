<script>
    import searchStore from "../Stores/SearchStore.js";
    import movieDataStore from "../Stores/MovieDataStore.js";
    import { searchMovie } from "../services/Api.svelte";
    import PostCard from "./PostCard.svelte";
    import NavBar from "./NavBar.svelte";
    
    export let params
    $: inputValue=params.inputvalue
    
    // Variable to store all searched movies
    $: movies=[];
    searchStore.subscribe(data => {
        movies = data
    })

    // Call search api and put returned data is store
    async function fetchMovies(inputValue){
        let res= await searchMovie(inputValue);
        searchStore.set(res.results)
    }

    // Calls async function to retrieve data and put into store
    $: fetchMovies(inputValue);
    
    // Sets searched movies into store
    $:movieDataStore.set(movies)
    
</script>
<nav>
    <NavBar />    
</nav>


<div class="movies-flex-container">
    {#each movies as movie, index (movie.id)}
        <PostCard movieDetails={movie} index={index}/>
    {/each}
</div>

<style>
.movies-flex-container{
    height: auto;
    padding: 0 20px;
    margin-top: 50px;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: white;
}

</style>