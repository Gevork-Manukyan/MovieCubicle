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
        <div class="post">
            <!-- postcards -->
            <div class="postcards">
                <a href="#">
                    <!-- image of the movie goes here -->
                    <img src="public/favicon.png" alt="">
                    <!-- description of the movie goes here -->
                    <h2 class="Title">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae ducimus minima, placeat excepturi quae velit corporis quaerat natus perferendis ratione fugiat. Laudantium itaque consectetur ullam iusto, cum quia repellendus officiis?</h2>
                </a>
            </div>
            <div class="postcards">
                <a href="#">
                    <!-- image of the movie goes here -->
                    <img src="public/favicon.png" alt="">
                    <!-- description of the movie goes here -->
                    <h2 class="Title">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae ducimus minima, placeat excepturi quae velit corporis quaerat natus perferendis ratione fugiat. Laudantium itaque consectetur ullam iusto, cum quia repellendus officiis?</h2>
                </a>
            </div>
            <div class="postcards">
                <a href="#">
                    <!-- image of the movie goes here -->
                    <img src="public/favicon.png" alt="">
                    <!-- description of the movie goes here -->
                    <h2 class="Title">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae ducimus minima, placeat excepturi quae velit corporis quaerat natus perferendis ratione fugiat. Laudantium itaque consectetur ullam iusto, cum quia repellendus officiis?</h2>
                </a>
            </div>
            <div class="postcards">
                <a href="#">
                    <!-- image of the movie goes here -->
                    <img src="public/favicon.png" alt="">
                    <!-- description of the movie goes here -->
                    <h2 class="Title">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae ducimus minima, placeat excepturi quae velit corporis quaerat natus perferendis ratione fugiat. Laudantium itaque consectetur ullam iusto, cum quia repellendus officiis?</h2>
                </a>
            </div>
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

    /* movie cards */
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
    .post{
        height: auto;
        width: 100;
        padding: 0 20px;
        display: grid;
        grid-template-columns: repeat(2, 200px);
        grid-gap:40px;

    }

    .post .postcards{
        width: 200px;
        height: 300px;
        background: rgb(0, 0, 0);
        border: 2px solid red;
        border-radius: 10%;
    }

    .postcards a{
        text-decoration: none;
        
    }
    .postCards a img{
        width:100%;
        height: 280px;

    }

    .Title{
        height: 80px;
        font-size: 14px;
        margin: 4px 0;
        padding: 0 5px;
        color: white;
    }


</style>