import { writable } from "svelte/store";

const authenticationStore = writable({
    user: undefined
})

export default authenticationStore;