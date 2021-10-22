import Model from '../models/model';

const membersModel = new Model('members');
const friendsModel = new Model('friends')

export const checkMember = async (req, res, next) => {
    const { username, tag } = req.body
    const user = req.user;
    try {
        const memberData = await membersModel.select(`*`, `WHERE members.username = ${username} and members.tag = ${tag}`);
        console.log(memberData)
        if (memberData.member_id === user.member_id) {
            res.json({result: "You can't add yourself as a friend"})
        }
        // Check if user can't be found results in error, or just an empty result. Also look into result vs messages for JSON. Also check if user has already been added or request already pending.
        req.body = {username: username, tag: tag, memberData: memberData}
        next();
    } catch (err) {
        res.json({ messages: err.stack });
    }
  };

export const addFriend = async (req, res) => {
    const { username, tag } = req.body;
    const user = req.user;
    const columns = 'inviter_id, inviter_id, accepted';
    const values = `'${user.member_id}', '${memberData.member_id}', '${false}'`;
    try {
        const data = await friendsModel.insertWithReturn(columns, values);
        res.json({ result: data })
      } catch (err) {
        res.json({ messages: err.stack });
      }
};