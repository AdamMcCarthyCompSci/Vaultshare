// var express = require('express');
// var router = express.Router();

// var pgp = require('pg-promise')(/* options */);
// const connection = 'postgres://postgres:Rhythm032598!@localhost:5432/Splitwise_Database';
// var db = pgp(connection);

// router.all('/register', function(req, res, next) {
//   console.log("hi")
//   db.any('SELECT * FROM members')
//   .then(function(data) {
//     console.log(req.body);
//     res.json({result: data});
//   })
//   .catch(function(error) {
//     console.log('ERROR', error);
//   });
//   // res.json({result: "Yep!"});
// });

// module.exports = router;
import express from 'express';
import { indexPage, messagesPage, addMessage, groupsPage, groupPage, addExpense, addSplits, checkMember, addFriend, getFriends, getSplits, getExpenses, getGroupMembers, getExpenseSplits } from '../controllers';
import { modifyMessage, performAsyncAction } from '../middleware';
import { databaseUser } from '../settings';
const indexRouter = express.Router();
indexRouter.use(express.json());

indexRouter.get('/', indexPage);
// indexRouter.get('/messages', messagesPage);
indexRouter.post('/messages', modifyMessage, performAsyncAction, addMessage);
indexRouter.get('/groups', groupsPage);
indexRouter.all('/groupMembers', getGroupMembers);
indexRouter.all('/splits', getSplits);
indexRouter.all('/expenses', getExpenses);
indexRouter.all('/expenseSplits', getExpenseSplits);
indexRouter.post('/addExpense', addExpense, addSplits);
indexRouter.post('/addFriend', checkMember, addFriend);
indexRouter.get('/friends', getFriends);
// indexRouter.get('/login', membersPage);

export default indexRouter;