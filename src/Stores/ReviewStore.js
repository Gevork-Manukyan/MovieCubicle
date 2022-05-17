import { writable } from "svelte/store";

// Store for Reviews for a movie
const reviewStore = writable([])

export default reviewStore