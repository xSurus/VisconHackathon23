CREATE TABLE IF NOT EXISTS Category (
    id SERIAL PRIMARY KEY,
    name text
);

CREATE TABLE IF NOT EXISTS Supplier (
    id SERIAL PRIMARY KEY,
    name text,
    email text,
    address text,
    iban text,
    billind_address text
);

CREATE TABLE IF NOT EXISTS Seeker (
    id SERIAL PRIMARY KEY,
    name text UNIQUE,
    email text,
    address text
);


CREATE TABLE IF NOT EXISTS Voucher (
    id SERIAL PRIMARY KEY,
    name text,
    uuid uuid,
    price money,
    supplier_id INTEGER,
    FOREIGN KEY (supplier_id) REFERENCES Supplier(id)
);



CREATE TABLE IF NOT EXISTS Voucher_Bought (
    seeker_id INTEGER,
    voucher_id INTEGER,
    PRIMARY KEY(seeker_id, voucher_id)
);
