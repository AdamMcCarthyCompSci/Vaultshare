import Model from '../models/model';

const expensesModel = new Model('expenses');

export const expensesPage = async (req, res) => {
    const user = req.user;
    console.log("IDDD",req.body.group_id);
  try {
    const data = await expensesModel.select(`*`, `WHERE expenses.group_id = ${req.body.group_id}`);
    console.log("expenses data:",data.rows)
    res.json({ result: data.rows });
  } catch (err) {
    res.json({ result: err.stack });
  }
};