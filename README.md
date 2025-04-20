## the following is the folder structure

FSM/
├── package.json
├── .env
├── client/
│   ├── package.json
│   ├── src/
│   │   ├── components/
│   │   │   └── ... (reusable UI components)
│   │   ├── pages/
│   │   │   ├── passenger/
│   │   │   │   ├── SearchFlightsPage.js
│   │   │   │   ├── BookingPage.js
│   │   │   │   ├── SeatSelectionPage.js
│   │   │   │   ├── PaymentPage.js
│   │   │   │   └── NotificationsPage.js
│   │   │   ├── freightClient/
│   │   │   │   ├── Book_CargoPage.js
│   │   │   │   ├── TrackShipmentPage.js
│   │   │   │   ├── CheckAvailabilityPage.js
│   │   │   │   ├── SubmitADFFormPage.js
│   │   │   │   └── NotificationsPage.js
│   │   │   └── admin/
│   │   │       ├── ManageFlightsPage.js
│   │   │       ├── ApproveBookingsPage.js
│   │   │       ├── MonitorAnalyticsPage.js
│   │   │       └── AdjustSpacePage.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── bookingService.js
│   │   │   ├── flightService.js
│   │   │   ├── cargoService.js
│   │   │   ├── paymentService.js
│   │   │   └── notificationService.js
│   │   ├── App.js
│   │   └── index.js
│   └── public/
│       └── index.html
├── server/
│   ├── package.json
│   ├── models/
│   │   ├── User.js
│   │   ├── Booking.js
│   │   ├── Flight.js
│   │   ├── Cargo.js
│   │   ├── Payment.js
│   │   └── Notification.js
│   ├── controllers/
│   │   ├── booking/
│   │   │   ├── passengerBookingController.js
│   │   │   ├── freightClientBookingController.js
│   │   │   └── adminBookingApprovalController.js
│   │   ├── flight/
│   │   │   ├── flightScheduleController.js
│   │   │   └── spaceAdjustmentController.js
│   │   ├── payment/
│   │   │   ├── paymentController.js
│   │   │   └── invoiceController.js
│   │   └── notification/
│   │       └── notificationController.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   └── index.js
│   ├── index.js
│   ├── config/
│   │   └── db.js
│   └── public/ (to be populated with front-end build output)
├── docs/
│   └── README.md
├── tests/
└── scripts/
    ├── build.sh
    └── start.sh


# initial installations:
# Flight Management System (FMS1.0)

## Project Structure & Initialization

Below is a table summarizing the key directories and their initialization steps:

| Directory         | Initialization Steps |
|------------------|-------------------------------|
| **Root (FMS1.0)** | Run `npm init`, create `.env`, install back-end dependencies (`express`, `mongoose`, `dotenv`). |
| **Server (server)** | Run `npm init`, install server dependencies, configure `db.js` and `index.js`. |
| **Client (client)** | Run `npm init`, install front-end dependencies (`react`, `react-router-dom`), set up `index.js` and `App.js`. |

---

## Stable Package Versions

The following table outlines the recommended package versions and their purposes:

| Package            | Stable Version (Caret Notation) | Purpose |
|--------------------|--------------------------------|---------|
| `express`         | ^4.18.2                         | Web server for back-end |
| `mongoose`        | ^6.10.0                         | MongoDB ORM for back-end |
| `dotenv`          | ^16.0.3                         | Load environment variables |
| `react`           | ^18.2.0                         | Front-end library for UI |
| `react-dom`       | ^18.2.0                         | Render React components |
| `react-router-dom`| ^6.22.3                         | Navigation for React app |

---

## Alignment with Project Requirements

- The initialization steps align with the project's technical stack, ensuring stable versions for **React, Express, and Mongoose**.
- Supports real-time features like **seat selection and cargo booking**.
- Uses environment variables and database configuration for **security and performance**, as outlined in the interim report.
- Adaptation to **Windows-compatible scripts** ensures usability in a Windows development environment.

---

## Potential Challenges and Considerations

1. **Version Compatibility**
   - Ensure **React and Node.js versions are compatible**.
   - React 18 requires **Node.js 14 or higher**, which is standard on Windows 11.

2. **MongoDB Setup**
   - The user needs a **running MongoDB instance**.
   - If using a **local database**, install **MongoDB Community Edition**.
   - If using **MongoDB Atlas**, set up a cloud instance and update `.env` accordingly.

3. **Dependency Management**
   - Using **caret (^) notation** allows minor updates.
   - Periodically check for **security patches** and update `package.json` as needed.
   - Lock versions using `npm install --save-exact` if necessary.

4. **Script Execution in Windows**
   - Ensure **PowerShell execution policy** allows running `.ps1` files.
   - Use the following command if needed:
     ```powershell
     Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
     ```

