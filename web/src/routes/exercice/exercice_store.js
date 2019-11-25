import { writable, get } from "svelte/store";

function createExerciceStore() {
  const { subscribe, update } = writable({
    data: {},
    results: {},
    blanks: {},
    answers: {}
  });

  return {
    subscribe,
    load: data => {

      return update(state => {
        return {
          ...state,
          data: data,
          currentQuestion: data.questions[0],
          currentQuestionIdx: 0
        };
      });
    },
    get: () => {
      return get(store);
    },
    getCurrentQuestion: () => {
      const myStore = get(store);
      return myStore.data.questions[myStore.currentQuestion.idx];
    },
    goToQuestion: idx => {
      update(n => {
        if (idx > n.data.questions.length - 1) return;
        return {
          ...n,
          currentQuestion: n.data.questions[idx],
          currentQuestionIdx: idx
        };
      });
    },
    doAction: (action, data) => {
      const myStore = get(store);
      reducer(myStore, update, action, data);
    }
  };
}
const store = createExerciceStore();
export default store;

const reducer = (store, update, action, data) => {
  switch (action) {
    case "update": {
      update(n => {
        return { ...n, ...data };
      });
      break;
    }

    case "check": {
      const existingDetails = store.results[data._key]
        ? store.results[data._key].detail
        : {};

      update(n => {
        return {
          ...n,
          results: {
            ...n.results,
            [data._key]: {
              isCorrect: data.isCorrect,
              detail: {
                ...existingDetails,
                ...data.answer
              }
            }
          }
        };
      });
      break;
    }
    default:
      return store;
  }
};
