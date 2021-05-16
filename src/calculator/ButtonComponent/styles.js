import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: '#adadad',
    },
    default: {
      main: '#e3f2fd',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        margin: 0,
      }
    },
  },
  button: {
    [theme.breakpoints.down('xs')]: {
      padding: '6px 4px',
      minWidth: 40,
      width: 44,
    },
  }
}));