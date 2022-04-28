<script context="module">
    async function request() {
        try {
			const res = await fetch(`https://api.themoviedb.org/3/movie/550?api_key=${MOVIE_SECRET_KEY}`)
            let jsonRes = await res.json()
            return jsonRes;
		} catch (err) {
			console.log(err);
		}
    }

    export async function baseRequest() {
        return await request();
    }
</script>