export const createGroups = `
CREATE TABLE IF NOT EXISTS groups
(
    group_id SERIAL NOT NULL,
    group_name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    host_id integer,
    CONSTRAINT groups_pkey PRIMARY KEY (group_id),
    CONSTRAINT groups_host_id_fkey FOREIGN KEY (host_id)
    REFERENCES memberss (member_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
)
  `;

export const populateGroups = `
INSERT INTO groups(
    group_name, host_id)
	VALUES ('GROUP', 1);
`;

export const dropGroups = 'DROP TABLE groups';