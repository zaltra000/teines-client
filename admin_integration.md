# Admin App Integration Guide

This document outlines the data structure for orders submitted by the customer application. These orders follow a **Pay on Delivery** model; the customer submits their details and location, and the distributor handles payment collection upon delivery.

## Firebase Path
Orders are stored in the Firebase Realtime Database at the following path:
`orders/{orderId}`

## Order Data Structure (JSON)

```json
{
  "createdAt": 1710000000000,
  "status": "pending",
  "userName": "Customer Name",
  "userPhone": "+249123456789",
  "userLocation": "Khartoum (الخرطوم)",
  "total": 15000,
  "items": [
    {
      "id": "prod_1",
      "name": "Chitosan Capsules",
      "price": 5000,
      "quantity": 2,
      "currency": "SDG",
      "image": "https://..."
    },
    {
      "id": "prod_2",
      "name": "Antilipemic Tea",
      "price": 5000,
      "quantity": 1,
      "currency": "SDG",
      "image": "https://..."
    }
  ]
}
```

## Field Descriptions
- **createdAt**: Firebase `serverTimestamp()` (milliseconds since epoch).
- **status**: Current state of the order. Default is `pending`. Possible values for Admin: `pending`, `confirmed`, `shipped`, `delivered`, `cancelled`.
- **userName**: Full name provided by the customer.
- **userPhone**: Phone number for delivery confirmation.
- **userLocation**: Selected region from the dropdown.
- **total**: Total order amount.
- **items**: Array of products in the bag.

## Implementation Tips for Admin App
1. **Listen for New Orders**: Use `onChildAdded` or `onValue` on the `orders` node.
2. **Push Notifications**: Consider adding a Cloud Function to trigger a notification to the Admin when a new order is pushed to `orders/`.
3. **Status Updates**: The Admin app should be able to update the `status` field to notify the distributor (or the customer if notifications are implemented).
