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

const Hashtag = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    name: '',
    hashtag: ''
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
          subheader="Twitter user information"
          title="Information"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Screen Name"
            name="name"
            onChange={handleChange}
            value={values.name}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Hashtags"
            name="hashtag"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            value={values.hashtag}
            variant="outlined"
          />
        </CardContent>
        <Divider />
      </form>
    </Card>
  );
};

Hashtag.propTypes = {
  className: PropTypes.string
};

export default Hashtag;
