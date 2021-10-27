import Model from '../models/model';

const expensesModel = new Model('expenses');
const splitsModel = new Model('splits, expenses')
const groupMembersModel = new Model('group_members, members');

export const getSplits = async (req, res) => {
  try {
    const splitsData = await splitsModel.select(`expenses.expense_title, splits.split_value, splits.date_split, splits.split_id, splits.expense_id, splits.member_id`, `WHERE splits.member_id = ${req.body.member_id} AND splits.expense_id = expenses.expense_id AND expenses.group_id = ${req.body.group_id}`);
    res.json({ result: splitsData.rows });
  } catch (err) {
    res.json({ result: err.stack });
  }
};