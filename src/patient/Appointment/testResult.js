import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
class TestResult extends Component {
    constructor(props) {
        super(props);
        this.state={
            testResult:""
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/appointment/myAppointment',{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    testResult:data[0].testResult
                })

            })
    }

    render() {
        return (

            <Card  variant="outlined">
                <CardContent>
                    <Typography  color="textSecondary" gutterBottom>
                        See My Test Result
                    </Typography>

                    <Typography variant="body2" component="p">
                        Test Result:{this.state.testResult}


                    </Typography>
                </CardContent>


            </Card>



        );
    }
}

export default TestResult;