<script>
  export let message = '';
</script>

{#if message}
  <div id="correct">
    <span>Correct Answer</span>
  </div>
{:else}
  <div id="wrong">
    <span>Incorrect Answer</span>
  </div>
{/if}

<style>
  div {
    height: 48px;
    width: 344px;
    padding: 0 16px;

    line-height: 45px;
    background-color: #4e5656;
    border-radius: 5px;

    box-shadow: 0 0 5px #4e5656;
  }

  span {
    font-size: 16px;
    color: white;
  }

  #correct {
    background-color: green;
    box-shadow: 0 0 5px green;
  }

  #wrong {
    background-color: red; 
    box-shadow: 0 0 5px red;
  }

</style>