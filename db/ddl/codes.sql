CREATE TABLE IF NOT EXISTS codes (
    code VARCHAR(255) NOT NULL PRIMARY KEY,
    semester_id VARCHAR(2) NOT NULL,
    rcrv INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS semesters (
    semester_id VARCHAR(2) NOT NULL PRIMARY KEY,
    semester_name VARCHAR(255) NOT NULL,
    semester_year INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

create table IF NOT EXISTS colleges (
    college_id VARCHAR(2) NOT NULL PRIMARY KEY,
    college_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

create table IF NOT EXISTS branches (
    branch_id VARCHAR(2) NOT NULL PRIMARY KEY,
    branch_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO semesters (semester_id, semester_name, semester_year) VALUES ('12', 'I year II semester', 1);
INSERT OR IGNORE INTO semesters (semester_id, semester_name, semester_year) VALUES ('21', 'II year I semester', 2);
INSERT OR IGNORE INTO semesters (semester_id, semester_name, semester_year) VALUES ('22', 'II year II semester', 2);
INSERT OR IGNORE INTO semesters (semester_id, semester_name, semester_year) VALUES ('31', 'III year I semester', 3);
INSERT OR IGNORE INTO semesters (semester_id, semester_name, semester_year) VALUES ('32', 'III year II semester', 3);
INSERT OR IGNORE INTO semesters (semester_id, semester_name, semester_year) VALUES ('41', 'IV year I semester', 4);
INSERT OR IGNORE INTO semesters (semester_id, semester_name, semester_year) VALUES ('42', 'IV year II semester', 4);
INSERT OR IGNORE INTO semesters (semester_id, semester_name, semester_year) VALUES ('11', 'I year I semester', 1);