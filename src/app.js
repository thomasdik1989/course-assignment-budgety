import { fromEvent } from 'rxjs';
import { store, getState, ENTRIES_UPDATED_EVENT, DELETE_EVENT } from './ui/variables';
import { SalaryComponent } from './ui/entry';
import { isExpense, isIncome, entrySum } from './logic';

const getElement = element => document.getElementsByClassName(element)[0];

customElements.define('salary-component', SalaryComponent);

// Header.
const budgetTotalValue = getElement('budget__value');
const budgetIncomeValue = getElement('budget__income--value');
const budgetExpenseValue = getElement('budget__expenses--value');
const budgetExpensePercentage = getElement('budget__expenses--percentage');

// Form.
const type = getElement('add__type');
const description = getElement('add__description');
const value = getElement('add__value');
const addEntry = getElement('add__btn');
const incomeList = getElement('income__list');
const expenseList = getElement('expenses__list');

function resetForm() {
  value.value = '';
  description.value = '';
}

function formIsEmpty() {
  return value.value === '' && description.value === '';
}

function getFormEntryItem() {
  return {
    type: type.options[type.selectedIndex].value,
    description: description.value,
    value: Number.parseInt(value.value),
  }
}

function addFormEntry() {
  if (formIsEmpty()) {
    return;
  }
  const entry = getFormEntryItem();
  entry.index = getState().entries.length;
  resetForm();

  store.entries.push(entry);
  const salaryComponent = new SalaryComponent(entry);
  isIncome(entry)
    ? incomeList.appendChild(salaryComponent)
    : expenseList.appendChild(salaryComponent);
}

function updateUI() {
  const state = getState();
  const incomeEntries = state.entries.filter(isIncome);
  const expenseEntries = state.entries.filter(isExpense);
  const totalIncome = incomeEntries.reduce(entrySum, 0);
  const totalExpense = expenseEntries.reduce(entrySum, 0);

  budgetIncomeValue.innerText = totalIncome;
  budgetExpenseValue.innerText = totalExpense;
  budgetTotalValue.innerText = totalIncome - totalExpense;
  budgetExpensePercentage.innerText = totalIncome === 0 ? '-' : Math.round(totalExpense / (totalIncome / 100)) + '%';
}

fromEvent(addEntry, 'click').subscribe(addFormEntry);

fromEvent(document, DELETE_EVENT).subscribe(() => {
  store.entries.splice(event.detail, 1);
  updateUI();
});

fromEvent(document, ENTRIES_UPDATED_EVENT).subscribe(updateUI);

export {
  getFormEntryItem,
  addEntry
}
