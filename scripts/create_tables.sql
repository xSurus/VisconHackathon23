CREATE TABLE IF NOT EXISTS Category (name TEXT PRIMARY KEY);

INSERT INTO
    Category (name)
VALUES
    ('Food'),
    ('Gaming'),
    ('Steam'),
    ('Sport'),
    ('Music'),
    ('Cinema'),
    ('Culture'),
    ('Cock') ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS Address (
    id SERIAL PRIMARY KEY,
    street TEXT NOT NULL,
    cap INTEGER NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL
);

INSERT INTO
    Address (street, cap, city, country)
VALUES
    (
        'Leonhardstrasse 12',
        8001,
        'Zurich',
        'Switzerland'
    );

CREATE TABLE IF NOT EXISTS Billing (
    id SERIAL PRIMARY KEY,
    billing_address TEXT NOT NULL,
    iban TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Supplier (
    id SERIAL PRIMARY KEY,
    name text UNIQUE NOT NULL,
    email text UNIQUE NOT NULL,
    homepage text,
    address_id SERIAL REFERENCES Address(id) NOT NULL,
    billing SERIAL REFERENCES Billing(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS Seeker (
    id SERIAL PRIMARY KEY,
    name text UNIQUE NOT NULL,
    email text NOT NULL,
    address_id SERIAL REFERENCES Address(id) NOT NULL,
    homepage text
);

CREATE TABLE IF NOT EXISTS Voucher (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    uuid uuid NOT NULL,
    price money NOT NULL,
    supplier_id SERIAL REFERENCES Supplier(id),
    offer_id SERIAL REFERENCES Offer(id)
);

CREATE TABLE IF NOT EXISTS Ordine (
    id SERIAL PRIMARY KEY,
    -- pending=0, confirmed=1, declined=2, paid=3
    status INTEGER NOT NULL,
    seeker_id SERIAL REFERENCES Seeker(id) ON DELETE
    SET
        NULL
);

CREATE TABLE IF NOT EXISTS Voucher_Order (
    ordine_id SERIAL REFERENCES Ordine(id) NOT NULL,
    voucher_id SERIAL REFERENCES Voucher(id) NOT NULL,
    PRIMARY KEY(ordine_id, voucher_id)
);

CREATE TABLE IF NOT EXISTS Offer (
    id SERIAL PRIMARY KEY,
    supplier_id SERIAL REFERENCES Supplier(id)
);

-- Many Category <> One Offer map table.
CREATE TABLE IF NOT EXISTS Offer_Category (
    offer_id REFERENCES Offer(id) NOT NULL,
    category_name REFERENCES Category(name) NOT NULL,
    PRIMARY KEY (offer_id, category_name)
);