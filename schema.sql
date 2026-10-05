-- Schema for the Equipment Management database

CREATE TABLE equipment (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    name            TEXT NOT NULL,
    category        TEXT NOT NULL CHECK (category IN (
                        'Laptop',
                        'Monitor',
                        'Smartphone',
                        'Tablet',
                        'Printer',
                        'Network Equipment'
                    )),
    serial_number   TEXT UNIQUE NOT NULL,
    status          TEXT NOT NULL CHECK (status IN (
                        'Available',
                        'Assigned',
                        'Maintenance',
                        'Retired'
                    )),
    location        TEXT NOT NULL,
    purchase_date   DATE NOT NULL
);
