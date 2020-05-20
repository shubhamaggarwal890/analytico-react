import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  TextField
} from '@material-ui/core';

const Hashtag = props => {

  return (
    <Card>
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
            onChange={props.handleTextChange}
            value={props.screen_name}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Hashtags"
            name="hashtag"
            onChange={props.handleTextChange}
            style={{ marginTop: '1rem' }}
            value={props.hashtag_data}
            variant="outlined"
          />
        </CardContent>
        <Divider />
      </form>
    </Card>
  );
};

export default Hashtag;
