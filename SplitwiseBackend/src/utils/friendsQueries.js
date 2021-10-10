export const createFriends = `
CREATE TABLE IF NOT EXISTS friends
(
    friend_id SERIAL NOT NULL,
    inviter_id integer NOT NULL,
    invitee_id integer NOT NULL,
    accepted boolean NOT NULL DEFAULT FALSE,

    CONSTRAINT friends_pkey PRIMARY KEY (friend_id),
    CONSTRAINT friends_inviter_id_fkey FOREIGN KEY (inviter_id)
        REFERENCES members (member_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT friends_invitee_id_fkey FOREIGN KEY (invitee_id)
        REFERENCES members (member_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
  `;

export const populateFriends = `
INSERT INTO friends(
    inviter_id, invitee_id, accepted)
	VALUES (1, 2, TRUE);
`;

export const dropFriends = 'DROP TABLE friends';