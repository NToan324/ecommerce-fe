import { format, formatDistance } from 'date-fns'

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price).replace('₫', 'VND')
}

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

export const formatDatePattern = (date: Date) => {
  return format(date, 'yyyy-MM-dd')
}

export const formatDateTime = (date: Date) => {
  return date.toISOString().split('T')[0]
}

export const convertStringToDate = (dateString: string) => {
  return format(new Date(dateString), 'dd/MM/yyyy')
}

export const convertByteToMB = (bytes: number) => {
  if (typeof bytes === 'number') {
    return (bytes / 1048576).toFixed(2)
  }
  return bytes
}

export const formatDateWithSuffix = (date: string) => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true })
}

export const formatTimeSecondToMinute = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
