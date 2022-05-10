<script>
import { push } from 'svelte-spa-router';
import { Button, Form, FormGroup, Input, Label } from 'sveltestrap';
import authenticationStore from "../../Stores/AuthenticationStore"


    /**BACKEND**/
    let user;
    authenticationStore.subscribe((returnData) => {
        user = returnData.user
    })


    // If user logged in already => go to home page
    $: if (user !== undefined) {
        push("/")
    }

    async function signup() {
        
        let user = new Parse.User()
        user.set("username", form.username)
        user.set("password", form.password)
        user.set("email", form.email)

        user.signUp().then((parseUser) => {
            console.log('User created successful with name: ' + parseUser.get("username") + ' and email: ' + parseUser.get("email"));

            // set stored user to signup user
            authenticationStore.set({
                user: parseUser
            })

        }).catch((error) => {
            console.log("Error: " + error.code + " " + error.message);
        })
    }


    /**FORM**/
    const form = {
        username: "",
        email: "",
        password: ""
    }

    function updateForm (e) {
        const input = e.data
        const id = e.target.id

        // Handle backspace
        if (input === null) {
            form[id] = form[id].substr(0, form[id].length - 1)
            return;
        }

        form[id] += input
    }

</script>


<section id="form-wrapper">
    <div>
        <h2 id="signup-title">Sign Up</h2>
    </div>
    <Form on:submit={signup}>
        <FormGroup>
            <Label for="username">Username</Label>
            <Input id="username" placeholder="Enter a value" on:input={updateForm} value={form.username} />
        </FormGroup>

        <FormGroup>
            <Label for="email">Email</Label>
            <Input id="email" placeholder="Enter a value" on:input={updateForm} value={form.email} />
        </FormGroup>
        
        <FormGroup>
            <Label for="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter a value" on:input={updateForm} value={form.password} />
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
