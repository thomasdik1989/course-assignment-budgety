import { INCOME, EXPENSE } from './ui/variables';

const isIncome = entry => {
  return entry.type === INCOME
};

const isExpense = entry => {
  return entry.type === EXPENSE
};

const entrySum = (total, entry) => total + entry.value;

export {
  isIncome,
  isExpense,
  entrySum,
}
