CREATE DATABASE appointments_db;

\c appointments_db

DROP TABLE IF EXISTS appointments;

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(10) NOT NULL,
  reason TEXT
);