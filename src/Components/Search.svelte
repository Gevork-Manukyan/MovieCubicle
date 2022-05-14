<script>
    import searchStore from "../Stores/SearchStore.js";
    import movieDataStore from "../Stores/MovieDataStore.js";
    import { searchMovie } from "../services/Api.svelte";
    import PostCard from "./PostCard.svelte";
    import NavBar from "./NavBar.svelte";
    
    export let params
    $: inputValue=params.inputvalue
    
    $: movies=[];
    searchStore.subscribe(data => {
        movies = data
    })

    async function fetchMovies(inputValue){
        let res= await searchMovie(inputValue);
        searchStore.set(res.results)
    }

    $: fetchMovies(inputValue);

    $:movieDataStore.set(movies)
    
</script>
<nav>
    <NavBar />    
</nav>


<div>
    {#each movies as movie, index (movie.id)}
        <PostCard movieDetails={movie} index={index}/>
    {/each}
</div>