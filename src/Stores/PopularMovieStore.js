import { writable } from "svelte/store";

// Store for popular movies
const popularMovieStore = writable([])

export default popularMovieStore;