export const createSplits = `
CREATE TABLE IF NOT EXISTS splits
(
    split_id SERIAL NOT NULL,
    expense_id integer,
    member_id integer,
    split_value integer NOT NULL DEFAULT 0,
    date_split date NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT splits_pkey PRIMARY KEY (split_id),
    CONSTRAINT splits_expense_id_fkey FOREIGN KEY (expense_id)
        REFERENCES expenses (expense_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT splits_member_id_fkey FOREIGN KEY (member_id)
        REFERENCES members (member_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
  `;

export const populateSplits = `
INSERT INTO splits(
    expense_id, member_id)
	VALUES (1, 1);
`;

export const dropSplits = 'DROP TABLE splits';