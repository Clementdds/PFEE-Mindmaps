DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users(
  id serial PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

DROP TABLE IF EXISTS mindmaps CASCADE;
CREATE TABLE IF NOT EXISTS mindmaps(
  id serial PRIMARY KEY,
  fullmaptext TEXT,
  name VARCHAR(128),
  ispublic BOOLEAN
);

DROP TABLE IF EXISTS usermaps;
CREATE TABLE usermaps(
  id serial PRIMARY KEY,
  userid INTEGER,
  mapid INTEGER,
  userrole INTEGER,
  FOREIGN KEY (userid) REFERENCES users(id),
  FOREIGN KEY (mapid) REFERENCES mindmaps(id)
);

DROP TABLE IF EXISTS links;
CREATE TABLE links(
  id serial PRIMARY KEY,
  nodeid BIGINT,
  mindmapid INTEGER,
  url VARCHAR(128) UNIQUE,
  FOREIGN KEY (mindmapid) REFERENCES mindmaps(id)
);
