import Model from '../models/model';

const expenseModel = new Model('expenses');

export const addExpense = async (req, res) => {
  console.log(req.body);
    const { group, members, title, value, paying, splitting } = req.body
    const columns = 'member_id, group_id, expense_value, expense_title';
    const values = `'${paying}', '${group.group_id}', '${value}', '${title}'`,;
    try {
      const data = await expenseModel.insertWithReturn(columns, values);
      res.status(200).json({ messages: data.rows });
    } catch (err) {
      res.status(200).json({ messages: err.stack });
    }
  };