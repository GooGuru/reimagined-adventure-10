-- db/seeds.sql
-- Insert departments
INSERT INTO department (name) VALUES ('Engineering'), ('HR'), ('Sales');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 80000, 1), ('HR Manager', 60000, 2), ('Sales Manager', 70000, 3);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('John', 'Doe', 1, NULL), 
       ('Jane', 'Smith', 2, NULL), 
       ('Michael', 'Brown', 3, 1);
