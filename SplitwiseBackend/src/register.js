import Model from './models/model';
const bcrypt = require('bcrypt');
const membersModel = new Model('members');

// export const membersPage = async (req, res) => {
//   try {
//     const data = membersModel.select('email, username, password');
//     res.status(200).json({ messages: data.rows });
//   } catch (err) {
//     res.status(200).json({ messages: err.stack });
//   }
// };

export const addMember = async (req, res) => {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const columns = 'email, username, tag, password';
    try {
      const emailCount = await membersModel.select(`COUNT(*)`, `WHERE "email" = '${email}'`);
      if (emailCount.rows[0].count > 0) {
        res.status(200).json({ result: "Email already registered" });
      }
      else {
        const tag = await membersModel.select(`COUNT(*)`, `WHERE "username" = '${username}'`);
        // console.log(emailCount.rows, tag.rows);
        const values = `'${email}', '${username}', '${tag.rows[0].count}', '${hashedPassword}'`;
        const data = await membersModel.insertWithReturn(columns, values);
        console.log(data.rows);
        res.json({ result: data.rows });
      }
    } catch (err) {
      res.status(200).json({ result: err.stack });
    }
  };