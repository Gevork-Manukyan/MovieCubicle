import { writable } from "svelte/store";

const genreStore = writable({
    movie: {},
    tv: {}
})

export default genreStore;