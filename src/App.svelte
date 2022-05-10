<script>
	import NavBar from "./NavBar.svelte";
	import Menu from "./menu.svelte";
	import { getAllDailyTrending, getCustomTrending } from "./services/Api.svelte"
	import { Badge, Form, FormGroup, Input, Label } from 'sveltestrap';

	// TODO: Remove below test code
	async function createParseUser() {
		// Creates a new Parse "User" object, which is created by default in your Parse app
		let user = new Parse.User();
		// Set the input values to the new "User" object
		user.set("username", "steve");
		user.set("email", "Test1@test.com");
		user.set("password", "123456");
		try {
			// Call the save method, which returns the saved object if successful
			user = await user.save();
			if (user !== null) {
			// Notify the success by getting the attributes from the "User" object, by using the get method (the id attribute needs to be accessed directly, though)
			alert(
				`New object created with success! ObjectId: ${
				user.id
				}, ${user.get("username")}`
			);
			}
		} catch (error) {
			alert(`Error: ${error.message}`);
		}
	}
	// createParseUser()


	
</script>


<header>
	<!-- <h1 id="title">Movie Gang</h1> -->
</header>
<main>
	<Form>
		<FormGroup floating label="Floating Label">
		  <Input placeholder="Enter a value" />
		</FormGroup>
	  
		<FormGroup floating>
		  <Input placeholder="Enter a value" />
		  <div slot="label">
			Floating Label Slot <Badge>3</Badge>
		  </div>
		</FormGroup>
	  
	  </Form>
</main>
<footer>

</footer>


<style>
	/* #title {
		margin: 0;
		padding: 17px 0px 17px 20px;
		color: #fff;
	} */
</style>
