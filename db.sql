CREATE DATABASE api;

INSERT INTO roles(id, name, createdAt, updatedAt) VALUES (1, 'user', NOW(), NOW());
INSERT INTO roles(id, name, createdAt, updatedAt) VALUES (2, 'moderator', NOW(), NOW());
INSERT INTO roles(id, name, createdAt, updatedAt) VALUES (3, 'admin', NOW(), NOW());