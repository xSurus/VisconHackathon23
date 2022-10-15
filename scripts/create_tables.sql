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
    Address (id, street, cap, city, country)
VALUES
    (
        1,
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

INSERT INTO
    Billing (id, billing_address, iban)
VALUES
    (
        1,
        'billing del porcoddio',
        '123456712345678235678'
    ),
    (
        2,
        'billing della madonna bestia',
        '98173659872469245'
    );

CREATE TABLE IF NOT EXISTS Supplier (
    id SERIAL PRIMARY KEY,
    name text UNIQUE NOT NULL,
    email text UNIQUE NOT NULL,
    homepage text,
    address_id SERIAL REFERENCES Address(id) NOT NULL,
    billing SERIAL REFERENCES Billing(id) NOT NULL
);

INSERT INTO
    Supplier (id, name, email, homepage, address_id, billing)
VALUES
    (
        1,
        'Oceano',
        'oceano@troie.com',
        'oceano.balls',
        1,
        1
    );

CREATE TABLE IF NOT EXISTS Seeker (
    id SERIAL PRIMARY KEY,
    name text UNIQUE NOT NULL,
    email text NOT NULL,
    address_id SERIAL REFERENCES Address(id) NOT NULL,
    homepage text
);

INSERT INTO
    Seeker (id, name, email, address_id, homepage)
VALUES
    (1, 'VIS', 'vis@ethz.ch', 1, 'vis.ethz.ch');

CREATE TABLE IF NOT EXISTS Ordine (
    id SERIAL PRIMARY KEY,
    -- pending=0, confirmed=1, declined=2, paid=3
    status INTEGER NOT NULL,
    seeker_id SERIAL REFERENCES Seeker(id) ON DELETE
    SET
        NULL
);

INSERT INTO
    Ordine (id, status, seeker_id)
VALUES
    (1, 0, 1);

CREATE TABLE IF NOT EXISTS Voucher (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    uuid uuid NOT NULL,
    price money NOT NULL,
    supplier_id SERIAL REFERENCES Supplier(id),
    offer_id SERIAL REFERENCES Offer(id)
);

INSERT INTO
    Voucher (id, name, uuid, price, supplier_id, offer_id)
VALUES
    (
        1,
        '40min cbt session',
        uuid_generate_v4(),
        40,
        1,
        1
    );

CREATE TABLE IF NOT EXISTS Voucher_Order (
    ordine_id SERIAL REFERENCES Ordine(id) NOT NULL,
    voucher_id SERIAL REFERENCES Voucher(id) NOT NULL,
    PRIMARY KEY(ordine_id, voucher_id)
);

INSERT INTO
    Voucher_Order (ordine_id, voucher_id)
VALUES
    (1, 1);

CREATE TABLE IF NOT EXISTS Offer (
    id SERIAL PRIMARY KEY,
    supplier_id SERIAL REFERENCES Supplier(id)
);

INSERT INTO
    Offer (id, supplier_id)
VALUES
    (1, 1);

-- Many Category <> One Offer map table.
CREATE TABLE IF NOT EXISTS Offer_Category (
    offer_id SERIAL REFERENCES Offer(id) NOT NULL,
    category_name text REFERENCES Category(name) NOT NULL,
    PRIMARY KEY (offer_id, category_name)
);