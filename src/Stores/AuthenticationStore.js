import { writable } from "svelte/store";

// Store for user info
const authenticationStore = writable({
    user: undefined
})

export default authenticationStore;