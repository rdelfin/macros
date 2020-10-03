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

function MacroCard(props: WithStyles<typeof styles>) {
    const { classes } = props;

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://filmdaily.co/wp-content/uploads/2020/07/2020meme-01-2.jpg"
                    title="Macro"
                />
            </CardActionArea>
            <CardActionArea className={classes.bottom_action}>
                <Typography variant="h5" component="h5">
                    Macro Name
                </Typography>
            </CardActionArea>
        </Card>
    );
}

export default withStyles(styles)(MacroCard);
