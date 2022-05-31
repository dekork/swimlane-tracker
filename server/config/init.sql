CREATE DATABASE IF NOT EXISTS swimlane;
USE swimlane;
CREATE TABLE IF NOT EXISTS boats (
id INT AUTO_INCREMENT PRIMARY KEY,
vessel_name VARCHAR(100) NOT NULL UNIQUE,
operator_name VARCHAR(100),
swimlane TINYINT);

INSERT INTO boats (vessel_name, operator_name, swimlane) VALUES ('test boat', 'sailor', 0);