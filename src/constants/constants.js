// App config
export const APP_CONFIG = {
  SERVER_BASE_URL: "http://localhost:4000",
  SEARCH_DEBOUNCE_TIME: 300,
};

// Error messages
export const ERROR_MESSAGES = {
  GENERIC_ERROR: "Something went wrong.",
  FETCH_TRANSACTIONS_FAILED: "Failed to fetch transactions.",
  NETWORK_ERROR: "Network error. Please check your connection.",
  DATA_PROCESSING_ERROR: "Unable to process transaction data.",
};

// Table config
export const TABLE_CONFIG = {
  DEFAULT_ROWS_PER_PAGE: 10,
  DEFAULT_ROWS_PER_PAGE_OPTIONS: [10, 25, 50],
  DEFAULT_SORT_ORDER: "asc",
  SORT_ORDER_ASCENDING: "asc",
  SORT_ORDER_DESCENDING: "desc",
  NO_DATA: "No data to show",
};

// UI Text
export const UI_TEXT = {
  DASHBOARD_TITLE: "Customer Rewards Dashboard",
  LOADING_TRANSACTIONS: "Loading transactions...",
  TRANSACTIONS_LOADED_SUCCESSFULLY: "Transactions loaded successfully!",
  TABLE_TITLE_TRANSACTIONS: "Transactions",
  TABLE_TITLE_TOTAL_REWARDS: "Total Rewards",
  TABLE_TITLE_MONTHLY_REWARDS: "Monthly Rewards",
  LOADING_MESSAGE: "Loading...",
};
