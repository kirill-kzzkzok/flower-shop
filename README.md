# Flower Shop

Responsive flower catalogue and ordering interface built with vanilla JavaScript, HTML, CSS and Vite.

## Task

Present a product catalogue with category filters and a browser-based cart, then collect delivery details through a validated order form.

## Technical solution

Product data and cart operations are kept in small JavaScript modules. The cart state is stored in localStorage; the UI updates quantities, totals and the order dialog without a frontend framework or runtime library.

## Implementation

- Category filters render a product grid from local data.
- The cart supports add, remove, quantity changes and persisted browser state.
- Client-side validation checks order details before showing a demo confirmation.
- Responsive styling and accessible status feedback cover the main interactions.
- The form does not call an API, process a payment or submit the entered data.

## Stack

Vanilla JavaScript · HTML · CSS · Vite · localStorage

## Run locally

```sh
npm ci
npm run dev
```

Create a production build with `npm run build`.

## Live demo

[https://sajt-po-zakazu-czvetov.vercel.app](https://sajt-po-zakazu-czvetov.vercel.app)
