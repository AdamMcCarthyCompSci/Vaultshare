const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

import Model from './models/model';
const membersModel = new Model('members');

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        // email => membersModel.select('*', `WHERE 'email' = '${email}'`),
        // id => membersModel.select('*', `WHERE 'member_id' = '${id}'`)
        const user = await membersModel.select(`*`, `WHERE "email" = '${email}'`);
        if (user == null) {
            return done(null, false, { message: 'No user with that email'});
        }

        try {
            if (await bcrypt.compare(password, user.rows[0].password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (e) {
            done( e)
        }
    }
    passport.use(new LocalStrategy({ member_id: 'member_id', usernameField: 'email', passwordField: 'password' }, authenticateUser))

    passport.serializeUser((user, done) => {
        done(null, user.rows[0].member_id)
    })
    passport.deserializeUser( async (id, done) => {
        const userID = await membersModel.select('*', `WHERE "member_id" = '${id}'`)
        return done(null, userID.rows[0])
    })
}

module.exports = initialize;
