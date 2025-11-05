export enum USER_ROLE {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

export enum ORDER_STATUS {
  PENDING = 'PENDING',
  SHIPPING = 'SHIPPING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PAYMENT_METHOD {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

export enum PAYMENT_STATUS {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}

export enum PROFILE_MENU {
  BASIC_INFO = 'Basic information',
  ADDRESS = 'Address',
  CHANGE_PASSWORD = 'Change password',
}

export enum STATUS_FORM {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

export enum CATEGORY_PRODUCT {
  LAPTOP = 'Laptop',
  DESKTOP = 'Desktop PC',
  MONITOR = 'Monitor',
  KEYBOARD = 'Keyboard',
  MOUSE = 'Mouse',
  HEADPHONE = 'Headphone',
  SPEAKER = 'Speaker',
  PRINTER = 'Printer',
  SCANNER = 'Scanner',
  WEBCAM = 'Webcam',
  MICROPHONE = 'Microphone',
  STORAGE = 'External SSD / HDD',
  RAM = 'Memory (RAM)',
  GPU = 'Graphics Card (GPU)',
  CPU = 'Processor (CPU)',
  MOTHERBOARD = 'Motherboard',
  PSU = 'Power Supply Unit (PSU)',
  COOLING = 'Cooling System',
  LAPTOP_BAG = 'Laptop Bag / Backpack',
  DOCKING = 'Docking Station / USB Hub',
  SOFTWARE = 'Software',
  ACCESSORY = 'Other Accessories',
}

export const ORDER_STATUS_COLOR: Record<ORDER_STATUS, { label: string; className: string }> = {
  [ORDER_STATUS.PENDING]: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-800',
  },
  [ORDER_STATUS.SHIPPING]: {
    label: 'Shipping',
    className: 'bg-blue-100 text-blue-800',
  },
  [ORDER_STATUS.DELIVERED]: {
    label: 'Delivered',
    className: 'bg-green-100 text-green-800',
  },
  [ORDER_STATUS.CANCELLED]: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-800',
  },
}
