import Model from '../models/model';

const expenseModel = new Model('expenses');
const splitsModel = new Model('splits')

export const addExpense = async (req, res, next) => {
    const { group, members, title, value, paying, splitting } = req.body
    
    const trimArray = (array) => {
        return array.map(element => [element.split(' #')[0], element.split('#')[1]])
    }
    const trimmedPaying = [paying.split(' #')[0], paying.split('#')[1]];
    const trimmedSplitting = trimArray(splitting);
    const payingID = members.find(member => (member.username === trimmedPaying[0] && member.tag.toString() === trimmedPaying[1]))
    const payingColumns = 'member_id, group_id, expense_value, expense_title';
    const payingValues = `'${payingID.member_id}', '${group.group_id}', '${value}', '${title}'`;
    
    try {
      const data = await expenseModel.insertWithSpecificReturn(payingColumns, payingValues, 'expense_id');
      req.body = {expense_id: data.rows[0].expense_id, paying_id: payingID.member_id, body: req.body, splitting: trimmedSplitting}
      next();
    } catch (err) {
      res.json({ messages: err.stack });
    }
  };

export const addSplits = async (req, res) => {
    const { expense_id, body, splitting, paying_id } = req.body;
    const splittingIDs = splitting.map(split => body.members.find(member => (member.username === split[0] && member.tag.toString() === split[1])))
    const splittingColumns = 'expense_id, member_id, split_value';
    const splittingValuesArray = splittingIDs.map(member => {
      if (member.member_id === paying_id) {
        return `(${expense_id}, ${member.member_id}, ${-(body.value - (body.value/body.splitting.length))})`
      }
      else {
        return `(${expense_id}, ${member.member_id}, ${body.value/body.splitting.length})`
      }
    })
    if (!splittingIDs.find(member => (member.member_id === paying_id))) {
      splittingValuesArray.push(`(${expense_id}, ${paying_id}, ${-(body.value) * body.splitting.length})`);
    }
    const splittingValues = splittingValuesArray.join(', ')

    try {
        const data = await splitsModel.multipleInsertWithReturn(splittingColumns, splittingValues);
        res.json({ result: data })
      } catch (err) {
        res.json({ messages: err.stack });
      }
};