import { createMuiTheme } from '@material-ui/core/styles'

const defaultTheme = createMuiTheme({ spacing: 5 })

export const COLORS = {
    primary: '#367560',
    secondary: '#F4D54B',
    error: '#E76049',
    text: '#2F3542',
    textSecondary: 'rgba(47, 53, 66, 0.5)',
    background: 'white',
    border: '#DADCE0',
    disabled: '#D5DCDC',
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: COLORS.primary,
            light: '#02B875',
        },
        secondary: {
            main: COLORS.secondary,
        },
        error: {
            main: COLORS.error,
        },
        text: {
            primary: COLORS.text,
            secondary: COLORS.textSecondary,
            disabled: COLORS.disabled,
        },
        background: {
            default: COLORS.background,
        },
        action: {
            active: COLORS.textSecondary,
        },
        divider: COLORS.border,
    },
    // TODO: investigate shadow usage
    typography: {
        fontFamily: ['"sofia-pro"', 'Arial', 'sans-serif'].join(','),
        h1: {
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: 0,
        },
        h2: {
            fontSize: 32,
            fontWeight: 900,
            lineHeight: 1.2,
            letterSpacing: 0,
        },
        h3: {
            fontSize: 24,
            fontWeight: 900,
            lineHeight: 1.2,
            letterSpacing: 0,
        },
        h4: {
            fontSize: 16,
            fontWeight: 900,
            lineHeight: 1.2,
            letterSpacing: 0,
        },
        body1: {
            letterSpacing: 0,
        },
        body2: {
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: 0,
        },
        overline: {
            fontSize: 12,
            fontWeight: 'bold',
            lineHeight: 1.3,
        },
        button: {
            fontSize: '1rem',
            textTransform: 'none',
            fontWeight: 'bold',
            letterSpacing: 0,
        },
    },
    spacing: 5,
    shape: {
        borderRadius: 5,
    },
    overrides: {
        MuiContainer: {
            root: {
                paddingLeft: defaultTheme.spacing(6),
                paddingRight: defaultTheme.spacing(6),
                [defaultTheme.breakpoints.up('sm')]: {
                    paddingLeft: defaultTheme.spacing(6),
                    paddingRight: defaultTheme.spacing(6),
                },
                [defaultTheme.breakpoints.up('md')]: {
                    paddingLeft: defaultTheme.spacing(10),
                    paddingRight: defaultTheme.spacing(10),
                    // marginTop: defaultTheme.spacing(10)
                },
            },
        },
        MuiIconButton: {
            root: {
                padding: '5px',
            },
        },
        MuiButton: {
            root: {
                padding: '11px 22px',
                '&:hover': {
                    color: '#fff',
                    borderColor: COLORS.secondary,
                },
            },
            outlined: {
                padding: '10px 22px',
            },
            sizeSmall: {
                padding: '9px 10px',
                boxShadow: 'none',
            },
            text: {
                fontWeight: 'normal',
            },
            contained: {
                '&$disabled': {
                    color: '#fff',
                    backgroundColor: COLORS.disabled,
                },
            },
        },
        MuiFilledInput: {
            root: {
                backgroundColor: '#fff',
                border: `1px solid ${COLORS.border}`,
                borderRadius: 5,
                transition: defaultTheme.transitions.create(['border-color']),
                '&:hover': {
                    backgroundColor: '#fff',
                    borderColor: COLORS.secondary,
                },
                '&$focused': {
                    backgroundColor: '#fff',
                    borderColor: COLORS.secondary,
                    boxShadow: `0 0 0 1px ${COLORS.secondary}`,
                },
                '&$error': {
                    borderColor: COLORS.error,
                },
                // "& input:valid": {
                //   color: "#367560",
                // },
            },
            input: {
                boxSizing: 'border-box',
                height: 50,
            },
        },
        MuiOutlinedInput: {
            root: {
                backgroundColor: '#fff',
                '&:hover $notchedOutline': {
                    borderColor: COLORS.secondary,
                },
                '&$focused $notchedOutline': {
                    borderColor: COLORS.secondary,
                },
                '& input:valid + fieldset, & input:valid + div + fieldset': {
                    borderColor: COLORS.primary,
                },
            },
            input: {
                boxSizing: 'border-box',
                height: 50,
                padding: '18px 14px 10px',
            },
            notchedOutline: {
                top: 0,
                borderColor: COLORS.border,
                '& legend': {
                    display: 'none',
                },
            },
        },
        MuiInputLabel: {
            outlined: {
                '&$shrink': {
                    transform: 'translate(14px, 6px) scale(0.75)',
                },
            },
        },
        MuiFormControl: {
            marginNormal: {
                marginTop: defaultTheme.spacing(2),
                marginBottom: defaultTheme.spacing(1),
            },
        },
        MuiFormLabel: {
            root: {
                '&$focused': {
                    color: COLORS.textSecondary,
                },
            },
        },
        MuiPaper: {
            rounded: {
                borderRadius: 10,
            },
        },
        MuiCardContent: {
            root: {
                padding: defaultTheme.spacing(3),
                '&:last-child': {
                    paddingBottom: defaultTheme.spacing(3),
                },
            },
        },
        MuiTypography: {
            gutterBottom: {
                marginBottom: defaultTheme.spacing(1),
            },
        },
        MuiDialog: {
            paper: {
                margin: defaultTheme.spacing(3),
            },
            paperFullWidth: {
                width: 'calc(100% - 30px)',
            },
            paperScrollPaper: {
                maxHeight: 'calc(100% - 30px)',
            },
        },
        MuiTable: {
            root: {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                overflow: 'hidden',
            },
        },
        MuiTableHead: {
            root: {
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
            },
        },
        MuiTableCell: {
            root: {
                fontSize: 16,
                padding: defaultTheme.spacing(2),
                borderBottom: '1px solid rgba(47, 53, 66, 0.11)',
            },
            head: {
                fontSize: 12,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: COLORS.textSecondary,
                borderBottom: 'none',
            },
        },
    },
    props: {
        MuiFilledInput: {
            disableUnderline: true,
        },
        MuiCheckbox: {
            color: 'primary',
        },
        MuiPopover: {
            elevation: 2,
        },
        MuiDialog: {
            PaperProps: {
                elevation: 0,
            },
        },
    },
})

export default theme
