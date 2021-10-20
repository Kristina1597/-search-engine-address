import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#4b3bfe',
            contrastText: '#ffffff',
            dark: '#2e21d2'
        },
        secondary: {
            main: '#e5eaf1',
            contrastText: '#000000',
            light: '#b6b8c3'
        },
    },
    typography: {
        fontFamily: `'Roboto', sans-serif`,
        fontSize: 14,

        body: {
            fontSize: 16,
            fontWeight: 400
        },
        button: {
            fontSize: 16,
            fontWeight: 700
        }
    },
    shape: {
        borderRadius: 10
    },
    spacing: 15,
    components: {
        MuiContainer: {
            styleOverrides:  {
                root: {
                    maxWidth: 'xl',

                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                }

            }
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: "white",

                },

            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    backgroundColor: "white",

                }
            }
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "uppercase",
                    padding: "10px 30px",
                    borderRadius: '10px'
                },
                fullWidth: {
                    maxWidth: "300px"
                }
            }
        },
    },

    props: {
        MuiButton: {
            disableRipple: true,
            variant: "contained",
            color: "primary",
        },
        MuiTextField: {
            variant: "outlined",
            InputLabelProps: {
                shrink: true
            }
        },
        MuiTypography: {
            variant: 'h2'
        }
    }
})