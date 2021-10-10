import { pool } from '../models/pool';
import {
    createExpenses,
    populateExpenses,
    dropExpenses,
} from './expensesQueries';
import {
    createGroupMembers,
    populateGroupMembers,
    dropGroupMembers,
} from './groupMembersQueries';
import {
    createGroups,
    populateGroups,
    dropGroups,
} from './groupsQueries';
import {
    createMembers,
    populateMembers,
    dropMembers,
} from './membersQueries';
import {
    createSplits,
    populateSplits,
    dropSplits,
} from './splitsQueries';
import {
    createFriends,
    populateFriends,
    dropFriends,
} from './friendsQueries';

export const executeQueryArray = async arr => new Promise(resolve => {
  const stop = arr.length;
  arr.forEach(async (q, index) => {
    await pool.query(q);
    if (index + 1 === stop) resolve();
  });
});

export const createAllTables = () => executeQueryArray([ createMembers, createGroups, createGroupMembers, createExpenses, createSplits, createFriends ]);
export const populateAllTables = () => executeQueryArray([ populateMembers, populateGroups, populateGroupMembers, populateExpenses, populateSplits, populateFriends ]);
export const dropAllTables = () => executeQueryArray([ dropFriends, dropSplits, dropExpenses, dropGroupMembers, dropGroups, dropMembers ]);

export const createExpensesTable = () => executeQueryArray([ createExpenses ]);
export const populateExpensesTable = () => executeQueryArray([ populateExpenses ]);
export const dropExpensesTable = () => executeQueryArray([ dropExpenses ]);

export const createGroupMembersTable = () => executeQueryArray([ createGroupMembers ]);
export const populateGroupMembersTable = () => executeQueryArray([ populateGroupMembers ]);
export const dropGroupMembersTable = () => executeQueryArray([ dropGroupMembers ]);

export const createGroupsTable = () => executeQueryArray([ createGroups ]);
export const populateGroupsTable = () => executeQueryArray([ populateGroups ]);
export const dropGroupsTable = () => executeQueryArray([ dropGroups ]);

export const createMembersTable = () => executeQueryArray([ createMembers ]);
export const populateMembersTable = () => executeQueryArray([ populateMembers ]);
export const dropMembersTable = () => executeQueryArray([ dropMembers ]);

export const createSplitsTable = () => executeQueryArray([ createSplits ]);
export const populateSplitsTable = () => executeQueryArray([ populateSplits ]);
export const dropSplitsTable = () => executeQueryArray([ dropSplits ]);

export const createFriendsTable = () => executeQueryArray([ createFriends ]);
export const populateFriendsTable = () => executeQueryArray([ populateFriends ]);
export const dropFriendsTable = () => executeQueryArray([ dropFriends ]);