<script>
    import { Button, Form, FormGroup, Input, Label } from 'sveltestrap';

    async function signup() {
        
        let user = new Parse.User()
        user.set("username", "Billy")
        user.set("password", "password")
        user.set("email", "Billy@gmail.com")

        user.signUp().then((user) => {
            console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
        }).catch((error) => {
            console.log("Error: " + error.code + " " + error.message);
        })
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
    <Form on:submit={signup}>
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
