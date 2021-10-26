import Model from '../models/model';

const expensesModel = new Model('expenses');
const splitsModel = new Model('splits, expenses')
const groupMembersModel = new Model('group_members, members');

export const groupPage = async (req, res) => {
    const user = req.user;
    console.log(req.body.member_id, req.body.group_id)
  try {
    const expensesData = await expensesModel.select(`*`, `WHERE expenses.group_id = ${req.body.group_id}`);
    const splitsData = await splitsModel.select(`expenses.expense_title, splits.split_value, splits.date_split, splits.split_id, splits.expense_id, splits.member_id`, `WHERE splits.member_id = ${req.body.member_id} AND splits.expense_id = expenses.expense_id AND expenses.group_id = ${req.body.group_id}`)
    const groupMembersData = await groupMembersModel.select(`members.username, members.tag, members.member_id`, `WHERE group_members.group_id = ${req.body.group_id} AND members.member_id = group_members.member_id`);
    console.log("splts data:", splitsData.rows)
    res.json({ result: [expensesData.rows, groupMembersData.rows, splitsData.rows] });
  } catch (err) {
    res.json({ result: err.stack });
  }
};