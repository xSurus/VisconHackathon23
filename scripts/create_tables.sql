CREATE TABLE IF NOT EXISTS Category (name TEXT PRIMARY KEY);

CREATE TABLE IF NOT EXISTS Address (
    id SERIAL PRIMARY KEY,
    street TEXT NOT NULL,
    cap INTEGER NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL
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

CREATE TABLE IF NOT EXISTS Ordine (
    id SERIAL PRIMARY KEY,
    -- pending=0, confirmed=1, declined=2, paid=3
    status INTEGER NOT NULL,
    seeker_id SERIAL REFERENCES Seeker(id) ON DELETE
    SET
        NULL
);

CREATE TABLE IF NOT EXISTS Offer (
    id SERIAL PRIMARY KEY,
    supplier_id SERIAL REFERENCES Supplier(id)
);

CREATE TABLE IF NOT EXISTS Voucher (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    uuid uuid NOT NULL,
    price money NOT NULL,
    supplier_id SERIAL REFERENCES Supplier(id),
    offer_id SERIAL REFERENCES Offer(id)
);

CREATE TABLE IF NOT EXISTS Voucher_Order (
    ordine_id SERIAL REFERENCES Ordine(id) NOT NULL,
    voucher_id SERIAL REFERENCES Voucher(id) NOT NULL,
    PRIMARY KEY(ordine_id, voucher_id)
);

-- Many Category <> One Offer map table.
CREATE TABLE IF NOT EXISTS Offer_Category (
    offer_id SERIAL REFERENCES Offer(id) NOT NULL,
    category_name text REFERENCES Category(name) NOT NULL,
    PRIMARY KEY (offer_id, category_name)
);

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

INSERT INTO
    Address (id, street, cap, city, country)
VALUES
    (
        1,
        'Leonhardstrasse 12',
        8001,
        'Zurich',
        'Switzerland'
    ),
    (
        2,
        'Ramistrasse 80',
        8001,
        'Zurich',
        'Switzerland'
    ),
    (
        3,
        'CAB Addr',
        8001,
        'Zurich',
        'Switzerland'
    ),
    (
        4,
        'Street stuff',
        598459,
        'NYC',
        'murrica'
    ) ON CONFLICT DO NOTHING;

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
    ),
    (
        3,
        'billing cab',
        'IBANPLACEHOLDER'
    ) ON CONFLICT DO NOTHING;

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
    ),
    (
        2,
        'Migros',
        'contact@migros.ch',
        'migros.ch',
        2,
        2
    ),
    (
        3,
        'Steam',
        'contact@steam.com',
        'steam.com',
        4,
        3
    ) ON CONFLICT DO NOTHING;

INSERT INTO
    Seeker (id, name, email, address_id, homepage)
VALUES
    (1, 'VIS', 'vis@ethz.ch', 3, 'vis.ethz.ch'),
    (2, 'AMIV', 'amiv@ethz.ch', 2, 'amiv.ethz.ch'),
    (3, 'VMP', 'vmp@ethz.ch', 1, 'vmp.ethz.ch') ON CONFLICT DO NOTHING;

INSERT INTO
    Ordine (id, status, seeker_id)
VALUES
    (1, 0, 1),
    (2, 0, 2) ON CONFLICT DO NOTHING;

INSERT INTO
    Offer (id, supplier_id)
VALUES
    (1, 1),
    (2, 2) ON CONFLICT DO NOTHING;

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
    ),
    (
        2,
        'massaggio con ciabatte',
        uuid_generate_v4(),
        10,
        2,
        2
    ) ON CONFLICT DO NOTHING;

INSERT INTO
    Voucher_Order (ordine_id, voucher_id)
VALUES
    (1, 1) ON CONFLICT DO NOTHING;