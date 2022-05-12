<script>
import { push } from "svelte-spa-router";

    export let movieDetails
    export let index

    const movieTitle = movieDetails?.title !== undefined ? movieDetails?.title : movieDetails?.name;
    const movieOverview = movieDetails?.overview;
    const posterPath= movieDetails?.poster_path;
</script>

<!-- on:click={push("/movie/" + movieTitle)} -->
<div class="postcard" on:click={push("/movie/" + index)}>
    <!-- image of the movie goes here -->
    <!-- <img src="" alt=""> -->
    <!-- description of the movie goes here -->
    <h3 class="Title">{movieTitle}</h3>
    <img src="https://image.tmdb.org/t/p/original{posterPath}" alt="{movieTitle} poster" />
    <p class="Overview">{movieOverview}</p>
</div>


<style>
    .postcard{
        width: 400px;
        padding: 15px 20px;
        margin: 0px 15px 30px;

        background: rgb(0, 0, 0);
        border: 4px solid red;
        border-radius: 10%;

        transition-property: all;
        transition-duration: 0.2s;
        transition-timing-function: linear;
        transition-delay: 0s;
    }

    .postcard:hover {
        cursor: pointer;
        transform: translateY(-5px) scale(1.04);
        /* box-shadow: 0px 11px 17px 5px rgba(0,0,0,0.75); */
        border: 4px solid gold;
    }

    .postcard img{
        width:100%;
        height: 280px;
    }

    .Title{
        font-size: 26px;
        color: white;
        text-align: center;
    }

    .Overview {
        margin: 0px;
    }
</style>