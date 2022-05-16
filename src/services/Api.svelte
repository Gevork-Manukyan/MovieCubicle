<script context="module">
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

    export async function getAllWeeklyTrending() {
        return await request("/trending/all/week");
    }

    export async function getAllDailyTrending() {
        return await request("/trending/all/day");
    }

    /**
     * 
     * @param mediaType all, movie, tv, person
     * @param timeWindow day, week
     */
    export async function getCustomTrending(mediaType, timeWindow) {
        return await request(`/trending/${mediaType}/${timeWindow}`);
    }

    export async function getMovieTrailer(movieID) {
        return await request(`/movie/${movieID}/videos`)
    }
    export async function searchMovie(input) {
        return await request(`/search/movie`, `&query=${input}&page=1&include_adult=false`)
    }

    export async function getTvShowTrailer(showID) {
        return await request(`/tv/${showID}/videos`)
    }

    export async function getMovieCast(movieID) {
        return await request(`/movie/${movieID}/credits`)
    }

    export async function getTvShowCast(showID) {
        return await request(`/tv/${showID}/credits`)
    }

    export async function getMovieGenre() {
        return await request(`/genre/movie/list`)
    }

    export async function getTvShowGenre() {
        return await request(`/genre/tv/list`)
    }
</script>