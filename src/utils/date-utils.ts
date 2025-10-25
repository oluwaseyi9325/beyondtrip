import { format, parseISO } from "date-fns"

/**
 * Extract date from datetime string
 * @param dateString - ISO date string (e.g., "2025-07-15T23:00:00Z")
 * @param formatType - Format type for the output
 * @returns Formatted date string
 */
export function getDateOnly(dateString: string, formatType: "iso" | "readable" | "short" | "custom" = "iso"): string {
  const date = parseISO(dateString)

  switch (formatType) {
    case "iso":
      return format(date, "yyyy-MM-dd") // 2025-07-15
    case "readable":
      return format(date, "MMMM d, yyyy") // July 15, 2025
    case "short":
      return format(date, "MMM d, yyyy") // Jul 15, 2025
    case "custom":
      return format(date, "dd/MM/yyyy") // 15/07/2025
    default:
      return format(date, "yyyy-MM-dd")
  }
}

// Alternative: Simple function using native JavaScript (no dependencies)
export function getDateOnlyNative(dateString: string): string {
  return new Date(dateString).toISOString().split("T")[0]
}



export function formatTime(timeString:any) {
  const [h, m, s] = timeString.split(':');
  const date = new Date();
  date.setHours(h);
  date.setMinutes(m);
  date.setSeconds(s);
  return format(date, 'hh:mm a');
}