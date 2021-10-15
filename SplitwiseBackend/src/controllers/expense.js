import Model from '../models/model';

const expenseModel = new Model('expenses');

export const addExpense = async (req, res) => {
  console.log(req.body);
    const { group, members, title, value, paying, splitting } = req.body
    
    const trimArray = (array) => {
        return array.map(element => [element.split('#')[0].split(' ')[0], element.split('#')[1]])
    }
    const trimmedPaying = [paying.split('#')[0].split(' ')[0], paying.split('#')[1]];
    const trimmedSplitting = trimArray(splitting);
    console.log(trimmedPaying)
    const payingID = members.find(member => (member.username === trimmedPaying[0] && member.tag.toString() === trimmedPaying[1]))
    const splittingID = trimmedSplitting.map(split => members.find(member => (member.username === split[0] && member.tag.toString() === split[1])))
    const columns = 'member_id, group_id, expense_value, expense_title';
    const values = `'${payingID.member_id}', '${group.group_id}', '${value}', '${title}'`;
    console.log(values)
    try {
      const data = await expenseModel.insertWithReturn(columns, values);
      res.json({ messages: data.rows });
    } catch (err) {
      res.json({ messages: err.stack });
    }
  };