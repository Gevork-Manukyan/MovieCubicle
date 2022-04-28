import App from './App.svelte';

// Initialize Parse Server
Parse.initialize(PARSE_APP_ID, PARSE_SECRET_KEY);
Parse.serverURL = PARSE_URL;

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;