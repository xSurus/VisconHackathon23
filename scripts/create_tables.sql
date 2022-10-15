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
    address_id INTEGER REFERENCES Address(id) NOT NULL,
    billing INTEGER REFERENCES Billing(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS Seeker (
    id SERIAL PRIMARY KEY,
    name text UNIQUE NOT NULL,
    img text,
    email text NOT NULL,
    address_id INTEGER REFERENCES Address(id) NOT NULL,
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
    supplier_id INTEGER REFERENCES Supplier(id)
);

CREATE TABLE IF NOT EXISTS Voucher (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    price INTEGER NOT NULL,
    supplier_id INTEGER REFERENCES Supplier(id),
    offer_id INTEGER REFERENCES Offer(id)
);

CREATE TABLE IF NOT EXISTS Voucher_Order (
    ordine_id INTEGER REFERENCES Ordine(id) NOT NULL,
    voucher_id UUID REFERENCES Voucher(id) NOT NULL,
    PRIMARY KEY(ordine_id, voucher_id)
);

-- Many Category <> One Offer map table.
CREATE TABLE IF NOT EXISTS Offer_Category (
    offer_id INTEGER REFERENCES Offer(id) NOT NULL,
    category_name text REFERENCES Category(name) NOT NULL,
    PRIMARY KEY (offer_id, category_name)
);

CREATE TABLE IF NOT EXISTS SeekerCredential (
    seeker_id SERIAL PRIMARY KEY REFERENCES Seeker(id) NOT NULL,
    token CHAR(64) UNIQUE NOT NULL DEFAULT concat(md5(random() :: text), md5(random() :: text)),
    email TEXT UNIQUE NOT NULL DEFAULT concat(
        substr(md5(random() :: text), 0, 6),
        '@thundercock.dev'
    ),
    password TEXT NOT NULL -- bcrypt hash of the password
);

CREATE TABLE IF NOT EXISTS SupplierCredential (
    supplier_id SERIAL PRIMARY KEY REFERENCES Supplier(id) NOT NULL,
    email TEXT UNIQUE NOT NULL DEFAULT concat(
        substr(md5(random() :: text), 0, 6),
        '@thundercock.dev'
    ),
    token CHAR(64) UNIQUE NOT NULL DEFAULT concat(md5(random() :: text), md5(random() :: text)),
    password TEXT NOT NULL -- bcrypt hash of the password    
);