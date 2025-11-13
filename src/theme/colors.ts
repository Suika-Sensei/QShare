import { useCSSVariable, useCSSVariables } from "../hooks/useCSSVariable";
import { useMemo } from "react";

/**
 * Material Design 3 Color Token Names
 * These correspond to CSS variables defined in the theme
 */
export const MD3_COLOR = {
  // Primary colors
  PRIMARY: "--md-sys-color-primary",
  SURFACE_TINT: "--md-sys-color-surface-tint",
  ON_PRIMARY: "--md-sys-color-on-primary",
  PRIMARY_CONTAINER: "--md-sys-color-primary-container",
  ON_PRIMARY_CONTAINER: "--md-sys-color-on-primary-container",

  // Secondary colors
  SECONDARY: "--md-sys-color-secondary",
  ON_SECONDARY: "--md-sys-color-on-secondary",
  SECONDARY_CONTAINER: "--md-sys-color-secondary-container",
  ON_SECONDARY_CONTAINER: "--md-sys-color-on-secondary-container",

  // Tertiary colors
  TERTIARY: "--md-sys-color-tertiary",
  ON_TERTIARY: "--md-sys-color-on-tertiary",
  TERTIARY_CONTAINER: "--md-sys-color-tertiary-container",
  ON_TERTIARY_CONTAINER: "--md-sys-color-on-tertiary-container",

  // Error colors
  ERROR: "--md-sys-color-error",
  ON_ERROR: "--md-sys-color-on-error",
  ERROR_CONTAINER: "--md-sys-color-error-container",
  ON_ERROR_CONTAINER: "--md-sys-color-on-error-container",

  // Background colors
  BACKGROUND: "--md-sys-color-background",
  ON_BACKGROUND: "--md-sys-color-on-background",

  // Surface colors
  SURFACE: "--md-sys-color-surface",
  ON_SURFACE: "--md-sys-color-on-surface",
  SURFACE_VARIANT: "--md-sys-color-surface-variant",
  ON_SURFACE_VARIANT: "--md-sys-color-on-surface-variant",

  // Outline colors
  OUTLINE: "--md-sys-color-outline",
  OUTLINE_VARIANT: "--md-sys-color-outline-variant",

  // Shadow and scrim
  SHADOW: "--md-sys-color-shadow",
  SCRIM: "--md-sys-color-scrim",

  // Inverse colors
  INVERSE_SURFACE: "--md-sys-color-inverse-surface",
  INVERSE_ON_SURFACE: "--md-sys-color-inverse-on-surface",
  INVERSE_PRIMARY: "--md-sys-color-inverse-primary",

  // Fixed colors
  PRIMARY_FIXED: "--md-sys-color-primary-fixed",
  ON_PRIMARY_FIXED: "--md-sys-color-on-primary-fixed",
  PRIMARY_FIXED_DIM: "--md-sys-color-primary-fixed-dim",
  ON_PRIMARY_FIXED_VARIANT: "--md-sys-color-on-primary-fixed-variant",

  SECONDARY_FIXED: "--md-sys-color-secondary-fixed",
  ON_SECONDARY_FIXED: "--md-sys-color-on-secondary-fixed",
  SECONDARY_FIXED_DIM: "--md-sys-color-secondary-fixed-dim",
  ON_SECONDARY_FIXED_VARIANT: "--md-sys-color-on-secondary-fixed-variant",

  TERTIARY_FIXED: "--md-sys-color-tertiary-fixed",
  ON_TERTIARY_FIXED: "--md-sys-color-on-tertiary-fixed",
  TERTIARY_FIXED_DIM: "--md-sys-color-tertiary-fixed-dim",
  ON_TERTIARY_FIXED_VARIANT: "--md-sys-color-on-tertiary-fixed-variant",

  // Surface variants
  SURFACE_DIM: "--md-sys-color-surface-dim",
  SURFACE_BRIGHT: "--md-sys-color-surface-bright",
  SURFACE_CONTAINER_LOWEST: "--md-sys-color-surface-container-lowest",
  SURFACE_CONTAINER_LOW: "--md-sys-color-surface-container-low",
  SURFACE_CONTAINER: "--md-sys-color-surface-container",
  SURFACE_CONTAINER_HIGH: "--md-sys-color-surface-container-high",
  SURFACE_CONTAINER_HIGHEST: "--md-sys-color-surface-container-highest",
} as const;

/**
 * Type for MD3 color values
 */
export type MD3ColorTokens = typeof MD3_COLOR;
export type MD3ColorToken = MD3ColorTokens[keyof MD3ColorTokens];

/**
 * Hook to get a single MD3 color value
 * @param token - The color token name
 * @returns The RGB color value as a string
 *
 * @example
 * const primaryColor = useMD3Color(MD3_COLOR.PRIMARY);
 * // Returns: "rgb(101 85 143)"
 */
export function useMD3Color(token: MD3ColorToken): string {
  return useCSSVariable(token);
}

/**
 * Hook to get all MD3 theme colors at once
 * @returns Object with all MD3 color values
 *
 * @example
 * const colors = useMD3Colors();
 * console.log(colors.primary); // "rgb(101 85 143)"
 */
export function useMD3Colors() {
  const colorTokens = useMemo(() => Object.values(MD3_COLOR), []);
  const colorValues = useCSSVariables(colorTokens);

  return useMemo(() => ({
    // Primary
    primary: colorValues[MD3_COLOR.PRIMARY],
    surfaceTint: colorValues[MD3_COLOR.SURFACE_TINT],
    onPrimary: colorValues[MD3_COLOR.ON_PRIMARY],
    primaryContainer: colorValues[MD3_COLOR.PRIMARY_CONTAINER],
    onPrimaryContainer: colorValues[MD3_COLOR.ON_PRIMARY_CONTAINER],

    // Secondary
    secondary: colorValues[MD3_COLOR.SECONDARY],
    onSecondary: colorValues[MD3_COLOR.ON_SECONDARY],
    secondaryContainer: colorValues[MD3_COLOR.SECONDARY_CONTAINER],
    onSecondaryContainer: colorValues[MD3_COLOR.ON_SECONDARY_CONTAINER],

    // Tertiary
    tertiary: colorValues[MD3_COLOR.TERTIARY],
    onTertiary: colorValues[MD3_COLOR.ON_TERTIARY],
    tertiaryContainer: colorValues[MD3_COLOR.TERTIARY_CONTAINER],
    onTertiaryContainer: colorValues[MD3_COLOR.ON_TERTIARY_CONTAINER],

    // Error
    error: colorValues[MD3_COLOR.ERROR],
    onError: colorValues[MD3_COLOR.ON_ERROR],
    errorContainer: colorValues[MD3_COLOR.ERROR_CONTAINER],
    onErrorContainer: colorValues[MD3_COLOR.ON_ERROR_CONTAINER],

    // Background
    background: colorValues[MD3_COLOR.BACKGROUND],
    onBackground: colorValues[MD3_COLOR.ON_BACKGROUND],

    // Surface
    surface: colorValues[MD3_COLOR.SURFACE],
    onSurface: colorValues[MD3_COLOR.ON_SURFACE],
    surfaceVariant: colorValues[MD3_COLOR.SURFACE_VARIANT],
    onSurfaceVariant: colorValues[MD3_COLOR.ON_SURFACE_VARIANT],

    // Outline
    outline: colorValues[MD3_COLOR.OUTLINE],
    outlineVariant: colorValues[MD3_COLOR.OUTLINE_VARIANT],

    // Shadow and scrim
    shadow: colorValues[MD3_COLOR.SHADOW],
    scrim: colorValues[MD3_COLOR.SCRIM],

    // Inverse
    inverseSurface: colorValues[MD3_COLOR.INVERSE_SURFACE],
    inverseOnSurface: colorValues[MD3_COLOR.INVERSE_ON_SURFACE],
    inversePrimary: colorValues[MD3_COLOR.INVERSE_PRIMARY],

    // Primary fixed
    primaryFixed: colorValues[MD3_COLOR.PRIMARY_FIXED],
    onPrimaryFixed: colorValues[MD3_COLOR.ON_PRIMARY_FIXED],
    primaryFixedDim: colorValues[MD3_COLOR.PRIMARY_FIXED_DIM],
    onPrimaryFixedVariant: colorValues[MD3_COLOR.ON_PRIMARY_FIXED_VARIANT],

    // Secondary fixed
    secondaryFixed: colorValues[MD3_COLOR.SECONDARY_FIXED],
    onSecondaryFixed: colorValues[MD3_COLOR.ON_SECONDARY_FIXED],
    secondaryFixedDim: colorValues[MD3_COLOR.SECONDARY_FIXED_DIM],
    onSecondaryFixedVariant: colorValues[MD3_COLOR.ON_SECONDARY_FIXED_VARIANT],

    // Tertiary fixed
    tertiaryFixed: colorValues[MD3_COLOR.TERTIARY_FIXED],
    onTertiaryFixed: colorValues[MD3_COLOR.ON_TERTIARY_FIXED],
    tertiaryFixedDim: colorValues[MD3_COLOR.TERTIARY_FIXED_DIM],
    onTertiaryFixedVariant: colorValues[MD3_COLOR.ON_TERTIARY_FIXED_VARIANT],

    // Surface variants
    surfaceDim: colorValues[MD3_COLOR.SURFACE_DIM],
    surfaceBright: colorValues[MD3_COLOR.SURFACE_BRIGHT],
    surfaceContainerLowest: colorValues[MD3_COLOR.SURFACE_CONTAINER_LOWEST],
    surfaceContainerLow: colorValues[MD3_COLOR.SURFACE_CONTAINER_LOW],
    surfaceContainer: colorValues[MD3_COLOR.SURFACE_CONTAINER],
    surfaceContainerHigh: colorValues[MD3_COLOR.SURFACE_CONTAINER_HIGH],
    surfaceContainerHighest: colorValues[MD3_COLOR.SURFACE_CONTAINER_HIGHEST],
  }), [colorValues]);
}

/**
 * Hook to get a subset of MD3 colors
 * @param tokens - Array of color token names
 * @returns Object with requested color values
 *
 * @example
 * const colors = useSelectedMD3Colors([
 *   MD3_COLOR.PRIMARY,
 *   MD3_COLOR.SURFACE,
 *   MD3_COLOR.ON_SURFACE
 * ] as const);
 * // Access: colors[MD3_COLOR.PRIMARY]
 */
export function useSelectedMD3Colors<T extends readonly MD3ColorToken[]>(
  tokens: T
): Record<T[number], string> {
  return useCSSVariables(tokens);
}
