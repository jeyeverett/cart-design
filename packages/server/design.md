# Product Specification

We are building an e-commerce application.

Let’s assume that there is a table Products which lists many products and their data.

Product
Id
Price
ImageUrl

The price and image of a product can be changed over time by other systems which we do not have control over.

We would like to construct an API which allows a user to add or remove products to a cart on an associated consumer-facing frontend.

The products we are selling are for a heavily regulated industry, therefore we must be able to fully reconstruct the cart state at any point in its history.

Ex - What did cart with ID 5 look like on 2023-11-10 at 3PM?

- What's in the cart at 3PM on 2023-11-10

During a typical transaction, a customer would add or remove an item from the cart 5 times.

Rules of Engagement

Please ask any clarifying questions you might have.
Use any tools at your disposal, including search engines and the internet in general.
When designing the system, be unconstrained.

The Task

Design a database model which supports the above constraints.

- Write endpoints to add and remove items from the cart
- Write endpoints to get the state of a cart given a date. If no date is provided, return the most recent state.
- Write some useful tests for at least one of the endpoints
