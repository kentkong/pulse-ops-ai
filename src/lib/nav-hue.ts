export type NavHue =
  | "snowflake"
  | "lifecycle"
  | "hightouch"
  | "braze"
  | "events"
  | "architecture"
  | "stack";

export const navHueClass = {
  snowflake: "nav-hue--snowflake",
  lifecycle: "nav-hue--lifecycle",
  hightouch: "nav-hue--hightouch",
  braze: "nav-hue--braze",
  events: "nav-hue--events",
  architecture: "nav-hue--architecture",
  stack: "nav-hue--stack",
} as const;

/** One distinct hue per nav destination */
export const navItemHues: Record<string, NavHue> = {
  "/": "snowflake",
  "/lifecycle": "lifecycle",
  "/workflows": "hightouch",
  "/insights": "braze",
  "/events": "events",
  "/architecture": "architecture",
};

export function getNavHue(pathname: string): NavHue {
  if (pathname === "/") return "snowflake";
  const match = Object.entries(navItemHues).find(
    ([href]) => href !== "/" && pathname.startsWith(href)
  );
  return match?.[1] ?? "snowflake";
}
