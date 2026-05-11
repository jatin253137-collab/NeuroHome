export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function jitter(value, amount, min, max, precision = 1) {
  const next = value + (Math.random() - 0.5) * amount;
  const fixed = Number(next.toFixed(precision));
  return clamp(fixed, min, max);
}

export function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function getReadableTime(date = new Date()) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function percentage(value) {
  return `${Math.round(value)}%`;
}
