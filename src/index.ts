import { redFromArgb, greenFromArgb, blueFromArgb} from '@material/material-color-utilities';

/**
 * @param argb ARGB representation of a color.
 * @return ARGB string representing color, ex. "255, 0, 0" for red.
 */
function argbStringFromArgb(argb: any) {
    const r = redFromArgb(argb);
    const g = greenFromArgb(argb);
    const b = blueFromArgb(argb);
    return [r, g, b].join(', ');
}

function setSchemeProperties(target: any, scheme: any, suffix = '') {
    for (const [key, value] of Object.entries(scheme.toJSON())) {
        const token = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        const color = argbStringFromArgb(value);
        target.style.setProperty(`--mdui-color-${token}${suffix}`, color);
    }
}

/**
 * Apply a theme to an element
 *
 * @param theme Theme object
 * @param options Options
 */
export function mduiApplyTheme(theme: any, options?: {
    dark?: boolean;
    target?: HTMLElement;
    brightnessSuffix?: boolean;
}) {
    const target = options?.target || document.body;
    const isDark = options?.dark ?? false;
    const scheme = isDark ? theme.schemes.dark : theme.schemes.light;
    setSchemeProperties(target, scheme);
    if (options?.brightnessSuffix) {
        setSchemeProperties(target, theme.schemes.dark, '-dark');
        setSchemeProperties(target, theme.schemes.light, '-light');
    }
}


// 导出原始工具，以便用户需要时可以访问
export * from '@material/material-color-utilities';