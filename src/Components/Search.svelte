<script>
    export let params
    let movies;

    const inputValue=params.inputvalue
    async function fetchMovies(inputValue){
    movies= await searchMovie(inputvalue);
    
    }
    fetchMovies(inputValue);
    $: console.log(movies);
</script>