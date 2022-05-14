<script>
import NavBar from "./NavBar.svelte"
import PostCard from "./PostCard.svelte"
import {push} from 'svelte-spa-router'
import authenticationStore from "../Stores/AuthenticationStore"
import movieDataStore from "../Stores/MovieDataStore.js"
import popularMovieStore from "../Stores/PopularMovieStore"
import { getAllWeeklyTrending } from "../services/Api.svelte"
	
    
    const currentUser = Parse.User.current()
	if (currentUser === null){		
		push("/login")
	} else {
		authenticationStore.set({
			user: currentUser
		})
	}


    let movieData = []
    movieDataStore.subscribe((data) => {
        movieData = data
    })

    let popularMovies = []
    popularMovieStore.subscribe((data) => {
        popularMovies = data
    })

    if (movieData.length === 0) {
        getAllWeeklyTrending().then((data) => {
            popularMovieStore.set(data.results)
        })
    }
    
    $: movieDataStore.set(popularMovies)

</script>

<nav>
    <NavBar />    
</nav>
<div class="banner">
    <h1>Movie Gang</h1>
</div>

<div class= "section">
    <div clss = content>
        <div class = "sectionTitle"></div>
        <div class="movies-flex-container">
            <!-- postcards -->
            {#each movieData as movie, index}
                <PostCard movieDetails={movie} index={index}/>
            {/each}
        </div>
    </div>
</div>

<style>
    div{
        color: aliceblue;
    }

    .banner{
        height: auto;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 40px 0;;
        background-color: darkred;
    }

    .banner h1 {
        font-size: 120px;
        font-family: 'Alumni Sans Inline One', cursive;
        color: white;
    }

    .movies-flex-container{
        height: auto;
        padding: 0 20px;

        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .section{
        height:auto;
        width:95%;
        margin:0 auto;
        position: relative;
        display: grid;
        place-items: center;
        z-index: 998;
        border: 3px;
        border-color: red;

    }
    .sectionTitle{
        padding: 0 15 px;
        margin: 20px 0;
        display: flex;
        align-items: center;
        font-size: 20px;
        color: red;

    }

</style>