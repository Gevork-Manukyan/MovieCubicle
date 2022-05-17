import { writable } from "svelte/store";

// Will be set
// Store for favorites info
const favoritesStore = writable(undefined)

export default favoritesStore;