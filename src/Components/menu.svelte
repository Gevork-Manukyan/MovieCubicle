<script>
    import NavBar from "./NavBar.svelte"
    import PostCard from "./PostCard.svelte"
    import {push} from 'svelte-spa-router'
	import authenticationStore from "../Stores/AuthenticationStore"
	
    
    const currentUser = Parse.User.current()
	if (currentUser === null){		
		push("/signup")
	} else {
		authenticationStore.set({
			user: currentUser
		})
	}
</script>

<nav>
    <NavBar />    
</nav>
<div class="banner">
    <!-- Name of Website -->
    <h2>Video can be the background of this</h2>
    <!-- description of website -->
    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, id cupiditate perferendis totam nulla eius, amet molestias adipisci doloribus officia voluptas molestiae, eveniet fuga incidunt maxime ducimus tenetur ipsam vero.
    </p>
</div>

<div class= "section">
    <div clss = content>
        <div class = "sectionTitle">Latest!</div>
        <div class="movies-flex-container">
            <!-- postcards -->
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
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
        padding: 60px 0;;
        background-color: darkred;
    }

    .banner h2{
        font-size: 30px;
        padding: 0 50px;
    }

    .banner p{
        padding: 0 20%;
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