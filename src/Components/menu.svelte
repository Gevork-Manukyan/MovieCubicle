<script>
import NavBar from "./NavBar.svelte"
import PostCard from "./PostCard.svelte"
import {push} from 'svelte-spa-router'
import authenticationStore from "../Stores/AuthenticationStore"
import movieDataStore from "../Stores/MovieDataStore.js"
import { getAllWeeklyTrending } from "../services/Api.svelte"

    const backdropURL = "https://image.tmdb.org/t/p/w780"
   


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
    
    $:postTest= movieData[0]?.backdrop_path
    $:post2= movieData[1]?.backdrop_path
    $:post3= movieData[2]?.backdrop_path
    $:post4= movieData[3]?.backdrop_path
    $:post5= movieData[4]?.backdrop_path
    $:post6= movieData[5]?.backdrop_path
    $:post7= movieData[6]?.backdrop_path
    $:post8= movieData[7]?.backdrop_path

    getAllWeeklyTrending().then((data) => {
        movieDataStore.set(data.results)
    })

    var counter = 1;
    setInterval(function() {
        document.getElementById('radio' + counter).checked = true;
        counter++;
        if(counter > 4){
            counter = 1;
        }
    }, 5000);
</script>

<nav>
    <NavBar />    
</nav>
<div class="banner">
    <h1>Movie Gang</h1>
</div>

<div id="sliderr">
    <figure>
        <img src={backdropURL + postTest} alt="">
        <img src={backdropURL + post2} alt="">
        <img src={backdropURL + post3} alt="">
        <img src={backdropURL + post4} alt="">
        <img src={backdropURL + post5} alt="">
        <img src={backdropURL + post6} alt="">
        <img src={backdropURL + post7} alt="">
        <img src={backdropURL + post8} alt="">
    </figure>
</div>

<body>
    <div class= "section">
        <div clss = content>
            <div class = "sectionTitle"></div>
            <div class="movies-flex-container">
                <!-- postcards -->
                {#each movieData as movie, index (movie.id)}
                    <PostCard movieDetails={movie} index={index}/>
                {/each}
            </div>
        </div>
    </div>
</body>


<style>

    #sliderr{
        overflow: hidden;
        user-select: none;
    }
    #sliderr figure{
        position: relative;
        width: 500%;
        margin: 0;
        left: 0;
        animation: 20s slider infinite;
    }
    #sliderr figure img{
        width:10%;
        float: left;
    }
    @keyframes slider{
        0%{
            left:0;
        }
        20%{
            left: 0;
        }
        25%{
            left:-100%;
        }
        45%{
            left: -100%;
        }
        50%{
            left: -200%;
        }
        70%{
            left: -200%;
        }75%{
            left: -300%;
        }
        95%{
            left: -300%;
        }
        /* 100%{
            left: -400%;
        } */
    }
    .banner h1{
        color: rgba(255, 255, 255, 0.674);
        text-shadow:
        0 0 7px #fff,
        0 0 10px #fff,
        0 0 21px rgb(0, 0, 0),
        0 0 42px rgb(255, 0, 0),
        0 0 82px rgb(255, 0, 0),
        0 0 92px rgb(255, 0, 0),
        0 0 102px rgb(255, 0, 0),
        0 0 151px rgb(255, 0, 0);
        text-shadow: [x-offset] [y-offset] [blur-radius] [color];
        user-select: none;
    }
    h1{
        animation: flicker 1.5s infinite alternate;
        color: #fff;
    }
    @keyframes flicker {
    
    0%, 18%, 22%, 25%, 53%, 57%, 100% {
  
        text-shadow:
        0 0 4px #fff,
        0 0 11px #fff,
        0 0 19px #fff,
        0 0 40px rgb(255, 0, 0),
        0 0 80px rgb(255, 0, 0),
        0 0 90px rgb(255, 0, 0),
        0 0 100px rgb(255, 0, 0),
        0 0 150px rgb(255, 0, 0);
    
    }
    
    20%, 24%, 55% {        
        text-shadow: none;
    }    
  }
    
    body{
        background-image: linear-gradient(to top, black, darkred);
    }
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
        background-color: rgb(0, 0, 0);
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
        width:100%;
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