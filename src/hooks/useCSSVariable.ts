import { useEffect, useState } from "react";

/**
 * Hook to get the value of a CSS variable
 * @param {string} variableName - CSS variable name (with or without --)
 * @param {HTMLElement} [element=document.body] - Element to read the variable from
 * @returns {string} The value of the CSS variable
 */
export function useCSSVariable(
  variableName: string,
  element: HTMLElement = document.body
) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const updateValue = () => {
      // Ensure variable name starts with --
      const normalizedName = variableName.startsWith("--")
        ? variableName
        : `--${variableName}`;

      const computedValue = getComputedStyle(element)
        .getPropertyValue(normalizedName)
        .trim();

      setValue(computedValue);
    };

    // Initial value
    updateValue();

    // Watch for class changes on the element (theme changes)
    const observer = new MutationObserver(updateValue);
    observer.observe(element, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [variableName, element]);

  return value;
}

/**
 * Hook to get multiple CSS variables at once
 * @param {string[]} variableNames - Array of CSS variable names
 * @param {HTMLElement} [element=document.body] - Element to read the variables from
 * @returns {Object} Object with variable names as keys and their values
 */
export function useCSSVariables<T extends readonly string[]>(
  variableNames: T,
  element: HTMLElement = document.body
): Record<T[number], string> {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateValues = () => {
      const styles = getComputedStyle(element);
      const computedValues: Record<string, string> = {};

      variableNames.forEach((name) => {
        const normalizedName = name.startsWith("--") ? name : `--${name}`;
        computedValues[name] = styles.getPropertyValue(normalizedName).trim();
      });

      setValues(computedValues);
    };

    // Initial values
    updateValues();

    // Watch for class changes on the element (theme changes)
    const observer = new MutationObserver(updateValues);
    observer.observe(element, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return values as Record<T[number], string>;
}
