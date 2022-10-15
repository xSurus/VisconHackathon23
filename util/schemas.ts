export const isInteger = (n: string): boolean => !isNaN(parseInt(n, 10));

/** Type alias. A category is simply a string. Case sensitive! */
export type Category = string;

export function isCategory(o: any): o is Category {
	return o && typeof o === "string";
}

/** An address (for seekers and suppliers) containing various fields */
export type Address = {
	id: number;
	street: string;
	cap: number;
	city: string;
	country: string;
};

export function isAddress(o: any): o is Category {
	return (
		o &&
		typeof o.street === "string" &&
		typeof o.cap === "string" &&
		!isNaN(o.cap) &&
		typeof o.city === "string" &&
		typeof o.country === "string"
	);
}

export type Billing = {
	id: number;
	billing_address: string;
	iban: string;
};

export function isBilling(o: any): o is Billing {
	return (
		o &&
		typeof o.id === "string" &&
		!isNaN(o.id) &&
		typeof o.billing_address === "string" &&
		typeof o.iban === "string"
	);
}

/** The voucher has a price and a unique id. Plus stuff. Read */
export type Voucher = {
	id: string;
	name: string;
	/** Price in CHF */
	price: number;
	/** can be null, as a supplier might stop existing later on. */
	supplier?: Supplier;
	/** can be null, as an offer can stop existing later on.
	 * A voucher is offered as part of an unique offer.
	 */
	offer?: Offer;
};

export function isVoucher(o: any): o is Voucher {
	return (
		o &&
		typeof o.id === "string" &&
		!isNaN(o.id) &&
		typeof o.name === "string" &&
		typeof o.uuid === "string" &&
		typeof o.price === "string" &&
		!isNaN(o.price) &&
		(isSupplier(o.supplier) || !o.supplier) &&
		(isOffer(o.offer) || !o.offer)
	);
}

/** le seeker type.
 * le seeker type is commonly found in the blood swamps, where heavy metal plays 24/7
 */
export type Seeker = {
	id: number;
	name: string;
	img: string;
	email: string;
	address: Address;
	homepage?: string;
};

export function isSeeker(o: any): o is Seeker {
	return (
		o &&
		typeof o.id === "string" &&
		!isNaN(o.id) &&
		typeof o.name === "string" &&
		typeof o.img === "string" &&
		typeof o.email === "string" &&
		isAddress(o.address) &&
		(typeof o.homepage === "string" || !o.homepage)
	);
}

/** Supplier type, unique id, some address, some billing, ... */
export type Supplier = {
	id: number;
	name: string;
	img: string;
	email: string;
	address: Address;
	billing: Billing;
	homepage?: string;
};

export function isSupplier(o: any): o is Supplier {
	return (
		o &&
		typeof o.id === "string" &&
		!isNaN(o.id) &&
		typeof o.name === "string" &&
		typeof o.img === "string" &&
		typeof o.email === "string" &&
		isAddress(o.address) &&
		isBilling(o.billing) &&
		(!o.homepage || typeof o.homepage === "string")
	);
}

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

export function isOrderStatus(o: any): o is OrderStatus {
	return o && typeof o === "number" && 0 >= o && o <= 3; // FIXME: is this correct?
}

export type Order = {
	id: number;
	status: OrderStatus;
	seeker?: Seeker;
};

export function isOrder(o: any): o is Order {
	return (
		o &&
		typeof o.id === "string" &&
		!isNaN(o.id) &&
		isOrderStatus(o.status) &&
		(!o.seeker || isSeeker(o.seeker))
	);
}

export type Offer = {
	id: number;
	name: string;
	description: string;
	price_per_voucher: number;
	/** Can vanish in the future */
	supplier?: Supplier;
	/** Can be empty of course, check */
	categories: Category[];
};

export function isOffer(o: any): o is Offer {
	return (
		o &&
		typeof o.id === "string" &&
		!isNaN(o.id) &&
		(!o.supplier || isSupplier(o.supplier)) &&
		Array.isArray(o.categories) &&
		o.categories.every((x: any) => isCategory(x))
	);
}

export function isEmptyObj(o: any): o is {} {
	return !Object.keys(o).length;
}

export type Id = { id: number };

export function isId(o: any): o is { id: number } {
	return o && typeof o.id === "string" && !isNaN(o.id);
}

export function addId<G>(o: G): G & { id: number } {
	return { id: 0, ...o };
}
