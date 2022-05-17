import { writable } from "svelte/store";

// Store for searched movies
const searchStore= writable([])

export default searchStore;