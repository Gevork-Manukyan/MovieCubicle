import App from './App.svelte';
import 'bootstrap/dist/css/bootstrap.min.css';

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