<script>
    import { searchMovie } from "../services/Api.svelte";
    import PostCard from "./PostCard.svelte"
    
    export let params
    let movies=[];

    const inputValue=params.inputvalue
    async function fetchMovies(inputValue){
        let res=await searchMovie(inputValue);
        movies=res.results;
    }

    fetchMovies(inputValue);
    $: console.log("these are my movies: " +movies);
</script>
<div>{#each movies as movie, index}
    <PostCard movieDetails={movie} index={index}/>
{/each}</div>