CREATE TABLE IF NOT EXISTS users(
  id serial PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS mindmaps(
  id serial PRIMARY KEY,
  fullmaptext TEXT,
  ispublic BOOLEAN
);

DROP TABLE IF EXISTS usermaps;
CREATE TABLE usermaps(
  userid INTEGER,
  mapid INTEGER,
  userrole INTEGER,
  FOREIGN KEY (userid) REFERENCES users(id),
  FOREIGN KEY (mapid) REFERENCES mindmaps(id)
);

DROP TABLE IF EXISTS links;
CREATE TABLE links(
  id serial PRIMARY KEY,
  nodeid INTEGER,
  mindmapid INTEGER,
  url VARCHAR(128),
  FOREIGN KEY (mindmapid) REFERENCES mindmaps(id)
);
