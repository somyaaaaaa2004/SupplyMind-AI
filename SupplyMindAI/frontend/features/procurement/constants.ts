/**
 * Procurement feature constants — Select options for forms.
 */

export const PR_STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'REJECTED', label: 'Rejected' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'COMPLETED', label: 'Completed' },
];

export const PO_STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'SENT', label: 'Sent' },
  { value: 'ACKNOWLEDGED', label: 'Acknowledged' },
  { value: 'PARTIALLY_RECEIVED', label: 'Partially Received' },
  { value: 'RECEIVED', label: 'Received' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'DISPUTED', label: 'Disputed' },
];

export const RFQ_STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'DRAFT', label: 'Draft' },
  { value: 'SENT', label: 'Sent' },
  { value: 'QUOTES_RECEIVED', label: 'Quotes Received' },
  { value: 'AWARDED', label: 'Awarded' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

export const VENDOR_STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'BLOCKED', label: 'Blocked' },
];

export const URGENCY_OPTIONS = [
  { value: '', label: 'All Urgency' },
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'CRITICAL', label: 'Critical' },
];

export const URGENCY_OPTIONS_FORM = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'CRITICAL', label: 'Critical' },
];

export const CATEGORY_OPTIONS = [
  { value: '', label: 'All Categories' },
  { value: 'IT_HARDWARE', label: 'IT Hardware' },
  { value: 'IT_SOFTWARE', label: 'IT Software' },
  { value: 'OFFICE_SUPPLIES', label: 'Office Supplies' },
  { value: 'FURNITURE', label: 'Furniture' },
  { value: 'SERVICES', label: 'Services' },
  { value: 'MARKETING', label: 'Marketing' },
  { value: 'FACILITIES', label: 'Facilities' },
  { value: 'LOGISTICS', label: 'Logistics' },
  { value: 'RAW_MATERIALS', label: 'Raw Materials' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'OTHER', label: 'Other' },
];

export const CATEGORY_OPTIONS_FORM = [
  { value: 'IT_HARDWARE', label: 'IT Hardware' },
  { value: 'IT_SOFTWARE', label: 'IT Software' },
  { value: 'OFFICE_SUPPLIES', label: 'Office Supplies' },
  { value: 'FURNITURE', label: 'Furniture' },
  { value: 'SERVICES', label: 'Services' },
  { value: 'MARKETING', label: 'Marketing' },
  { value: 'FACILITIES', label: 'Facilities' },
  { value: 'LOGISTICS', label: 'Logistics' },
  { value: 'RAW_MATERIALS', label: 'Raw Materials' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'OTHER', label: 'Other' },
];

export const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD — US Dollar' },
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'GBP', label: 'GBP — British Pound' },
  { value: 'JPY', label: 'JPY — Japanese Yen' },
  { value: 'CAD', label: 'CAD — Canadian Dollar' },
  { value: 'AUD', label: 'AUD — Australian Dollar' },
  { value: 'CHF', label: 'CHF — Swiss Franc' },
  { value: 'CNY', label: 'CNY — Chinese Yuan' },
  { value: 'INR', label: 'INR — Indian Rupee' },
  { value: 'SGD', label: 'SGD — Singapore Dollar' },
];

export const PAYMENT_TERMS_OPTIONS = [
  { value: 'NET_15', label: 'Net 15' },
  { value: 'NET_30', label: 'Net 30' },
  { value: 'NET_45', label: 'Net 45' },
  { value: 'NET_60', label: 'Net 60' },
  { value: 'NET_90', label: 'Net 90' },
  { value: 'IMMEDIATE', label: 'Immediate' },
  { value: 'COD', label: 'Cash on Delivery' },
  { value: 'PREPAID', label: 'Prepaid' },
];

export const UNIT_OPTIONS = [
  { value: 'PCS', label: 'Pieces (pcs)' },
  { value: 'KG', label: 'Kilograms (kg)' },
  { value: 'LTR', label: 'Liters (ltr)' },
  { value: 'MTR', label: 'Meters (mtr)' },
  { value: 'BOX', label: 'Box' },
  { value: 'PACK', label: 'Pack' },
  { value: 'SET', label: 'Set' },
  { value: 'UNIT', label: 'Unit' },
  { value: 'HOUR', label: 'Hour' },
  { value: 'DAY', label: 'Day' },
  { value: 'MONTH', label: 'Month' },
];

export const COUNTRY_OPTIONS = [
  { value: 'US', label: '🇺🇸 United States' },
  { value: 'GB', label: '🇬🇧 United Kingdom' },
  { value: 'DE', label: '🇩🇪 Germany' },
  { value: 'FR', label: '🇫🇷 France' },
  { value: 'JP', label: '🇯🇵 Japan' },
  { value: 'CN', label: '🇨🇳 China' },
  { value: 'IN', label: '🇮🇳 India' },
  { value: 'CA', label: '🇨🇦 Canada' },
  { value: 'AU', label: '🇦🇺 Australia' },
  { value: 'SG', label: '🇸🇬 Singapore' },
  { value: 'AE', label: '🇦🇪 UAE' },
  { value: 'BR', label: '🇧🇷 Brazil' },
  { value: 'MX', label: '🇲🇽 Mexico' },
  { value: 'KR', label: '🇰🇷 South Korea' },
  { value: 'NL', label: '🇳🇱 Netherlands' },
];

export const VENDOR_CATEGORY_OPTIONS = [
  { value: 'TECHNOLOGY', label: 'Technology' },
  { value: 'MANUFACTURING', label: 'Manufacturing' },
  { value: 'LOGISTICS', label: 'Logistics' },
  { value: 'SERVICES', label: 'Services' },
  { value: 'RAW_MATERIALS', label: 'Raw Materials' },
  { value: 'OFFICE_SUPPLIES', label: 'Office Supplies' },
  { value: 'MARKETING', label: 'Marketing' },
  { value: 'FACILITIES', label: 'Facilities' },
  { value: 'CONSULTING', label: 'Consulting' },
  { value: 'OTHER', label: 'Other' },
];

export const PROCUREMENT_QUERY_KEYS = {
  PR_LIST: 'purchase-requests',
  PR_DETAIL: 'purchase-request',
  PO_LIST: 'purchase-orders',
  PO_DETAIL: 'purchase-order',
  VENDOR_LIST: 'vendors',
  VENDOR_DETAIL: 'vendor',
  RFQ_LIST: 'rfq-list',
  RFQ_DETAIL: 'rfq-detail',
};
