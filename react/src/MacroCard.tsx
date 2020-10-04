/**
 * @format
 */

import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

const styles = createStyles({
    root: {
        minWidth: 275,
    },
    media: {
        minHeight: 140,
        maxHeight: 300,
    },
    bottom_action: {
        padding: 15,
    },
});

interface Props extends WithStyles<typeof styles> {
    name: string;
}

function MacroCard(props: Props) {
    const { classes, name } = props;

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={"http://localhost:8000/macro/" + name}
                    title={name}
                />
            </CardActionArea>
            <CardActionArea className={classes.bottom_action}>
                <Typography variant="h5" component="h5">
                    {name}
                </Typography>
            </CardActionArea>
        </Card>
    );
}

export default withStyles(styles)(MacroCard);
