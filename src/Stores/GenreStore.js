import { writable } from "svelte/store";

// Stores all genres for movies and tv shows
const genreStore = writable({
    movie: {},
    tv: {}
})

export default genreStore;