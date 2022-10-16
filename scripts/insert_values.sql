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
    Address (street, cap, city, country)
VALUES
    (
        'Leonhardstrasse 12',
        8001,
        'Zurich',
        'Switzerland'
    ),
    (
        'Ramistrasse 80',
        8001,
        'Zurich',
        'Switzerland'
    ),
    (
        'CAB Addr',
        8001,
        'Zurich',
        'Switzerland'
    ),
    (
        'Street stuff',
        598459,
        'NYC',
        'murrica'
    ) ON CONFLICT DO NOTHING;

INSERT INTO
    Billing (billing_address, iban)
VALUES
    (
        'billing del porcoddio',
        '123456712345678235678'
    ),
    (
        'billing della madonna bestia',
        '98173659872469245'
    ),
    (
        'billing cab',
        'IBANPLACEHOLDER'
    ) ON CONFLICT DO NOTHING;

INSERT INTO
    Supplier (
        name,
        img,
        email,
        homepage,
        address_id,
        billing
    )
VALUES
    (
        'Oceano',
        'https://oceanotheclub.ch/user/themes/oceano/images/logos/oceano_club_web.svg',
        'oceano@troie.com',
        'oceano.balls',
        1,
        1
    ),
    (
        'Migros',
        'https://corporate.migros.ch/dam/jcr:e23ffe29-2cd1-459c-9c0d-8ba373c31601/logo_migros-1.jpg',
        'contact@migros.ch',
        'migros.ch',
        2,
        2
    ),
    (
        'Steam',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/langfr-220px-Steam_icon_logo.svg.png',
        'contact@steam.com',
        'steam.com',
        4,
        3
    ) ON CONFLICT DO NOTHING;

INSERT INTO
    Seeker (name, img, email, address_id, homepage)
VALUES
    (
        'VIS',
        'https://vseth.ethz.ch/wp-content/uploads/2020/05/vis_logo_rgb-1-1200x688.png',
        'vis@ethz.ch',
        3,
        'vis.ethz.ch'
    ),
    (
        'AMIV',
        'https://avatars.githubusercontent.com/u/866242?s=280&v=4',
        'amiv@ethz.ch',
        2,
        'amiv.ethz.ch'
    ),
    (
        'VMP',
        'https://math.ethz.ch/news-and-events/news/d-math-news/2021/06/2021-vmp-assistant-award/_jcr_content/rightpar_top/contextinfo/fullwidthimage/image.imageformat.context.140405680.jpg',
        'vmp@ethz.ch',
        1,
        'vmp.ethz.ch'
    ) ON CONFLICT DO NOTHING;

INSERT INTO
    Offer (name, description, supplier_id)
VALUES
    (
        'Name1',
        'Offerta imperdibile! Un materasso supercomfort in technolatex con scappellamento a destra, e brematura!',
        1
    ),
    ('Name2', 'Non e una truffa', 2),
    ('Test3', 'cosecose', 1),
    ('TTAGNGGNGOG', 'egawsrar', 1) ON CONFLICT DO NOTHING;

INSERT INTO
    Ordine (status, seeker_id, offer_id)
VALUES
    (0, 1, 1),
    (0, 2, 2) ON CONFLICT DO NOTHING;

INSERT INTO
    Voucher (name, price, supplier_id, offer_id)
SELECT
    'test',
    10,
    supplier_id,
    id
FROM
    Offer;

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
    ),
    (
        'ce6def9e-36cb-421b-bde4-25d503bbbfe9',
        'lezioni di league',
        80,
        2,
        3
    ),
    (
        'ce6def9e-36cb-421b-bde4-25d503bbbfea',
        'lezioni di league',
        80,
        2,
        3
    ),
    (
        'ce6def9e-36cb-421b-bde4-25d503bbbfeb',
        'lezioni di league',
        80,
        2,
        3
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
    ('Culture', 2),
    ('Food', 3),
    ('Gaming', 3),
    ('Cinema', 4);

INSERT INTO
    SeekerCredential (password, seeker_id)
SELECT
    '$2b$15$ZRUleociv079Zve9jGIpGexivxVw1WIsX2jDIRDjqG3heCjDv2tRa',
    id
FROM
    Seeker;

INSERT INTO
    SupplierCredential (password, supplier_id)
SELECT
    -- Password is `cock` in bcrypt with 13 salt rounds
    '$2b$13$kP33IHjaJe6gVSsWcYoBuuEBTVT/xi9VliNPqLBErtlA8SbweydWS',
    id
FROM
    Supplier;