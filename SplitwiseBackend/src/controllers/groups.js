import Model from '../models/model';

const groupsModel = new Model('groups');
const groupsMembersModel = new Model('groups, members, group_members')

export const groupsPage = async (req, res) => {
    const user = req.user;
  try {
    const data = await groupsMembersModel.select(`*`, `WHERE group_members.member_id = ${user.member_id} AND group_members.group_id = groups.group_id`);
    res.json({ result: data.rows });
  } catch (err) {
    res.json({ result: err.stack });
  }
};