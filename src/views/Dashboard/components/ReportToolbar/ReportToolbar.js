import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {},
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    spacer: {
        flexGrow: 1
    },
    importButton: {
        marginRight: theme.spacing(1)
    },
}));

const ReportToolbar = props => {
    const { className, ...rest } = props;

    const classes = useStyles();

    return (
        <div
            {...rest}
            className={clsx(classes.root, className)}
        >
            <div className={classes.row}>
                <span className={classes.spacer} />
                {
                    props.target === 'twitter' ?
                        <Button className={classes.importButton} color="primary" onClick={() => props.handleReportClick("twitter")}>Twitter</Button> :
                        <Button className={classes.importButton} onClick={() => props.handleReportClick("twitter")}>Twitter</Button>
                }

                {
                    props.target === 'facebook' ?
                        <Button className={classes.importButton} color="primary" onClick={() => props.handleReportClick("facebook")}>Facebook</Button> :
                        <Button className={classes.importButton} onClick={() => props.handleReportClick("facebook")}>Facebook</Button>
                }

                {
                    props.target === 'reddit' ?
                        <Button className={classes.importButton} color="primary" onClick={() => props.handleReportClick("reddit")}>Reddit</Button> :
                        <Button className={classes.importButton} onClick={() => props.handleReportClick("reddit")}>Reddit</Button>
                }

                {
                    props.target === 'quora' ?
                        <Button className={classes.importButton} color="primary" onClick={() => props.handleReportClick("quora")}>Quora</Button> :
                        <Button className={classes.importButton} onClick={() => props.handleReportClick("quora")}>Quora</Button>
                }
            </div>
        </div>
    );
};

export default ReportToolbar;
