/**
 * @format
 */

import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MacroCard from "./MacroCard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            height: 140,
            width: 100,
        },
        control: {
            padding: theme.spacing(2),
        },
    })
);

function MacroList() {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={5}>
                    {Array.from(Array(5).keys()).map((value) => (
                        <Grid key={value} item>
                            <MacroCard />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MacroList;
