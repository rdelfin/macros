/**
 * @format
 */

import React from "react";
import { WithStyles, withStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MacroCard from "./MacroCard";

const styles = (theme: Theme) => ({
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
});

interface Response {
    macros: Array<Macro>;
}

interface Macro {
    id: number;
    name: string;
}

interface Props extends WithStyles<typeof styles> {}
interface State {
    macros: Array<Macro>;
}

class MacroList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { macros: [] };
    }

    componentDidMount() {
        fetch("http://localhost:8000/macros")
            .then((response) => response.json())
            .then((data) => {
                console.log("Data: " + data);
                this.setState({
                    macros: data.macros,
                });
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={5}>
                        {this.state.macros.map((value) => (
                            <Grid key={value.name} item>
                                <MacroCard name={value.name} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles, { withTheme: true })(MacroList);
