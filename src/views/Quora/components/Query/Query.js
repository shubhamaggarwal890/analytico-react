import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  TextField
} from '@material-ui/core';

const Query = props => {
  return (
    <Card>
      <form>
        <CardHeader
          subheader="Quora user information"
          title="Information"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Search Query/User Name"
            name="name"
            onChange={props.handleTextChange}
            value={props.query}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Question"
            name="question"
            onChange={props.handleTextChange}
            multiline
            style={{ marginTop: '1rem' }}
            value={props.question}
            variant="outlined"
          />
        </CardContent>
        <Divider />
      </form>
    </Card>
  );
};


export default Query;
