import Model from '../models/model';

const groupsModel = new Model('groups, group_members');

export const groupsPage = async (req, res) => {
    const user = req.user;
  try {
    const groupsData = await groupsModel.select(`groups.group_name, groups.group_id`, `WHERE group_members.group_id = groups.group_id AND group_members.member_id = ${user.member_id}`);
    // console.log(user.member_id)
    // console.log("data:",data.rows)
    res.json({ result: [req.user, groupsData.rows] });
  } catch (err) {
    res.json({ result: err.stack });
  }
};