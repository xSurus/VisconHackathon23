/** Type alias. A category is simply a string. Case sensitive! */
export type Category = string;

/** An address (for seekers and suppliers) containing various fields */
export type Address = {
    id: number,
    street: string,
    cap: number,
    city: string,
    country: string,
};

export type Billing = {
    id: number;
    billing_address: string;
    iban: string;
};

/** The voucher has a price and a unique id. Plus stuff. Read */
export type Voucher = {
    id: number;
    name: string;
    uuid: string;
    /** Price in CHF */
    price: number;
    /** can be null, as a supplier might stop existing later on. */
    supplier?: Supplier;
    /** can be null, as an offer can stop existing later on.
     * A voucher is offered as part of an unique offer.
     */
    offer?: Offer;
};

/** le seeker type.
 * le seeker type is commonly found in the blood swamps, where heavy metal plays 24/7
 */
export type Seeker = {
    id: number;
    name: string;
    email: string;
    address: Address;
    homepage?: string;
};

/** Supplier type, unique id, some address, some billing, ... */
export type Supplier = {
    id: number;
    name: string;
    email: string;
    address: Address;
    billing: Billing;
    homepage?: string;
};

/** Order status. State transitions are
 * Pending -> {Confirmed, Declined}
 * Confirmed -> {Paid, Declined}
 */
export enum OrderStatus {
    Pending = 0,
    Confirmed = 1,
    Declined = 2,
    Paid = 3,
}

export type Order = {
    id: number;
    status: OrderStatus;
    seeker?: Seeker;
};

export type Offer = {
    id: number;
    /** Can vanish in the future */
    supplier?: Supplier;
    /** Can be empty of course, check */
    categories: Category[];
};