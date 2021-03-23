insert into user (username, password, role) values ('admin', '$2a$10$Xtv0umJn1DDZ3ds5FTWHUOHuwJnRQ0qrYpTA1ANaRl8vdiwo1R1iW', 'ROLE_ADMIN');
-- password: admin
insert into user (username, password, role) values ('user', '$2a$10$QUhsliTs8Ufe9nSQgIwzzeDktWOdDw8WY77lN.3AAXL5vVDI2EoVO', 'ROLE_USER');
-- password: user

insert into issue (creator_id, title, description, place, status, created_at, modified_at) values (1, 'issue1', 'description1', 'place1', 'NEW', CURRENT_TIMESTAMP(),  CURRENT_TIMESTAMP());
insert into issue (creator_id, title, description, place, status, created_at, modified_at) values (1, 'issue2', 'description2', 'place2', 'DOING', CURRENT_TIMESTAMP(),  CURRENT_TIMESTAMP());
insert into issue (creator_id, title, description, place, status, created_at, modified_at) values (2, 'issue3', 'description3', 'place3', 'DOING', CURRENT_TIMESTAMP(),  CURRENT_TIMESTAMP());
insert into issue (creator_id, title, description, place, status, created_at, modified_at) values (2, 'issue4', 'description4', 'place4', 'DONE', CURRENT_TIMESTAMP(),  CURRENT_TIMESTAMP());

insert into message (issue_id, body, created_at, creator_id) values (1, 'message1', CURRENT_TIMESTAMP(), 1);
insert into message (issue_id, body, created_at, creator_id) values (1, 'message2', CURRENT_TIMESTAMP(), 1);
insert into message (issue_id, body, created_at, creator_id) values (2, 'message3', CURRENT_TIMESTAMP(), 1);
insert into message (issue_id, body, created_at, creator_id) values (3, 'message4', CURRENT_TIMESTAMP(), 1);

insert into label (text) values ('label1');
insert into label (text) values ('label2');
insert into label (text) values ('label3');
insert into label (text) values ('label4');

insert into issue_labels (issues_id, labels_id) values (1, 1);
insert into issue_labels (issues_id, labels_id) values (1, 2);
insert into issue_labels (issues_id, labels_id) values (2, 1);
insert into issue_labels (issues_id, labels_id) values (2, 4);
insert into issue_labels (issues_id, labels_id) values (3, 3);
insert into issue_labels (issues_id, labels_id) values (3, 4);