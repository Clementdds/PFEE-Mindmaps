DROP TABLE IF EXISTS users;
CREATE TABLE users(id serial PRIMARY KEY, username VARCHAR(255), password VARCHAR(255));

DROP TABLE IF EXISTS mindmaps;
CREATE TABLE mindmaps(id serial PRIMARY KEY, fullmaptext LONGTEXT);

DROP TABLE IF EXISTS usermaps;
CREATE TABLE usermaps(
  userid INTEGER,
  mapid INTEGER,
  right INTEGER,
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
)