<script>
  import exerciceStore from "../../routes/exercice/exercice/exercice_store.js";

  import PortableText from "../portableText/PortableText.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let data = {};

  const registerBlank = e => {
    const value = e.detail.text ? e.detail.text.trim() : null;
    const actualBlanks =
      $exerciceStore.blanks[$exerciceStore.currentQuestion._key];

    exerciceStore.doAction("update", {
      blanks: {
        ...$exerciceStore.blanks,
        [$exerciceStore.currentQuestion._key]: {
          ...actualBlanks,
          [e.detail._key]: value
        }
      }
    });
  };

  const fillInBlank = e => {
    console.log("fill in blank", e.detail);
    const value = e.detail.text ? e.detail.text.trim() : null;

    const answers = {
      ...$exerciceStore.answers,
      [$exerciceStore.currentQuestion._key]: {
        ...$exerciceStore.answers[$exerciceStore.currentQuestion._key],
        [e.detail._key]: { texte: value }
      }
    };

    exerciceStore.doAction("update", { answers });
  };

  const check = () => {
    const questionToCheck = $exerciceStore.currentQuestion._key;
    let nbIsCorrect = 0;

    let newAnswer =
      $exerciceStore.answers && $exerciceStore.answers[questionToCheck]
        ? { ...$exerciceStore.answers[questionToCheck] }
        : {};
    Object.entries($exerciceStore.blanks[questionToCheck]).map(blank => {
      const [blankId, blankText] = blank;
      const solutions = blankText.split("|");
      let isCorrect = false;
      solutions.forEach(solution => {
        if (
          $exerciceStore.answers[questionToCheck] &&
          $exerciceStore.answers[questionToCheck][blankId] &&
          solution.toLowerCase().trim() ===
            $exerciceStore.answers[questionToCheck][blankId].texte
              .toLowerCase()
              .trim()
        ) {
          isCorrect = true;
          nbIsCorrect = nbIsCorrect + 1;
        }
      });

      newAnswer = {
        ...newAnswer,
        [blankId]: {
          isCorrect: isCorrect
        }
      };
    });
    const questionIsCorrect = $exerciceStore.blanks
      ? nbIsCorrect ===
        Object.keys($exerciceStore.blanks[questionToCheck]).length
      : false;

    exerciceStore.doAction("check", {
      _key: data._key,
      answer: newAnswer,
      isCorrect: questionIsCorrect
    });
  };
</script>

<main id="main">
  <form>
    <PortableText
      content={data.body}
      on:change={fillInBlank}
      on:mount={registerBlank} />
    {#if !$exerciceStore.results || !$exerciceStore.results.hasOwnProperty($exerciceStore.currentQuestion._key)}
      <button
        class="primary-button mt-5"
        on:click|preventDefault
        type="submit"
        on:click={check}>
        Vérifier
      </button>
    {/if}

  </form>
</main>
