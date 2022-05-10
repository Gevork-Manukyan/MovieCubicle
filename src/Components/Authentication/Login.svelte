<script>
    import { Button, Form, FormGroup, Input, Label } from 'sveltestrap';

    let user;
    async function login () {

        user = Parse.User.logIn("Billy", "password").then((user) => {
            console.log('User logged in successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
        }).catch((error) => {
            console.log("Error: " + error.code + " " + error.message);
        })
        
    }

    console.log("Current User: ", Parse.User.current())
    console.log("Test: " + Parse.User.current().get("username"))
</script>


<section id="form-wrapper">
    <div>
        <h2 id="login-title">Login</h2>
    </div>
    <Form on:submit={login}>
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

    #login-title {
        padding-bottom: 20px;
        padding-top: 5px;
    }

    #button-wrapper {
        display: block;
        text-align: end;
    }
</style>
