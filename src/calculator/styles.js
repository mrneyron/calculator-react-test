import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 12,
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    paddingRight: 0,
  },
  container: {
    margin: -10,
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
  },
}));