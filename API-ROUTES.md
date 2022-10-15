# API Routes

Api routes available at prefix `http://host.name/api`.

To see the parameters taken by the routes, see `/pages/api/{page}.ts`.
Types like `GetQuery`, `PatchQuery`, ... define the expected query parameters
for a `GET`, `PATCH`, ... request. Malformed parameters will lead to a `400` response.

HTTP Codes are used for responses. 201 CREATED, 400 Malformed, 404 Not Found, 500 Internal Error, ...


List of api routes:
- `/category`
- `/address`
- `/supplier`
- `/seeker`
- `/offer`
- `/order`

API is Restful, meaning that HTTP Methods define the functionality.

## Category
Methods:
- `GET`: Get a list of all categories. Query: undefined; Response: `{categories: string[]}`
- `DELETE`: Delete a category by name. Query: `name`; Response: Status Code
- `PUT`: Create a category by name. Query: `name`. Response: Status Code

## Address
TODO: Complete
## Supplier

## Seeker

## Offer
- `GET`: Get info about an offer
- `POST`: Create a new offer
- `PUT or PATCH`: Edit an offer
- `DELETE`: Delete an offer 

## Order
- `GET`: `?seeker_id` Responds with the list of orders of said seeker, `Order[]`
- `POST`: `?seeker_id & offer_id & amount` Order a certain amount of vouchers from an offer, as a seeker. Returns `{order: Order; vouchers: Voucher[];}`
  on success, otherwise a `string` error or `undefined`.
- `PATCH`: `?id & status` Set the new status of this order. Responds with the updated `Order`, or undefined if not found.