/**
 * @format
 */

import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import MacroCard from "./MacroCard";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function App() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Container maxWidth="sm">
            <MacroCard></MacroCard>
        </Container>
    );
}

export default App;
