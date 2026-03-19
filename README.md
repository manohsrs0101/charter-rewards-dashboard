# Customer Rewards Dashboard

## Overview

This application calculates and displays customer reward points based on their transaction history.

It provides a dashboard with:

- **Transactions Table**
- **Monthly Rewards Summary**
- **Total Rewards per Customer**

---

## Features

- Fetch and display customer transactions
- Calculate reward points based on business rules
- Search, sort, and paginate table data
- View monthly reward breakdown
- View total reward points per customer
- Reusable and scalable table component
- Centralized logging system
- Error handling and loading states
- Unit test coverage using Jest

---

## Demo

![dashboard](src/assets/dashboard.gif)
![table-features](src/assets/table-features.gif)
![loading with failure](<src/assets/loading with failure.gif>)

## Project Structure

```
src
│
├ components
│   ├ common
│   │   ├ Card
│   │   ├ ErrorBoundary
│   │   ├ ErrorMessage
│   │   ├ Loader
│   │   └ Table
│   │
│   ├ MonthlyRewardsTable.jsx
│   ├ TotalRewardsTable.jsx
│   └ TransactionsTable.jsx
│
├ constants
│   └ constants.js
│
├ hooks
│   └ useDebounce.js
│
├ services
│   └ api.js
│
├ styles
│   └ global.css
│
├ utils
│   ├ calculateRewardPointsForTransactions.js
│   ├ calculateMonthlyRewardsForCustomers.js
│   ├ calculateTotalRewardsForCustomers.js
│   ├ addRewardPointsToTransactions.js
│   ├ filterRows.js
│   ├ sortRows.js
│   ├ paginateRows.js
│   ├ logger.js
│   └ index.js
│
├ __tests__
│   ├ rewardPoints.test.js
│   ├ monthlyRewards.test.js
│   ├ totalRewards.test.js
│   ├ sortRows.test.js
│   ├ filterRows.test.js
│   └ paginateRows.test.js
│
├ App.jsx
└ index.js
```

---

## Setup Instructions

### 1. Install dependencies

```
npm install
```

### 2. Start JSON Server (Mock API)

```
npm run server
```

### 3. Start the application

```
npm run start
```

---

## API

The app uses a mock API via JSON Server:

```
GET /transactions
```

---

## Running Tests

Run unit tests using Jest:

```
npm run test
```

### Test Coverage Includes:

- Reward calculation logic
- Monthly reward aggregation
- Total reward calculation
- Sorting logic
- Filtering logic
- Pagination logic

---

## Author

Manohar Shinde

---
