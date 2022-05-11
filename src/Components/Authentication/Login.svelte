<script>
import { push, link } from 'svelte-spa-router';
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

        let parseUser = Parse.User.logIn(username, password).then((parseUser) => {
            console.log('User logged in successful with name: ' + parseUser.get("username") + ' and email: ' + parseUser.get("email"));

            // set stored user to logged in user
            authenticationStore.set({
                user: parseUser
            })

            push("/")

        }).catch((error) => {
            console.log("Error: " + error.code + " " + error.message);
        })
        
    }


    /**FORM**/
    let username = ""
    let password = ""

</script>


<section id="form-wrapper">
    <div>
        <h2 id="login-title">Login</h2>
    </div>
    <Form on:submit={login}>
        <FormGroup>
            <Label for="username">Username</Label>
            <Input id="username" placeholder="Enter a value" bind:value={username} />
        </FormGroup>
        
        <FormGroup>
            <Label for="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter a value" bind:value={password} />
        </FormGroup>

        <div id="footer">
            <div id="toSignup">
                <a href="/signup" use:link>Need an account?</a>
            </div>
            <div id="button-wrapper">
                <Button type="submit">Submit</Button>
            </div>
        </div>
    </Form>
</section>


<style>
    #form-wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -70%);
        /* color: white; */
        background-color: white;

        width: 500px;
        padding: 15px;

        border: solid black;
        border-radius: 10px;
    }

    #footer {
        display: flex;
        justify-content: end;
        align-items: center;
    }

    #login-title {
        padding-bottom: 20px;
        padding-top: 5px;
        /* color: white; */
    }

    #toSignup {
        display: inline-block;
        margin-right: 20px;
    }

    #button-wrapper {
        display: inline-block;
        text-align: end;
    }
</style>
