<script>
import { push } from 'svelte-spa-router';
import { Button, Form, FormGroup, Input, Label } from 'sveltestrap';
import authenticationStore from "../../Stores/AuthenticationStore"


    /**BACKEND**/
    let user
    authenticationStore.subscribe((returnedData) => {
        user = returnedData.user
    })

    // If user logged in already => go to home page
    $: if (user !== undefined) {
        push("/")
    }

    async function login () {

        let parseUser = Parse.User.logIn(form.username, form.password).then((parseUser) => {
            console.log('User logged in successful with name: ' + parseUser.get("username") + ' and email: ' + parseUser.get("email"));

            // set stored user to logged in user
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
        password: ""
    }

    function updateForm (e) {
        const input = e.data
        const id = e.target.id

        // handle backspace
        if (input === null) {
            form[id] = form[id].substr(0, form[id].length - 1)
            return;
        }

        form[id] += input
    }

</script>


<section id="form-wrapper">
    <div>
        <h2 id="login-title">Login</h2>
    </div>
    <Form on:submit={login}>
        <FormGroup>
            <Label for="username">Username</Label>
            <Input id="username" placeholder="Enter a value" on:input={updateForm} value={form.username} />
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

    #login-title {
        padding-bottom: 20px;
        padding-top: 5px;
    }

    #button-wrapper {
        display: block;
        text-align: end;
    }
</style>
