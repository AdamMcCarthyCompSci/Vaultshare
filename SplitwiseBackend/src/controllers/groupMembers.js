import Model from '../models/model';

const groupMembersModel = new Model('group_members, members');

export const getGroupMembers = async (req, res) => {
  try {
    const groupMembersData = await groupMembersModel.select(`members.username, members.tag, members.member_id`, `WHERE group_members.group_id = ${req.body.group_id} AND members.member_id = group_members.member_id`);
    res.json({ result: groupMembersData.rows });
  } catch (err) {
    res.json({ result: err.stack });
  }
};