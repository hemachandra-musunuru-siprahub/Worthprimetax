/**
 * Grid classes for service card grids: five cards a row on large screens. From 1440px the grid
 * runs a little wider than the text column so each card is wide enough to stay square.
 * Phones (max-sm) get two compact cards a row.
 */
export const SERVICE_GRID =
  "grid gap-5 max-sm:grid-cols-2 max-sm:gap-3 sm:grid-cols-2 lg:grid-cols-5 min-[1440px]:-mx-[110px]";
