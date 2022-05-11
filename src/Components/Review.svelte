<script>
    export let user
    export let review

    const username = user.get("username")
</script>


<div class="review">
    <div class="username">
        {username}
    </div>

    <div class="userReview">
        {review}
    </div>
</div>


<style>
    .review {
        margin: 0px 75px 20px;
        padding: 10px;
        background-color: white;
        border: solid red 1px;
        border-radius: 5px;
    }

    .username {
        margin-bottom: 10px;
        text-decoration: underline;
        font-size: 20px;
        font-family: 'Fugaz One', cursive;
    }

    .userReview {
        font-family: 'Roboto', sans-serif;
    }
</style>