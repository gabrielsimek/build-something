DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  user_name TEXT NOT NULL,
  items JSON[]
);