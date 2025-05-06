import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow, format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(timestamp: string, fullFormat = false): string {
  const date = parseISO(timestamp);
  
  if (fullFormat) {
    return format(date, 'MMM d, yyyy h:mm a');
  }

  // If less than 24 hours ago, show relative time (e.g., "2 hours ago")
  const now = new Date();
  const diffHours = Math.abs(now.getTime() - date.getTime()) / 3600000;
  
  if (diffHours < 24) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  
  // If in the current year, show month and day
  if (date.getFullYear() === now.getFullYear()) {
    return format(date, 'MMM d');
  }
  
  // Otherwise show month, day and year
  return format(date, 'MMM d, yyyy');
}

export function getChannelIcon(channel: string): string {
  switch (channel.toLowerCase()) {
    case 'email':
      return 'mail';
    case 'whatsapp':
      return 'message-circle';
    case 'widget':
      return 'message-square';
    default:
      return 'message-circle';
  }
}