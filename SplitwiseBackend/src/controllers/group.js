import Model from '../models/model';

const expensesModel = new Model('expenses');
const groupMembersModel = new Model('group_members, members')

export const groupPage = async (req, res) => {
    const user = req.user;
    console.log("IDDD",req.body.group_id);
  try {
    const expensesData = await expensesModel.select(`*`, `WHERE expenses.group_id = ${req.body.group_id}`);
    const groupMembersData = await groupMembersModel.select(`members.username, members.tag, members.member_id`, `WHERE group_members.group_id = ${req.body.group_id} AND members.member_id = group_members.member_id`);
    console.log("expenses data:",expensesData.rows, "group members data:", groupMembersData.rows)
    res.json({ result: [expensesData.rows, groupMembersData.rows] });
  } catch (err) {
    res.json({ result: err.stack });
  }
};