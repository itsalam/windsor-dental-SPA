import type { Hours, HoursInfo } from "~/store/client";

const SORTER = {
  sunday: 0, // << if sunday is first day of week
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  // "sunday": 7
};

export const sortHours = (hours: HoursInfo): [string, Hours][] => {
  return Object.entries(hours)
    .filter(([key]) => key.includes("day"))
    .sort(([keyA], [keyB]) => SORTER[keyA] - SORTER[keyB]);
};

export const writeDay = (day: string): string => {
  return day.slice(0, 1).toUpperCase() + day.slice(1, 3);
};

export const writeHours = (hours: Hours, addSuffix: boolean = true): string => {
  if (hours.closed) return "Closed";
  const convertToTime = (time: number | string) => {
    if (typeof time === "string") {
      const hour = parseInt(time.slice(0, 2));
      const minute = time.slice(3, 5);
      return `${hour > 12 ? hour - 12 : hour}:${minute}`;
    }
    let suffix = addSuffix ? "pm" : "";
    if (time > 12) return time - 12 + suffix;
    if (time == 12) return time + suffix;
    suffix = addSuffix ? "am" : "";
    if (time == 0) return 12 + suffix;
    return time + suffix;
  };
  return convertToTime(hours.from) + " - " + convertToTime(hours.to);
};

export const isPortrait = () => {
  return window.innerHeight > window.innerWidth;
};
