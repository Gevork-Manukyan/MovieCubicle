import { writable } from "svelte/store";

// Stores movie objects
const movieDataStore = writable([]) 

export default movieDataStore;