import Model from '../models/model';

const expensesModel = new Model('expenses');
const splitsModel = new Model('splits, expenses, members');
const groupMembersModel = new Model('group_members, members');

export const getExpenses = async (req, res) => {
  try {
    const expensesData = await expensesModel.select(
      `*`,
      `WHERE expenses.group_id = ${req.body.group_id}`
    );
    const splitsData = await splitsModel.select(
      `expenses.expense_title, splits.split_value, splits.date_split, splits.split_id, splits.expense_id, splits.member_id, members.username, members.tag`,
      `WHERE splits.expense_id = expenses.expense_id AND expenses.group_id = ${req.body.group_id} AND splits.member_id = members.member_id`
    );
    const groupMembersData = await groupMembersModel.select(
      `members.username, members.tag, members.member_id`,
      `WHERE group_members.group_id = ${req.body.group_id} AND members.member_id = group_members.member_id`
    );

    // [member_id: {owes: [{split_value: X, member_id: Y}...], due: [expense_value...], balance: Z}...]
    res.json({
      result: [expensesData.rows, groupMembersData.rows, splitsData.rows],
    });
  } catch (err) {
    res.json({ result: err.stack });
  }
};

// export const getExpenseSplits = async (req, res) => {
//   try {
//     const splitsData = await splitsModel.select(`expenses.expense_title, splits.split_value, splits.date_split, splits.split_id, splits.expense_id, splits.member_id`, `WHERE splits.expense_id = ${req.body.expense_id}`)
//     res.json({ result: splitsData.rows });
//   } catch (err) {
//     res.json({ result: err.stack });
//   }
// };
