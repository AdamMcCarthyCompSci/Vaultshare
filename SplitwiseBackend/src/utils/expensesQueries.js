export const createExpenses = `
CREATE TABLE IF NOT EXISTS expenses
(
    expense_id SERIAL NOT NULL,
    member_id integer,
    group_id integer,
    expense_value integer NOT NULL DEFAULT 0,
    date_paid date NOT NULL DEFAULT CURRENT_DATE,
    expense_title character varying(200) COLLATE pg_catalog."default" NOT NULL DEFAULT 'EXPENSE',
    CONSTRAINT expenses_pkey PRIMARY KEY (expense_id),
    CONSTRAINT expenses_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES groups (group_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT expenses_member_id_fkey FOREIGN KEY (member_id)
        REFERENCES members (member_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
  `;

export const populateExpenses = `
INSERT INTO expenses(
    member_id, group_id)
	VALUES (1, 1);
`;

export const dropExpenses = 'DROP TABLE expenses';