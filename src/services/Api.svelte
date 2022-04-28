<script context="module">
    async function request(method = 'GET', body = {}, headers = {}) {
        try {
			const res = await fetch(`https://api.themoviedb.org/3/movie/550?api_key=${MOVIE_SECRET_KEY}`, {
                method: method,
                body: (method !== 'GET') ? JSON.stringify(body) : null,
                headers: headers
            })

            return await res.json();
            
		} catch (err) {
			console.log(err);
		}
    }

    export async function baseRequest() {
        return await request();
    }
</script>