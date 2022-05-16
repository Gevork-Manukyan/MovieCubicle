<script>
import Review from "../Components/Review.svelte"
import NavBar from "./NavBar.svelte"
import movieDataStore from "../Stores/MovieDataStore"
import reviewStore from "../Stores/ReviewStore"
import favoritesStore from "../Stores/FavoritesStore"
import genreStore from "../Stores/GenreStore"
import { getAllWeeklyTrending, getMovieTrailer, getTvShowTrailer, getMovieCast, getTvShowCast } from "../services/Api.svelte"
import { Button, Form, FormGroup, Input, Label } from 'sveltestrap';


    export let params;

    // RETRIEVE MOVIE INFO
    let movieInfo
    movieDataStore.subscribe((moviesData) => {
        movieInfo = moviesData[params.index]
    })

    if (movieInfo === undefined) {
        getAllWeeklyTrending().then((data) => {
            movieDataStore.set(data.results)
        })
    }

    // RETRIEVE TRAILER
    let video
    $: if (movieInfo?.id !== undefined) {

        const mediaType = movieInfo?.media_type
        // MOVIES
        if (mediaType === "movie") {
            getMovieTrailer(movieInfo?.id).then(data => {
                
                video = data?.results?.filter((element) => {
                    if (element.name === "Official Trailer" || element.name === "Main Trailer")
                        return element;
                })[0]
            })
        } 
        // TV SHOWS
        else if (mediaType === "tv") {
            getTvShowTrailer(movieInfo?.id).then(data => {

                video = data?.results?.filter((element) => {
                    if (element.name === "Official Trailer" || element.name === "Main Trailer")
                        return element;
                })[0]
            })
        }
    }


    // RETRIEVE REVIEWS
    let reviews
    reviewStore.subscribe((reviewData) => {
        reviews = reviewData.filter(movie => movie.get("movieTitle") === title)
    })

    if (reviews === undefined || reviews.length === 0) {
        const query = new Parse.Query("Reviews")
        query.include('user')
        query.include('movieTitle')
        query.include('review')
        query.descending("createdAt")

        const result = query.find().then(result => {
            reviewStore.set(result)
        })
    }

    // RETRIEVE GENRES
    let genresStore
    genreStore.subscribe(data => {
        genresStore = data
    })

    function getGenres() {
        if(genres === undefined || genres === null) 
            return [];
        else 
            return genres;
    }


    // RETRIEVE CAST
    let cast = []
    const mediaType = movieInfo?.media_type
    if (mediaType === "movie") {
        getMovieCast(movieInfo?.id).then(data => {
            cast = data.cast.map(element => {
                return element.name;
            })
        })

    } else if (mediaType === "tv") {
        getMovieCast(movieInfo?.id).then(data => {
            cast = data.cast.map(element => {
                return element.name;
            })
        })
    }


    $: title =  movieInfo?.title !== undefined ? movieInfo?.title : movieInfo?.name
    $: overview = movieInfo?.overview
    $: genres = movieInfo?.genre_ids.map(id => genresStore[id])
    $: backdropPath = movieInfo?.backdrop_path
    $: posterPath = movieInfo?.poster_path
    const backdropURL = "https://image.tmdb.org/t/p/w780"
    const posterURL = "https://image.tmdb.org/t/p/w300"

    let textAreaContent = ""
    async function handleSubmit (e) {
        e.preventDefault()

        const currentUser = Parse.User.current()
        const movieTitle = title
        
        const newReviewObject = new Parse.Object('Reviews')
        newReviewObject.set('user', currentUser)
        newReviewObject.set('movieTitle', movieTitle)
        newReviewObject.set('review', textAreaContent)

        try {
            await newReviewObject.save().then(result => {
                reviews.unshift(result)
                reviewStore.set(reviews)
            })

            textAreaContent = ""
        } catch (e) {
            console.error('Error while creating review Parse Object: ', error);
        }
    }


    let favorites
    favoritesStore.subscribe((data) => {
        favorites = data
    })
    async function handleStarClick () {

        // Unfavorite
        if (favorites.has(title)) {
            favorites.delete(title)
            favoritesStore.set(favorites)
        }
        
        // Favorite        
        else {
            favorites.add(title)
            favoritesStore.set(favorites)
        }
        
        // Update Server
        const favoritesArray = [...favorites]
        try {
            const user = Parse.User.current()
            user.set("favorites", favoritesArray)
            await user.save()

        } catch(e) {
            console.error("Error trying to update favorites")
        }
    }


    let isPlayed = false
    function handlePlayButtonClick () {
        isPlayed = true
    }

</script>

<NavBar />
<div id="content-wrapper">
    <div id="backdrop" class="item">
        <div class="img-wrap">
            <span class={`material-symbols-outlined playBtn ${isPlayed ? "hidden": ""}`} on:click={handlePlayButtonClick}>play_circle</span>
            <div id="trailer" class={`${isPlayed ? "" : "hidden"}`}>
                <iframe title="trailer" width="500" height="395"
                    src="https://www.youtube.com/embed/{video?.key}">
                </iframe>
            </div>
            <img id="backdrop-img" src={backdropURL + backdropPath} alt="{title} back drop" />
        </div>
    </div>
    <h1 id="movieTitle">
        {title === undefined ? "MOVIE TITLE" : title}
    </h1>

    <div id="content-area">
        <div id="posterImg">
            <span class={`material-symbols-outlined star ${favorites?.has(title) ? "favorited" : ""}`} on:click={handleStarClick} >grade</span>
            <img src={posterURL + posterPath} alt="{title} poster" />
        </div>
        <div id="right-side">
            <div id="overview">
                <h2>Overview</h2>
                {overview}
            </div>
        
            <div id="genres">
                <h2>Genres</h2>
                <div id="genres-flex-container">
                    {#each getGenres(genres) as genre}
                        <div class="genre">{genre}</div>
                    {/each}
                </div>
            </div>
        </div>
    </div>

    <div id="cast">
        <h2>Cast</h2>
        <div id="cast-flex-container">
            {#each cast as person (person)}
            <div class="person">{person}</div>
            {/each}
        </div>
    </div>
        
    <div id="review-area">
        <h2 id="reviewTitle">Review</h2>
        <Form on:submit={handleSubmit}>
            <FormGroup floating label="What did you think...">
                <Input type="textarea" placeholder="What did you think..." bind:value={textAreaContent} />
            </FormGroup>
            <div id="button-wrapper">
                <Button type="submit">Submit</Button>
            </div>
        </Form>
    </div>

    <div id="current-reviews">
        {#each reviews as review (review.id) }
            <Review user={review.get("user")} review={review.get("review")} />
        {/each}
    </div>
</div>



<style>

    .star {
        position: absolute;
        margin-top: 17px;
        margin-left: 17px;
    }

    #content-wrapper {
        height: fit-content;
        width: 780px;

        position: absolute;
        left: 50%;
        transform: translateX(-50%);

        background-color: rgba(0, 0, 0, 0.4);
    }

    #backdrop {
        text-align: center;
        user-select: none;
    }


    .material-symbols-outlined.playBtn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(5);
        color: rgba(0, 0, 0, 0.498);
        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
    }

    .material-symbols-outlined.playBtn:hover {
        cursor: pointer;
        font-variation-settings:
        'FILL' 1,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
    }

    #movieTitle {
        margin-top: 25px;
        color: white;
        text-align: center;
        text-decoration: underline;
    }

    #content-area {
        margin-top: 50px;
        display: flex;
        flex-direction: row;
        width: inherit;
    }

    h2 {
        margin-top: 20px;
    }

    #right-side {
        color: white;
    }

    #overview {
        margin-left: 25px;
        margin-right: 60px;
        text-align: justify;
        align-self: center;
    }

    #cast {
        margin-left: 25px;
        margin-right: 60px;
        text-align: justify;
        align-self: center;
        color: white;
    }
    
  
    #genres-flex-container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    #genres {
        margin-left: 25px;
        margin-right: 60px;
        text-align: justify;
        align-self: center;
    }

    #posterImg {
        width: fit-content;
        margin-left: 60px;
        user-select: none;
    }

    .material-symbols-outlined.star {
        user-select: none;
        color: yellow;
        font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 48
    }

    .material-symbols-outlined.star:hover {
        color: yellow;
        cursor: pointer;
        font-variation-settings:
            'FILL' 1,
            'wght' 400,
            'GRAD' 0,
            'opsz' 48
    }

    .material-symbols-outlined.favorited {
        color: yellow;
        cursor: pointer;
        font-variation-settings:
            'FILL' 1,
            'wght' 400,
            'GRAD' 0,
            'opsz' 48
    }

    #trailer {
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        /* padding-bottom: 32px;
        margin-top: 50px; */
    }
    
    #review-area {
        border-top: dotted white 5px;
        margin: 64px 75px 75px;
        padding-top: 32px;
    }
    
    #reviewTitle {
        color: white;
    }
    
    #button-wrapper {
        display: block;
        text-align: right;
    }

    .item {
        margin: 0 auto;
        position: relative;
        overflow: hidden;
    }
    .item .img-wrap:before {
        content: '';
        background-image: linear-gradient(to top, rgb(255, 255, 255, 1), rgba(239,239,239,0));
        height: 320px;
        width: 780px;
        position: absolute;
        right: auto;
        bottom: 0;
        left: auto;
    }
    .item .img-wrap:after {
        content: '';
        display: block;
    }
    .img-wrap img {
        border: 0;
        box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);
    }

    .hidden {
        display: none !important;
    }
</style>