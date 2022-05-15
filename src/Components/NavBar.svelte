<script>
import { onMount } from "svelte";
import { link, push } from "svelte-spa-router";
import { Button } from "sveltestrap";
import authenticationStore from "../Stores/AuthenticationStore";

    // Show mobile icon and display menu
    let showMobileMenu = false;

    let inputvalue="";
  
    // List of navigation items
    const navItems = [
      { label: "Home", href: "/" },
      { label: "Trivia", href: "/trivia" },
    ];
  
    // Mobile menu click event handler
    const handleMobileIconClick = () => (showMobileMenu = !showMobileMenu);
  
    // Media match query handler
    const mediaQueryHandler = e => {
      // Reset mobile state
      if (!e.matches) {
        showMobileMenu = false;
      }
    };
  
    // Attach media query listener on mount hook
    onMount(() => {
      const mediaListener = window.matchMedia("(max-width: 767px)");
  
      mediaListener.addListener(mediaQueryHandler);
    });

    const signout = () => {
      Parse.User.logOut()
      authenticationStore.set({
        user: undefined
      })
      push("/login")
    }
  
    function submitSearch(){
      push("/search/" + inputvalue)
    }
  </script>
  
  <nav>
    <div class="inner">
      <div on:click={handleMobileIconClick} class={`mobile-icon${showMobileMenu ? ' active' : ''}`}>
        <div class="middle-line"></div>
      </div>
      <ul class={`navbar-list${showMobileMenu ? ' mobile' : ''}`}>
        {#each navItems as item}
          <li on:click={() => push(item.href)}>
            <a href={item.href} use:link>{item.label}</a>
          </li>
        {/each}

        <li class='noHover'>
          <form on:submit|preventDefault={submitSearch} class="search">
            <label for="search_movie"></label>
            <input
            bind:value={inputvalue}
                name="search_movie"
                type="text"
                id="search_movie"
                size="15"
            />
            <button type="submit" id="searchbutt">Search</button>
          </form>
        </li>
      </ul>
     
      <div id="signoutBtn">
        <Button on:click={signout}>Sign Out</Button>
      </div>
    </div>
  </nav>
  
  <style>
    nav {
      background-color: rgba(0, 0, 0, 0.8);
      font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
      height: 45px;
      user-select: none;
    }
  
    .inner {
      max-width: 980px;
      padding-left: 20px;
      padding-right: 20px;
      margin: auto;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      height: 100%;
    }
  
    .mobile-icon {
      width: 25px;
      height: 14px;
      position: relative;
      cursor: pointer;
    }
  
    .mobile-icon:after,
    .mobile-icon:before,
    .middle-line {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #fff;
      transition: all 0.4s;
      transform-origin: center;
    }
  
    .mobile-icon:before,
    .middle-line {
      top: 0;
    }
  
    .mobile-icon:after,
    .middle-line {
      bottom: 0;
    }
  
    .mobile-icon:before {
      width: 66%;
    }
   
    .mobile-icon:after {
      width: 33%;
    }
  
    .middle-line {
      margin: auto;
    }
  
    .mobile-icon:hover:before,
    .mobile-icon:hover:after,
    .mobile-icon.active:before,
    .mobile-icon.active:after,
    .mobile-icon.active .middle-line {
      width: 100%;
    }
  
    .mobile-icon.active:before,
    .mobile-icon.active:after {
      top: 50%;
      transform: rotate(-45deg);
    }
  
    .mobile-icon.active .middle-line {
      transform: rotate(45deg);
    }
  
    .navbar-list {
      display: none;
      width: 100%;
      justify-content: space-between;
      margin: 0;
      padding: 0 40px;
     
    }
  
    .navbar-list.mobile {
      background-color: rgba(0, 0, 0, 0.8);
      position: fixed;
      display: block;
      height: calc(100% - 45px);
      bottom: 0;
      left: 0;
    }
  
    .navbar-list li {
      float:left;
      list-style-type: none;
      position: relative;
      width: 100%;
      text-align: center;
      cursor: pointer;
    }

    .navbar-list li:hover {
        background-color: #4c4c51;
    }
    .noHover{
      /*pointer-events: click;*/
      background-color: unset !important;
      color: unset !important;
    }
  
    .navbar-list li:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #424245;
    }
  
    .navbar-list a {
      color: #fff;
      text-decoration: none;
      display: flex;
      height: 45px;
      align-items: center;
      padding: 0 10px;
      font-size: 13px;
    }

    #signoutBtn {
      position: absolute;
      right: 0;
      margin-right: 30px;
    }
    #searchbutt {
     /* margin-top: 1px;*/
      position: right;
      right: 0;
      margin-right: 30px;
      color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
    }
    #search_movie{
      margin-left: 0px;
    }
  
    @media only screen and (min-width: 767px) {
      .mobile-icon {
        display: none;
      }
  
      .navbar-list {
        display: flex;
        padding: 0;
        float:left;
      }
  
      .navbar-list a {
        display: inline-flex;
        
      }
    }
    
  </style>