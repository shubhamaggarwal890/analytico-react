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

const SubReddit = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    name: ''
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
          subheader="Reddit information"
          title="Information"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="SubReddit - MachineLearning/Python etc.."
            name="name"
            onChange={handleChange}
            value={values.name}
            variant="outlined"
          />
        </CardContent>
        <Divider />
      </form>
    </Card>
  );
};

SubReddit.propTypes = {
  className: PropTypes.string
};

export default SubReddit;
