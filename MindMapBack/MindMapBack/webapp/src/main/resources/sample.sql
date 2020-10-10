INSERT INTO users (username, password)
 VALUES
 ('Thomas', 'passwordThomas'),
 ('Vincent', 'passwordVincent'),
 ('Clément', 'passwordClement'),
 ('Jeremy', 'passwordJeremy');
 
 
 INSERT INTO mindmaps (fullmaptext, ispublic)
 VALUES
 ('fullmaptext1', true),
 ('fullmaptext2', false),
 ('fullmaptext3', false),
 ('fullmaptext4', true);
 

 INSERT INTO usermaps (userid, mapid, userrole)
 VALUES
 ((SELECT id FROM users WHERE username='Thomas'), (SELECT id FROM mindmaps WHERE fullmaptext='fullmaptext1'), 8),
 ((SELECT id FROM users WHERE username='Vincent'), (SELECT id FROM mindmaps WHERE fullmaptext='fullmaptext2'), 5),
 ((SELECT id FROM users WHERE username='Clément'), (SELECT id FROM mindmaps WHERE fullmaptext='fullmaptext3'), 6),
 ((SELECT id FROM users WHERE username='Jeremy'), (SELECT id FROM mindmaps WHERE fullmaptext='fullmaptext4'), 7);
 
 
 INSERT INTO links (nodeid, mindmapid, url)
 VALUES
 (1767526745, (SELECT id FROM mindmaps WHERE fullmaptext='fullmaptext1'), 'https://example.com'),
 (1767526746, (SELECT id FROM mindmaps WHERE fullmaptext='fullmaptext2'), 'https://google.com'),
 (1767526748, (SELECT id FROM mindmaps WHERE fullmaptext='fullmaptext3'), 'https://epita.fr'),
 (1767526740, (SELECT id FROM mindmaps WHERE fullmaptext='fullmaptext4'), 'https://example.com');