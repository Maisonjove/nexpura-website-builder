export interface ThemeSettings {
  primaryColor: string
  accentColor: string
  headingFont: string
  bodyFont: string
  borderRadius: 'sharp' | 'soft' | 'round'
}

export const DEFAULT_THEME: ThemeSettings = {
  primaryColor: '#1a2e1a',
  accentColor: '#52B788',
  headingFont: 'Playfair Display',
  bodyFont: 'Inter',
  borderRadius: 'soft',
}

export function borderRadiusValue(style: ThemeSettings['borderRadius']): string {
  switch (style) {
    case 'sharp': return '0px'
    case 'soft': return '8px'
    case 'round': return '9999px'
  }
}

export function generateCssVariables(theme: ThemeSettings): string {
  return `
    :root {
      --color-primary: ${theme.primaryColor};
      --color-accent: ${theme.accentColor};
      --font-heading: '${theme.headingFont}', serif;
      --font-body: '${theme.bodyFont}', sans-serif;
      --border-radius: ${borderRadiusValue(theme.borderRadius)};
    }
  `
}

export function themeToInlineStyles(theme: ThemeSettings): React.CSSProperties {
  return {
    '--primary': theme.primaryColor,
    '--accent': theme.accentColor,
    fontFamily: `'${theme.bodyFont}', sans-serif`,
  } as React.CSSProperties
}
