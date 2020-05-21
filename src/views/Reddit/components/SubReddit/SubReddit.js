import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  TextField
} from '@material-ui/core';

const SubReddit = props => {
  return (
    <Card>
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
            onChange={props.handleTextChange}
            value={props.subreddit}
            variant="outlined"
          />
        </CardContent>
        <Divider />
      </form>
    </Card>
  );
};

export default SubReddit;
