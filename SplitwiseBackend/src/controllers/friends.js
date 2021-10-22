import Model from '../models/model';

const membersModel = new Model('members');
const friendsModel = new Model('friends');
const friendsMembersModel = new Model('members, friends');

export const checkMember = async (req, res, next) => {
    const { username, tag } = req.body
    const user = req.user;
    try {
        const memberData = await membersModel.select(`*`, `WHERE "username" = '${username}' and "tag" = '${tag}'`);
        if (memberData.rows.length === 0) {
          res.json({result: "No user found with that username and tag"})
        }
        else if (memberData.rows[0].member_id === user.member_id) {
          res.json({result: "You can't add yourself as a friend"})
        }
        else {
          req.body = {username: username, tag: tag, memberData: memberData.rows[0], user: user}
          next();
        }
    } catch (err) {
        res.json({ result: err.stack });
    }
  };

export const addFriend = async (req, res) => {
    const { username, tag, memberData, user } = req.body;
    const columns = 'inviter_id, invitee_id, accepted';
    const values = `'${user.member_id}', '${memberData.member_id}', '${false}'`;
    try {
        const selectFriendData = await friendsModel.select(`*`, `WHERE ("inviter_id" = '${user.member_id}' OR "inviter_id" = '${memberData.member_id}') AND ("invitee_id" = '${user.member_id}' OR "invitee_id" = '${memberData.member_id}')`);
        if (selectFriendData.rows.length === 0) {
          const insertFriendData = await friendsModel.insertWithReturn(columns, values);
          res.json({ result: insertFriendData })
        }
        else if (selectFriendData.rows[0].accepted == true) {
          res.json({ result: "You are already friends with this user" })
        }
        else {
          res.json({ result: "A friend request already exists between these two users" })
        }
      } catch (err) {
        res.json({ result: err.stack });
      }
};

export const getFriends = async (req, res) => {
  const user = req.user;
  try {
    const friendsData = await friendsMembersModel.select(`members.member_id, members.username, members.tag, friends.accepted`, `WHERE (friends.inviter_id = ${user.member_id} OR friends.invitee_id = ${user.member_id}) AND (members.member_id = friends.inviter_id OR members.member_id = friends.invitee_id) AND (members.member_id != ${user.member_id}) AND (friends.accepted = true)`);
    const requestsData = await friendsMembersModel.select(`members.member_id, members.username, members.tag, friends.accepted`, `WHERE (friends.invitee_id = ${user.member_id}) AND (members.member_id = friends.inviter_id OR members.member_id = friends.invitee_id) AND (members.member_id != ${user.member_id}) AND (friends.accepted = false)`);

    res.json({ result: [friendsData.rows, requestsData.rows] })
  } catch (err) {
      res.json({ result: err.stack });
  }
};