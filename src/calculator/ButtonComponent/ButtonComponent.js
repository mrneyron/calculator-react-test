import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/styles';

import { useStyles, theme } from './styles';

const ButtonComponent = (props) => {
  const {
    text = "1",
    xs = 3,
    handleClick = () => false,
    color = "default",
  } = props;

  const classes = useStyles();

  return (
    <Grid item xs={xs}>
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <Button
            fullWidth
            className={classes.button}
            onClick={handleClick}
            variant="contained"
            color={color}
          >
            {text}
          </Button>
        </ThemeProvider>
      </div>
    </Grid>
  );
}
export default ButtonComponent;
