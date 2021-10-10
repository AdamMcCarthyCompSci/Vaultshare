export const createMembers = `
CREATE TABLE IF NOT EXISTS members
(
    member_id serial NOT NULL,
    email character varying(200) COLLATE pg_catalog."default" NOT NULL,
    date_joined date NOT NULL DEFAULT CURRENT_DATE,
    tag integer NOT NULL DEFAULT 0,
    username character varying(200) COLLATE pg_catalog."default" NOT NULL DEFAULT 'USER',
    password character varying(200) COLLATE pg_catalog."default" NOT NULL DEFAULT 'PASSWORD',
    CONSTRAINT members_pkey PRIMARY KEY (member_id)
)
  `;

export const populateMembers = `
INSERT INTO members(
	email, username, password)
	VALUES ('test@test.com', 'USER', 'PASSWORD');
`;

export const dropMembers = 'DROP TABLE members';