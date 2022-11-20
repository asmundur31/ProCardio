CREATE TABLE IF NOT EXISTS recordings(
  id serial primary key,
  recording VARCHAR not null
);

CREATE TABLE IF NOT EXISTS routes(
  id serial primary key,
  name VARCHAR not null,
  route VARCHAR not null,
  video VARCHAR not null,
  thumbnail VARCHAR not null,
  description VARCHAR not null
);

CREATE TABLE IF NOT EXISTS tests(
  id serial primary key,
  name VARCHAR not null,
  test VARCHAR not null,
  video VARCHAR not null,
  thumbnail VARCHAR not null,
  description VARCHAR not null
);
