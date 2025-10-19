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
