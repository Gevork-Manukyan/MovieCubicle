<script>
import { push, link } from 'svelte-spa-router';
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
        user.set("username", username)
        user.set("password", password)
        user.set("email", email)

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
    let username = ""
    let email = ""
    let password = ""


</script>


<section id="form-wrapper">
    <div>
        <h2 id="signup-title">Sign Up</h2>
    </div>
    <Form on:submit={signup}>
        <FormGroup>
            <Label for="username">Username</Label>
            <Input id="username" placeholder="Enter a value" bind:value={username} />
        </FormGroup>

        <FormGroup>
            <Label for="email">Email</Label>
            <Input id="email" placeholder="Enter a value" bind:value={email} />
        </FormGroup>
        
        <FormGroup>
            <Label for="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter a value" bind:value={password} />
        </FormGroup>

        <div id="footer">
            <div id="toLogin">
                <a href="/login" use:link>Already have an account?</a>
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
        background-color: white;

        width: 500px;
        padding: 15px;

        border: solid black;
        border-radius: 10px;
    }

    #signup-title {
        padding-bottom: 20px;
        padding-top: 5px;
    }

    #footer {
        display: flex;
        justify-content: end;
        align-items: center;
    }

    #toLogin {
        display: inline-block;
        margin-right: 20px;
    }

    #button-wrapper {
        display: inline-block;
        text-align: end;
    }
</style>
