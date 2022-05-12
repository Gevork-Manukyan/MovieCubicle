import { writable } from "svelte/store";

// Will be set
const favoritesStore = writable(undefined)

export default favoritesStore;