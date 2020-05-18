import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const PageName = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    page_name: '',
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="Page Name"
          title="Facebook Information"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Page Name"
            name="page_name"
            onChange={handleChange}
            value={values.page_name}
            variant="outlined"
          />
        </CardContent>
        <Divider />
      </form>
    </Card>
  );
};

PageName.propTypes = {
  className: PropTypes.string
};

export default PageName;
