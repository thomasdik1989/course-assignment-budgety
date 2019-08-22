import { watchObject } from '../reactive';

const DELETE_EVENT = 'entryDeleted';
const ENTRIES_UPDATED_EVENT = 'entriesUpdated';
const INCOME = 'inc';
const EXPENSE = 'exp';

let entries = [];

const state = {
  entries: entries,
};

function getState() {
  return state;
}

function emitUpdateEvent() {
  document.dispatchEvent(
    new CustomEvent(ENTRIES_UPDATED_EVENT, {
      bubbles: true,
      detail: state
    })
  );
}

const store = watchObject(state, emitUpdateEvent);

export {
  store,
  getState,
  DELETE_EVENT,
  ENTRIES_UPDATED_EVENT,
  INCOME,
  EXPENSE,
}
