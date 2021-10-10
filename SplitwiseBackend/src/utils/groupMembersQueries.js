export const createGroupMembers = `
CREATE TABLE IF NOT EXISTS group_members
(
    group_member_id SERIAL NOT NULL,
    member_id integer,
    group_id integer,
    CONSTRAINT group_members_pkey PRIMARY KEY (group_member_id),
    CONSTRAINT group_members_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES groups (group_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT group_members_member_id_fkey FOREIGN KEY (member_id)
        REFERENCES members (member_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
  `;

export const populateGroupMembers = `
INSERT INTO group_members(
    member_id, group_id)
	VALUES (1, 1);
`;

export const dropGroupMembers = 'DROP TABLE group_members';