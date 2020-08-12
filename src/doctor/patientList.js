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


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 600,
    },
});

export default function PatientList() {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([])
    const [totalRows,setTotalRows] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

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
        fetch(`http://localhost:3000/users?page=` + (page+1) + `&limit=` + rowsPerPage, {
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
                    }
                    console.log("after", rows)}
                else{

                    throw data
                }

            }).catch( e=> errorHandling(e) );
     }, [page, rowsPerPage])


    return (
        <div>
            <div>patientsList:<CSVLink
                data={rows}
                filename={"my-patients.csv"}
                className="btn btn-primary"
                target="_blank"
            >
                Export
            </CSVLink></div>

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
        </div>
    )
}
