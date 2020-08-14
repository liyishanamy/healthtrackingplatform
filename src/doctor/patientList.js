import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {errorHandling} from "../errorHandling";
import { CSVLink } from "react-csv";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {CardHeader, Divider} from "@material-ui/core";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

const columns = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'age', label: 'Age', minWidth: 50},
    {
        id: 'Phone',
        label: 'Phone',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Email',
        label: 'Email',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'totalIllDays',
        label: 'TotalIllDays',
        minWidth: 100,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Details',
        label: 'Details',
        minWidth: 100,
        align: "right",
        format: value => {
            return usersList(value)
        }

    }

];


function usersList(email) {
    return <div key={email} ><Link to={`/patientHealthStatus/${email}`}>See
        Details</Link></div>

}

function createData(name, age, Phone, Email, CreatedDate, Details) {
    const illDays = new Date().getTime() - new Date(CreatedDate).getTime();
    const totalIllDays = Math.floor(illDays / (1000 * 60 * 60 * 24))


    return {name, age, Phone, totalIllDays, Email,Details };
}



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '140%'
    },
    container: {
        maxHeight: 900,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        color:"white"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },



    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },

}));


export default function PatientList() {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([])
    const [temp,setTemp]=React.useState([])
    const [totalRows,setTotalRows] = React.useState(0)
    const [displayMode,setDisplayMode]=React.useState("Active")
    const [flag,setFlag]=React.useState(true)
    const [inputVal,setInputVal]=React.useState("")


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const toggleChecked=(e)=> {

        if (flag) {
            setDisplayMode("Inactive")
            setFlag(false)
        }
        if (!flag) {
            setDisplayMode("Active")
            setFlag(true)
        }

    }


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(()=>{
        fetch("http://localhost:3000/users/totalPatients", {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + (localStorage.getItem("accessToken"))
        },
    }).then(response => response.json())
        .then(data => {
            if(data.message!=="the token is invalid"){
                setTotalRows(data.totalPatients)
            }else{
                console.log("throw data1",localStorage.getItem("errorHandle"))
                throw data
            }

    }).catch( e=> errorHandling(e) );
    })

    useEffect(() => {
        // const fetchData = async (page, rowsPerPage) => {
        console.log("page", page, "rowsPerPage", rowsPerPage)
        fetch(`http://localhost:3000/users?active=`+flag+`&page=` + (page+1) + `&limit=` + rowsPerPage, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken"))
            },
        }).then(response => response.json())
            .then(data => {
                console.log("hello data", data)
                if(data.message!=="the token is invalid"){
                    setRows([])
                    for (var i = 0; i < data.length; i++) {
                        setRows(rows => [...rows,
                            createData(data[i]['firstname'] + data[i]['lastname'], data[i]['age'], data[i]['phone'], data[i]['email'], data[i]['createdDate'], data[i]['email'])
                        ]);
                        setTemp(rows => [...rows,
                            createData(data[i]['firstname'] + data[i]['lastname'], data[i]['age'], data[i]['phone'], data[i]['email'], data[i]['createdDate'], data[i]['email'])
                        ]);
                    }

                    console.log("after", temp)}
                else{

                    throw data
                }

            }).catch( e=> errorHandling(e) );
     }, [page, rowsPerPage,flag])

    const handleInputVal=(e)=>{
        console.log("inputval",e.target.value)
        setInputVal(e.target.value)
        if(e.target.value===""){
            setRows(temp)
        }

    }
    const enterPressed=(event)=> {
        var code = event.keyCode || event.which;
        console.log("enter",code)
        if(code === 13) { //13 is the enter keycode
            //Do stuff in here
            findItem(inputVal)
        }
    }
    const findItem=(inputVal)=>{
        console.log("rows",rows)
        const res =rows.filter(item=>
            item["name"].includes(inputVal)
        )
        console.log("index",res)
        setTemp(rows)
        setRows(res)
    }
    return (
        <div>

            <AppBar  style={{width: '140%'
            }} position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Patient List
                    </Typography>
                    <FormGroup


                    >
                       <FormControlLabel

                            control={<Switch   onChange={toggleChecked}/>}
                            label={displayMode}
                        />
                    </FormGroup>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleInputVal}
                            onKeyPress={enterPressed}


                        />

                    </div>
                </Toolbar>
            </AppBar>




            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.Email}>
                                        {columns.map((column) => {
                                            const value = row[column.id];

                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={totalRows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />


            </Paper>
            <CardHeader
                action={
                    <CSVLink
                        data={rows}
                        filename={"dailyReports.csv"}
                        className="btn btn-primary"
                        target="_blank"
                    >
                        Export
                    </CSVLink>

                }
            />

        </div>
    )
}
