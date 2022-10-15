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
    img text,
    email text UNIQUE NOT NULL,
    homepage text,
    address_id SERIAL REFERENCES Address(id) NOT NULL,
    billing SERIAL REFERENCES Billing(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS Seeker (
    id SERIAL PRIMARY KEY,
    name text UNIQUE NOT NULL,
    img text,
    email text NOT NULL,
    address_id SERIAL REFERENCES Address(id) NOT NULL,
    homepage text
);

CREATE TABLE IF NOT EXISTS Ordine (
    id SERIAL PRIMARY KEY,
    -- pending=0, confirmed=1, declined=2, paid=3
    status INTEGER NOT NULL,
    seeker_id INTEGER REFERENCES Seeker(id) ON DELETE
    SET
        NULL
);

CREATE TABLE IF NOT EXISTS Offer (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    supplier_id SERIAL REFERENCES Supplier(id)
);

CREATE TABLE IF NOT EXISTS Voucher (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    price money NOT NULL,
    supplier_id SERIAL REFERENCES Supplier(id),
    offer_id SERIAL REFERENCES Offer(id)
);

CREATE TABLE IF NOT EXISTS Voucher_Order (
    ordine_id SERIAL REFERENCES Ordine(id) NOT NULL,
    voucher_id UUID REFERENCES Voucher(id) NOT NULL,
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
    Supplier (
        id,
        name,
        img,
        email,
        homepage,
        address_id,
        billing
    )
VALUES
    (
        1,
        'Oceano',
        'https://oceanotheclub.ch/images/b/b/1/2/c/bb12c2bfc990a7d09aa192b8c3684089a31d2df0-co0001.jpeg',
        'oceano@troie.com',
        'oceano.balls',
        1,
        1
    ),
    (
        2,
        'Migros',
        'https://corporate.migros.ch/dam/jcr:e23ffe29-2cd1-459c-9c0d-8ba373c31601/logo_migros-1.jpg',
        'contact@migros.ch',
        'migros.ch',
        2,
        2
    ),
    (
        3,
        'Steam',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/langfr-220px-Steam_icon_logo.svg.png',
        'contact@steam.com',
        'steam.com',
        4,
        3
    ) ON CONFLICT DO NOTHING;

INSERT INTO
    Seeker (id, name, img, email, address_id, homepage)
VALUES
    (
        1,
        'VIS',
        'https://vseth.ethz.ch/wp-content/uploads/2020/05/vis_logo_rgb-1-1200x688.png',
        'vis@ethz.ch',
        3,
        'vis.ethz.ch'
    ),
    (
        2,
        'AMIV',
        'https://avatars.githubusercontent.com/u/866242?s=280&v=4',
        'amiv@ethz.ch',
        2,
        'amiv.ethz.ch'
    ),
    (
        3,
        'VMP',
        'https://math.ethz.ch/news-and-events/news/d-math-news/2021/06/2021-vmp-assistant-award/_jcr_content/rightpar_top/contextinfo/fullwidthimage/image.imageformat.context.140405680.jpg',
        'vmp@ethz.ch',
        1,
        'vmp.ethz.ch'
    ) ON CONFLICT DO NOTHING;

INSERT INTO
    Ordine (id, status, seeker_id)
VALUES
    (1, 0, 1),
    (2, 0, 2) ON CONFLICT DO NOTHING;

INSERT INTO
    Offer (id, name, description, supplier_id)
VALUES
    (
        1,
        'Name1',
        'Offerta imperdibile! Un materasso supercomfort in technolatex con scappellamento a destra, e brematura!',
        1
    ),
    (2, 'Name2', 'Non e una truffa', 2) ON CONFLICT DO NOTHING;

INSERT INTO
    Voucher (id, name, price, supplier_id, offer_id)
VALUES
    (
        'ce6def9e-36cb-421b-bde4-25d503bbbfe1',
        '10min cbt session',
        10,
        1,
        1
    ),
    (
        'ce6def9e-36cb-421b-bde4-25d503bbbfe2',
        '20min cbt session',
        20,
        1,
        1
    ),
    (
        'ce6def9e-36cb-421b-bde4-25d503bbbfe3',
        '30min cbt session',
        30,
        1,
        1
    ),
    (
        'ce6def9e-36cb-421b-bde4-25d503bbbfe4',
        '40min cbt session',
        40,
        1,
        1
    ),
    (
        'ce6def9e-36cb-421b-bde4-25d503bbbfe5',
        '50min cbt session',
        50,
        1,
        1
    ),
    (
        'ce6def9e-36cb-421b-bde4-25d503bbbfe6',
        '60min cbt session',
        60,
        1,
        1
    ),
    (
        'ce6def9e-36cb-421b-bde4-25d503bbbfe7',
        '70min cbt session',
        70,
        1,
        1
    ),
    (
        'ce6def9e-36cb-421b-bde4-25d503bbbfe8',
        'massaggio con ciabatte',
        80,
        2,
        2
    ) ON CONFLICT DO NOTHING;

INSERT INTO
    Voucher_Order (ordine_id, voucher_id)
VALUES
    (1, 'ce6def9e-36cb-421b-bde4-25d503bbbfe2') ON CONFLICT DO NOTHING;

INSERT INTO
    Offer_Category (category_name, offer_id)
VALUES
    ('Food', 1),
    ('Gaming', 1),
    ('Food', 2),
    ('Cinema', 2),
    ('Culture', 2);