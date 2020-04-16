import { createMuiTheme } from '@material-ui/core/styles';

import colors from '../styles/colors.scss';

const defaultTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: colors.primary,
            contrastText: colors.text,
        },
        secondary: {
            main: colors.secondary,
            contrastText: colors.text,
        },
        // contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        // tonalOffset: 0.2,
        background: colors.background,
        warning: {
            main: colors.error,
        },
    },
});

export { defaultTheme };
