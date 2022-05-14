<script>
  import QuizArea from './QuizArea.svelte';
  import NavBar from "../NavBar.svelte"

  let playerScore = 0;
  let visible = true;
</script>



<div id="navbar">
  <NavBar />
</div>

<section>

  {#if visible}
    <p class="score">
      Score:
      <i>{playerScore} / 10</i>
    </p>
  {/if}

  <QuizArea
    on:score={e => {
      playerScore = e.detail.score;
    }}
    on:resultsScreen={e => {
      visible = e.detail.showScore;
    }} />

</section>



<style>
  section {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  .score {
    color: white; 
    font-size: 24px
  }

</style>