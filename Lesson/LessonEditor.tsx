import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Lesson from 'src/Lesson/Lesson';
import TextField from '@material-ui/core/TextField';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { FormControl, InputAdornment} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Email';

// This Component allows you to add and edit lessons

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: 8,
        height: 40,
    },
    button: {
        margin: theme.spacing.unit,
    },
    cssLabel: {
        transform: 'translate(14px,14px)'
    }
});
@inject('LessonController')
@observer
class LessonEditor extends React.Component<any, any, WithStyles<typeof styles>>{

    constructor(props: any) {
        super(props);
        this.state = {
            usersArray: [],
            name: '',
            email: ''
        }
    }
    public componentWillMount() {
        this.props.LessonController.loadData('/persons');
    }
    public onChangeName = (e: any) => {
        this.setState({ name: e.target.value });
        console.log(e.target.value);
    }
    public onChangeEmail = (e: any) => {
        this.setState({ email: e.target.value })
    }
    public submit = (e: any) => {
        console.log("ID Bazy", this.props.LessonController.usersLenght + 1);
        const arr = {
            id: this.props.LessonController.usersLenght + 1,
            name: this.state.name,
            password: 'test',
            email: this.state.email
        }
        this.props.LessonController.addItem(arr);
        this.props.libary.addNewItem(arr, '/learn-users-update');
        this.setState({ name: '', email: '' })

        e.preventDefault();
    }
    public render() {
        const { classes } = this.props;
        return (
            <div>
                <br />
                <FormControl >
                    {/* <input type="text" name="name" value={this.state.name} placeholder="Enter name" onChange={this.onChangeName} />
                    <input type="textarea" name="email" value={this.state.email} placeholder="Enter email" onChange={this.onChangeEmail} /> */}
                    <TextField
                        id="outlined-email-input"
                        label="Email"
                        className={classes.textField}
                        InputLabelProps={{
                            classes: {
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                  <EditIcon />
                              </InputAdornment>
                            ),
                          }}
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        value={this.state.name}
                        onChange={this.onChangeName}
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        className={classes.textField}
                        InputLabelProps={{
                            classes: {
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                            },
                        }}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                    />
                    {/* <button>Add</button> */}
                    <Button onClick={this.submit} variant="contained" size="large" color="primary" className={classes.button}>Submit</Button>
                </FormControl>
                <br />
                <Lesson userList={this.props.LessonController.users} />
            </div>
        );
    }
}
export default withStyles(styles)(LessonEditor);

