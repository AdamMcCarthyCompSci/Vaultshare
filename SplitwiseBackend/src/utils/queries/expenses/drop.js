import { dropExpensesTable } from '../../queryFunctions';

(async () => {
  await dropExpensesTable();
})();