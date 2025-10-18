import { MdOutlinePower, MdOutlineStorage } from 'react-icons/md'
import {
  RiBattery2ChargeLine,
  RiBox3Line,
  RiCameraLine,
  RiComputerLine,
  RiCpuLine,
  RiHardDrive2Line,
  RiHeadphoneLine,
  RiKeyboardBoxLine,
  RiMicLine,
  RiMouseLine,
  RiPrinterLine,
  RiRam2Line,
  RiSdCardMiniLine,
  RiSoundModuleLine,
  RiTempColdLine,
  RiTv2Line,
  RiUsbLine,
} from 'react-icons/ri'

import { CATEGORY_PRODUCT } from '@/constant'

export const attributeOptions = {
  [CATEGORY_PRODUCT.LAPTOP]: {
    attributes: [
      { label: 'CPU', icon: RiCpuLine },
      { label: 'GPU', icon: RiComputerLine },
      { label: 'RAM', icon: RiRam2Line },
      { label: 'Storage', icon: MdOutlineStorage },
      { label: 'Size', icon: RiTv2Line },
      { label: 'Battery Life', icon: RiBattery2ChargeLine },
      { label: 'Weight', icon: RiBox3Line },
      { label: 'Color', icon: RiBox3Line },
    ],
  },

  [CATEGORY_PRODUCT.DESKTOP]: {
    attributes: [
      { label: 'CPU', icon: RiCpuLine },
      { label: 'GPU', icon: RiComputerLine },
      { label: 'RAM', icon: RiRam2Line },
      { label: 'Storage', icon: RiHardDrive2Line },
      { label: 'Power Supply (PSU)', icon: MdOutlinePower },
      { label: 'Case Size', icon: RiBox3Line },
    ],
  },

  [CATEGORY_PRODUCT.MONITOR]: {
    attributes: [
      { label: 'Screen Size', icon: RiTv2Line },
      { label: 'Resolution', icon: RiTv2Line },
      { label: 'Refresh Rate', icon: RiTv2Line },
      { label: 'Panel Type', icon: RiTv2Line },
      { label: 'Ports', icon: RiUsbLine },
    ],
  },

  [CATEGORY_PRODUCT.KEYBOARD]: {
    attributes: [
      { label: 'Type', icon: RiKeyboardBoxLine }, // mechanical / membrane
      { label: 'Switch Type', icon: RiKeyboardBoxLine },
      { label: 'Connection', icon: RiUsbLine }, // wired / wireless
      { label: 'Backlight', icon: RiTempColdLine },
      { label: 'Layout', icon: RiKeyboardBoxLine },
    ],
  },

  [CATEGORY_PRODUCT.MOUSE]: {
    attributes: [
      { label: 'Type', icon: RiMouseLine }, // optical / laser
      { label: 'Connection', icon: RiUsbLine },
      { label: 'DPI', icon: RiMouseLine },
      { label: 'Buttons', icon: RiMouseLine },
    ],
  },

  [CATEGORY_PRODUCT.HEADPHONE]: {
    attributes: [
      { label: 'Type', icon: RiHeadphoneLine }, // over-ear / in-ear
      { label: 'Connection', icon: RiUsbLine },
      { label: 'Noise Cancelling', icon: RiSoundModuleLine },
      { label: 'Microphone', icon: RiMicLine },
    ],
  },

  [CATEGORY_PRODUCT.SPEAKER]: {
    attributes: [
      { label: 'Power Output', icon: RiSoundModuleLine },
      { label: 'Connection', icon: RiUsbLine },
      { label: 'Frequency Response', icon: RiSoundModuleLine },
      { label: 'Battery Life', icon: RiBattery2ChargeLine },
    ],
  },

  [CATEGORY_PRODUCT.PRINTER]: {
    attributes: [
      { label: 'Print Type', icon: RiPrinterLine }, // inkjet / laser
      { label: 'Resolution', icon: RiPrinterLine },
      { label: 'Functions', icon: RiPrinterLine }, // print/scan/copy
      { label: 'Connectivity', icon: RiUsbLine },
    ],
  },

  [CATEGORY_PRODUCT.SCANNER]: {
    attributes: [{ label: 'Connection', icon: RiUsbLine }],
  },

  [CATEGORY_PRODUCT.WEBCAM]: {
    attributes: [
      { label: 'Resolution', icon: RiCameraLine },
      { label: 'Frame Rate', icon: RiCameraLine },
      { label: 'Connection', icon: RiUsbLine },
      { label: 'Microphone', icon: RiMicLine },
    ],
  },

  [CATEGORY_PRODUCT.MICROPHONE]: {
    attributes: [
      { label: 'Type', icon: RiMicLine },
      { label: 'Connection', icon: RiUsbLine },
      { label: 'Polar Pattern', icon: RiMicLine },
      { label: 'Frequency Response', icon: RiSoundModuleLine },
    ],
  },

  [CATEGORY_PRODUCT.STORAGE]: {
    attributes: [
      { label: 'Type', icon: MdOutlineStorage }, // SSD / HDD
      { label: 'Capacity', icon: RiSdCardMiniLine },
      { label: 'Interface', icon: RiUsbLine }, // USB 3.0 / NVMe
      { label: 'Read Speed', icon: MdOutlineStorage },
      { label: 'Write Speed', icon: MdOutlineStorage },
    ],
  },

  [CATEGORY_PRODUCT.RAM]: {
    attributes: [
      { label: 'Capacity', icon: RiRam2Line },
      { label: 'Type', icon: RiRam2Line }, // DDR4 / DDR5
      { label: 'Speed', icon: RiRam2Line },
      { label: 'Voltage', icon: RiRam2Line },
    ],
  },

  [CATEGORY_PRODUCT.GPU]: {
    attributes: [
      { label: 'Chipset', icon: RiComputerLine },
      { label: 'Memory', icon: RiRam2Line },
      { label: 'Memory Type', icon: RiRam2Line },
      { label: 'Ports', icon: RiUsbLine },
      { label: 'Cooling Type', icon: RiTempColdLine },
    ],
  },

  [CATEGORY_PRODUCT.CPU]: {
    attributes: [
      { label: 'Cores', icon: RiCpuLine },
      { label: 'Threads', icon: RiCpuLine },
      { label: 'Base Clock', icon: RiCpuLine },
      { label: 'Max Boost Clock', icon: RiCpuLine },
      { label: 'TDP', icon: RiTempColdLine },
    ],
  },

  [CATEGORY_PRODUCT.MOTHERBOARD]: {
    attributes: [
      { label: 'Socket Type', icon: RiCpuLine },
      { label: 'Chipset', icon: RiComputerLine },
      { label: 'Form Factor', icon: RiBox3Line },
      { label: 'RAM Slots', icon: RiRam2Line },
      { label: 'Ports', icon: RiUsbLine },
    ],
  },

  [CATEGORY_PRODUCT.PSU]: {
    attributes: [
      { label: 'Power Output', icon: MdOutlinePower },
      { label: 'Efficiency Rating', icon: MdOutlinePower },
      { label: 'Modular', icon: RiBox3Line },
    ],
  },

  [CATEGORY_PRODUCT.COOLING]: {
    attributes: [
      { label: 'Type', icon: RiTempColdLine }, // air / liquid
      { label: 'Fan Size', icon: RiTempColdLine },
      { label: 'Speed', icon: RiTempColdLine },
      { label: 'Noise Level', icon: RiTempColdLine },
    ],
  },

  [CATEGORY_PRODUCT.LAPTOP_BAG]: {
    attributes: [
      { label: 'Size', icon: RiBox3Line },
      { label: 'Material', icon: RiBox3Line },
      { label: 'Water Resistance', icon: RiBox3Line },
      { label: 'Color', icon: RiBox3Line },
    ],
  },

  [CATEGORY_PRODUCT.DOCKING]: {
    attributes: [
      { label: 'Ports', icon: RiUsbLine },
      { label: 'Power Delivery', icon: MdOutlinePower },
      { label: 'Compatibility', icon: RiComputerLine },
    ],
  },

  [CATEGORY_PRODUCT.SOFTWARE]: {
    attributes: [{ label: 'Platform', icon: RiComputerLine }],
  },

  [CATEGORY_PRODUCT.ACCESSORY]: {
    attributes: [
      { label: 'Type', icon: RiBox3Line },
      { label: 'Compatibility', icon: RiComputerLine },
      { label: 'Color', icon: RiBox3Line },
    ],
  },
}
