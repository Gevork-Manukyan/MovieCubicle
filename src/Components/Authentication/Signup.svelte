<script>
    import { Button, Form, FormGroup, Input, Label } from 'sveltestrap';

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
    function func () {
        console.log("SUBMIT")
    }

</script>


<section id="form-wrapper">
    <div>
        <h2 id="signup-title">Sign Up</h2>
    </div>
    <Form on:submit={func}>
        <FormGroup>
            <Label for="userNameInput">Username</Label>
            <Input id="userNameInput" placeholder="Enter a value" />
        </FormGroup>
        
        <FormGroup>
            <Label for="passwordInput">Password</Label>
            <Input id="passwordInput" placeholder="Enter a value" />
        </FormGroup>
        <div id="button-wrapper">
            <Button type="submit">Submit</Button>
        </div>
    </Form>
</section>


<style>
	#form-wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -70%);

        width: 500px;
        padding: 15px;

        border: solid black;
        border-radius: 10px;
    }

    #signup-title {
        padding-bottom: 20px;
        padding-top: 5px;
    }

    #button-wrapper {
        display: block;
        text-align: end;
    }
</style>
