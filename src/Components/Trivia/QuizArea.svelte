<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { Button } from "sveltestrap";
  import Snackbar from './Snackbar.svelte';

  import { fadeIn, fadeOut } from './transitions.js';
  import { htmlDecode, shuffle } from './utils.js';

  const dispatch = createEventDispatcher();
  let data = [];

  let questionNo = 0;
  let buttonBarVisibility = true;
  let snackbarVisibility = false;
  let snackbarMessage = false;
  let answeredQuestions = 0;
  let resultsScreen = false;

  $: representation = [];
  $: score = 0;
  $: finalMessage = '';

  function fetchData() {
    fetch('https://opentdb.com/api.php?amount=10&category=11&type=multiple')
      .then(resp => resp.json())
      .then(res => {
        data = res.results;

        representation = data.reduce((acc, curr) => {
          acc.push({
            question: htmlDecode(curr.question),
            answerChoices: shuffle(
              [...curr.incorrect_answers, curr.correct_answer].map(ans =>
                htmlDecode(ans)
              )
            ),
            answer: htmlDecode(curr.correct_answer),
            category: htmlDecode(curr.category),
            difficulty: curr.difficulty,
            answerChoice: '',
            correct: false,
            answered: false
          });
          return acc;
        }, []);
      })
      .catch(e => console.error(e));
  }

  onMount(fetchData);

  function handleClick(change) {
    if (snackbarVisibility) snackbarVisibility = !snackbarVisibility;

    if (change === 'f') questionNo += 1;
    else questionNo -= 1;
  }

  function handleAnswerChoice(e = {}) {
    if (!representation[questionNo].answered) {
      answeredQuestions += 1;
      const representationCopy = { ...representation[questionNo] };
      representationCopy.answered = true;
      if (e.target.innerText === representation[questionNo].answer) {
        representationCopy.correct = true;
        representationCopy.answerChoice = representation[questionNo].answer;
        representation[questionNo] = representationCopy;
        score += 1;
        snackbarMessage = true;
        dispatch('score', { score: score });
      } else {
        representationCopy.answerChoice = e.target.innerText;
        representation[questionNo] = representationCopy;
        snackbarMessage = false;
      }

      if (questionNo === 9) {
        buttonBarVisibility = false;
        resultsScreen = true;

        dispatch('resultsScreen', { showScore: false });

        if (score < 5) {
          finalMessage = 'Wow... that was terrible? 😵';
        } else if (score === 5) {
          finalMessage = "An average Joe I see you are. 🤓";
        } else {
          finalMessage = "You're on fire!!! 🔥";
        }
      }

      if (!snackbarVisibility) snackbarVisibility = true;
    }
  }
</script>

<div id="main">

  {#if representation.length > 0 && !resultsScreen}
    <span id="heading">
      Question {questionNo + 1}
      <i id="category">(Category - {representation[questionNo].category})</i>
    </span>
    <span>{representation[questionNo].question}</span>
    <div id="difficulty">{representation[questionNo].difficulty}</div>

    {#if representation[questionNo].answerChoices}
      {#each representation[questionNo].answerChoices as choice}
        {#if representation[questionNo].answered && representation[questionNo].correct}
          {#if choice === representation[questionNo].answerChoice}
            <div id="choice" class="green">
              <i>{choice}</i>
            </div>
          {:else}
            <div id="choice">
              <i>{choice}</i>
            </div>
          {/if}
        {:else if representation[questionNo].answered && !representation[questionNo].correct}
          {#if choice === representation[questionNo].answer}
            <div id="choice" class="green">
              <i>{choice}</i>
            </div>
          {:else}
            <div id="choice" class="red">
              <i>{choice}</i>
            </div>
          {/if}
        {:else}
          <div id="choice" on:click={e => handleAnswerChoice(e)}>
            <i>{choice}</i>
          </div>
        {/if}
      {/each}
    {/if}

    {#if buttonBarVisibility}
      <div id="button-bar">
        {#if questionNo < 9}
          <div class="button">
            <Button on:click={() => handleClick('f')}>Next</Button>
          </div>
        {/if}
        {#if questionNo > 0}
          <div class="button">
            <Button on:click={() => handleClick('b')}>Previous</Button>
          </div>
        {/if}
      </div>
    {/if}

    {#if snackbarVisibility}
      <div id="snackbar" in:fadeIn out:fadeOut>
        <Snackbar message={snackbarMessage} />
      </div>
    {/if}
      {:else if answeredQuestions === 10}
      <p>All answered</p>
   
  {:else if resultsScreen}
    <div id="results">
      <p id="score">
        Final Score:
        <i>{score} / 10</i>
      </p>
      <p style="font-size: 24px">
        {@html finalMessage}
      </p>
      <p style="font-size: 24px">Refresh the page to play again</p>
    </div>
  {:else}
    <span id="fetchingQuestions">
      Fetching questions...
    </span>
  {/if}

</div>


<style>
  #main {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    height: calc(100vh - 40%);
    width: calc(100vw - 40%);
    padding: 15px;

    background-color: white;
    border-radius: 6px;
    box-shadow: 0 0 35px red;

    text-align: left;
  }

  span {
    display: block;
    margin-top: 20px;
  }

  .button {
    margin-top: 15px;
    margin-right: 8px;
    padding: 10px;
    float: right;

    color: white;
    /* background-color: #16302b; */
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }

  .button:hover {
    /* box-shadow: 0 0 5px #16302b; */
  }

  #heading {
    font-size: 24px;
    font-weight: bolder;
  }

  #difficulty {
    position: absolute;
    right: 16px;
    top: 16px;
    height: 25px;
    width: 80px;
    padding: 5px;

    background: #1b3b6f;
    color: white;
    text-align: center;
    border-radius: 16px;
    box-sizing: content-box;
  }

  #category {
    font-size: 12px;
    font-weight: normal;
  }

  #button-bar {
    position: absolute;
    bottom: 16px;
    right: 0;
  }

  #choice {
    margin-top: 16px;
    padding: 8px;

    border: 1px solid #4e5656;
    border-radius: 8px;
  }

  #choice:hover {
    cursor: pointer;
    background: #7ddf64;
    border: 1px solid #7ddf64;
    color: white;
  }

  .green {
    background: #7DDF64; 
    color: white; 
    border-color: white
  }

  .red {
    background: #DE3C4B;
    color: white; 
    border-color: white
  }

  #snackbar {
    position: absolute;
    left: 16px;
    bottom: 24px;
  }

  #results {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);

    text-align: center;
  }

  #score {
    font-size: 48px;
  }

  #fetchingQuestions {
    margin: 0;
    position: absolute; 
    left: 50%; 
    top: 50%; 
    
    transform: translateX(-50%) translateY(-50%); 
    font-weight: bolder; 
    font-size: 36px;
  }
</style>