<script>

</script>


<div class="postcard">
    <!-- image of the movie goes here -->
    <!-- <img src="" alt=""> -->
    <!-- description of the movie goes here -->
    <h2 class="Title">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae ducimus minima, placeat excepturi quae velit corporis quaerat natus perferendis ratione fugiat. Laudantium itaque consectetur ullam iusto, quia repellendus officiis?</h2>
</div>


<style>
    .postcard{
        width: 400px;
        height: 300px;
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
        height: 80px;
        font-size: 14px;
        margin: 4px 0;
        padding: 0 5px;
        color: white;
    }
</style>