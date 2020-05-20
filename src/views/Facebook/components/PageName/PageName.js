import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  TextField
} from '@material-ui/core';

const PageName = props => {

  return (
    <Card>
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
            onChange={props.handlePageChange}
            value={props.page_name}
            variant="outlined"
          />
        </CardContent>
        <Divider />
      </form>
    </Card>
  );
};

export default PageName;
