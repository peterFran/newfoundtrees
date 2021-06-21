import { createMuiTheme } from '@material-ui/core/styles'

const defaultTheme = createMuiTheme({ spacing: 5 })

export const COLORS = {
    NFPurple: '#9A3EE0',
    NFDeepPurple: '#8147AE',
    NFSmokeOnTheWater: '#2D0D45',
    NFSkin: '#EFBDD5',
    NFZing: '#71F909',
    NFTeal: '#95EEC8',
    NFBehindTheVeil: 'rgba(255, 255, 255, 0.7)',
    NFTypeWriter: '#2F3542',
    NFWhite: 'white'
}



    // primary: '#2D0D45',
    // secondary: '#9A3EE0',
    // error: '#E76049',
    // text: '#2F3542',
    // textSecondary: 'rgba(47, 53, 66, 0.5)',
    // textSecondary: 'rgba(255, 255, 255, 0.7)',
    // background: 'white',
    // border: '#DADCE0',
    // disabled: '#D5DCDC',
const theme = createMuiTheme({
    palette: {
        primary: {
            dark: COLORS.NFSmokeOnTheWater,
            main: COLORS.NFPurple,
            light: COLORS.NFSkin
        },
        secondary: {
            main: COLORS.NFTeal,
            light: COLORS.NFZing
        },
        // error: {
        //     main: COLORS.error,
        // },
        text: {
            primary: COLORS.NFSmokeOnTheWater,
            secondary: COLORS.NFBehindTheVeil,
            hint: COLORS.NFDeepPurple
            // disabled: COLORS.disabled,
        },
        background: {
            default: COLORS.NFWhite,
        },
        // action: {
        //     active: COLORS.textSecondary,
        // },
        // divider: COLORS.border,
    },
    // TODO: investigate shadow usage
    typography: {
        fontFamily: ['Mulish', 'sans-serif'].join(','),
        h1: {
            lineHeight: 1,
            fontWeight: 900,
            fontSize: 48,
        },
        h2: {
            fontSize: 29,
            fontWeight: 900,
            lineHeight: 1.2,
            letterSpacing: 0,
        },
        h3: {
            fontSize: 25,
            fontWeight: 900,
            lineHeight: 1.2,
            letterSpacing: 0,
        },
        h4: {
            fontSize: 20,
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: 0,
        },
        h5: {
            fontSize: 17,
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: 0,
            textTransform: "uppercase"
        },
        h6: {
            fontSize: 15,
            fontWeight: 900,
            lineHeight: 1.2,
            // letterSpacing: 0,
        },

        body1: {
            letterSpacing: 0,
            fontSize: 13,
            fontWeight: 300,
        },
        body2: {
            fontSize: 11,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: 0,
            // color: theme.palette.
        },
        overline: {
            fontSize: 12,
            fontWeight: 'bold',
            lineHeight: 1.3,
        },
        button: {
            fontSize: 14,
            textTransform: 'uppercase',
            fontWeight: 900,
            lineHeight: 1.3,
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
                    borderColor: COLORS.NFSkin,
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
                padding: '10px 35px',
                
                '&$disabled': {
                    color: '#fff',
                    backgroundColor: COLORS.NFSkin,
                },
                borderRadius: 20
            },
        },
        MuiFilledInput: {
            root: {
                backgroundColor: '#fff',
                border: `1px solid ${COLORS.NFDeepPurple}`,
                borderRadius: 5,
                transition: defaultTheme.transitions.create(['border-color']),
                '&:hover': {
                    backgroundColor: '#fff',
                    borderColor: COLORS.NFTeal,
                },
                '&$focused': {
                    backgroundColor: '#fff',
                    borderColor: COLORS.NFTeal,
                    boxShadow: `0 0 0 1px ${COLORS.NFTeal}`,
                },
                '&$error': {
                    borderColor: COLORS.NFSkin,
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
