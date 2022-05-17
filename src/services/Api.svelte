<script context="module">

    // Function that takes care of calling api and abstract repetitive code
    async function request(endpoint = "", query = "", method = 'GET', body = {}, headers = {}) {
        try {
			const res = await fetch(`https://api.themoviedb.org/3${endpoint}?api_key=${MOVIE_SECRET_KEY}${query}`, {
                method: method,
                body: (method !== 'GET') ? JSON.stringify(body) : null,
                headers: headers
            })

            return await res.json();

		} catch (err) {
			console.log(err);
		}
    }

    // Returns weekly trending movies and shows
    export async function getAllWeeklyTrending() {
        return await request("/trending/all/week");
    }

    // Returns daily trending movies and shows
    export async function getAllDailyTrending() {
        return await request("/trending/all/day");
    }

    // Custom function to get movies/shows in specific time frame
    export async function getCustomTrending(mediaType, timeWindow) {
        return await request(`/trending/${mediaType}/${timeWindow}`);
    }

    // Gets trailers for a specific movie based on ID
    export async function getMovieTrailer(movieID) {
        return await request(`/movie/${movieID}/videos`)
    }

    // Gets trailers for a specific tv show based on ID
    export async function getTvShowTrailer(showID) {
        return await request(`/tv/${showID}/videos`)
    }

    // Get cast of movie based on ID
    export async function getMovieCast(movieID) {
        return await request(`/movie/${movieID}/credits`)
    }

    // Get cast of tv show based on ID
    export async function getTvShowCast(showID) {
        return await request(`/tv/${showID}/credits`)
    }

    // Get map of all genres with their id's for movies
    export async function getMovieGenre() {
        return await request(`/genre/movie/list`)
    }

    // Get map of all genres with their id's for tv shows
    export async function getTvShowGenre() {
        return await request(`/genre/tv/list`)
    }

    // Search data base using a string input and return relavent movies
    export async function searchMovie(input) {
        return await request(`/search/movie`, `&query=${input}&page=1&include_adult=false`)
    }
</script>