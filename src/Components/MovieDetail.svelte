<script>
import movieDataStore from "../Stores/MovieDataStore"

    export let params;

    let movieInfo
    movieDataStore.subscribe((moviesData) => {
        movieInfo = moviesData[params.index]
    })

    // $: console.log(movieInfo)

</script>


<div>
    
</div>

<style>
    
</style>