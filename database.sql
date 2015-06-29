# Booking Database

CREATE table reservations (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    check_in_date DATE,
    check_in_time TIME,
    number_of_people INT(2),
    create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activity (
    id INT(6) UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    duration TIME
) ENGINE=InnoDB;

CREATE TABLE inventory (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    activity_id INT(6) UNSIGNED NOT NULL,
    start_time DATE,
    end_time DATE,
    quantity SMALLINT,
    notes TEXT,
    price FLOAT,

    FOREIGN KEY (activity_id) REFERENCES activity(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB;
