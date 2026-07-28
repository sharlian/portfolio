export type DeskMode = 'day' | 'night';

export function getDeskMode(date: Date): DeskMode {
  const minutes = date.getHours() * 60 + date.getMinutes();
  return minutes >= 7 * 60 && minutes <= 17 * 60 + 30 ? 'day' : 'night';
}
