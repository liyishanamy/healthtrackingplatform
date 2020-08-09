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
import {DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import {errorHandling} from "../errorHandling"; // theme css file
const columns = [
    {id: 'name', label: 'name', minWidth: 170},
    {id: 'email', label: 'email', minWidth: 170},
    {
        id: 'date_format',
        label: 'date',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'time_format',
        label: 'time',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'testDone_format',
        label: 'testDone',
        minWidth: 100,
        align: 'right',
        //format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'testResult',
        label: 'testResult',
        minWidth: 100,
        align: "right",

    },
    {
        id: 'updateResult',
        label: 'updateResult',
        minWidth: 100,
        align: "right",
        format: value => {
            console.log("format",value)
            return manageAppointment(value)
        }
    }

];


function manageAppointment(email) {
    console.log("manageAppointment",email)
    return <div key={email}><Link to={`/updateResult/${email}`}>Update Result</Link></div>
}


function createData(name, email, date, time_start, time_end, testDone, testResult, updateResult) {
    console.log("updateResult",updateResult)
    let testDone_format;
    let date_format;
    let timeStart_format;
    let timeEnd_format;
    let time_format;
    if (testDone) {
        testDone_format = "Done"
    } else {
        testDone_format = "Not Done"
    }
    date_format = new Date(date).getFullYear() + "/" + (new Date(date).getMonth() + 1) + "/" + new Date(date).getDate()

    let minute1;

    if (new Date(time_start).getMinutes() === 0) {
        minute1 = "00"
    } else {
        minute1 = new Date(time_start).getMinutes()
    }

    timeStart_format = new Date(time_start).getHours() + ":" + minute1
    let minute2;

    if (new Date(time_end).getMinutes() === 0) {
        minute2 = "00"
    } else {
        minute2 = new Date(time_end).getMinutes()
    }
    timeEnd_format = new Date(time_end).getHours() + ":" + minute2
    time_format = timeStart_format + '-' + timeEnd_format
    console.log("test", date_format, time_format, testDone_format)
    console.log('inCreateData',updateResult)
    updateResult=email

    return {name, email, date_format, time_format, testDone_format, testResult, updateResult};
}


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function ManageAppointment() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([])
    const [totalRows,setTotalRows] = React.useState(0)

    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate()+1)
    const [startDate, setStartDate] = React.useState(new Date(today).getFullYear()+"-"+(new Date(today).getMonth()+1)+"-"+new Date(today).getDate())
    const [endDate, setEndDate] = React.useState(new Date(tomorrow).getFullYear()+"-"+(new Date(tomorrow).getMonth()+1)+"-"+new Date(tomorrow).getDate())

    function handleSelect(ranges) {
        setStartDate(new Date(ranges['selection']['startDate']).getFullYear()+"-"+(new Date(ranges['selection']['startDate']).getMonth()+1)+"-"+new Date(ranges['selection']['startDate']).getDate())
        setEndDate(new Date(ranges['selection']['endDate']).getFullYear()+"-"+(new Date(ranges['selection']['endDate']).getMonth()+1)+"-"+new Date(ranges['selection']['endDate']).getDate())

    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(()=>{
        fetch(`http://localhost:3000/appointment/allPatients?from=` + startDate + `&to=` + endDate, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken"))
            },
        }).then(response => response.json())
            .then(data => {
                setTotalRows(data.length)

            }).catch( e=> errorHandling(e) );
    },[startDate, endDate])

    useEffect(() => {
        console.log("fetch data between",startDate, endDate)
        console.log(new Date(startDate))
        console.log(new Date(endDate))


        if(new Date(startDate).getTime()===new Date(endDate).getTime()){
            const today = new Date(startDate)
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate()+1)
            setEndDate(new Date(tomorrow).getFullYear()+"-"+(new Date(tomorrow).getMonth()+1)+"-"+new Date(tomorrow).getDate())


        }
        fetch(`http://localhost:3000/appointment/allPatients?from=` + startDate + `&to=` + endDate+`&page=`+(page+1)+`&limit=`+rowsPerPage, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken"))
            },
        }).then(response => response.json())
            .then(data => {
                let value;
                value = data
                setRows([]);
                for (var i = 0; i < value.length; i++) {
                    console.log(i, value[i])
                    if (new Date(value[i]['appointmentStart']).getTime() <= new Date(endDate).getTime() && new Date(value[i]['appointmentStart']).getTime() >= new Date(startDate).getTime()) {
                        setRows(rows => [...rows,
                            createData(value[i]['patientName'], value[i]['patientEmail'], value[i]['appointmentStart'], value[i]['appointmentTime']['startTime'], value[i]['appointmentTime']['endTime'], value[i]['testDone'], value[i]['testResult'], value[i]['email'])
                        ]);
                    }


                }
                console.log("after", rows)
            }).catch( e=> errorHandling(e) );


    }, [startDate, endDate,page,rowsPerPage])
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }

    return (
        <div>
            <div>patientsList:</div>
            <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
            />
            <div>range:<span>{startDate}</span> to <span>{endDate} </span></div>
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
                                            console.log("row", row)
                                            const value = row[column.id];
                                            console.log(column.id, value)
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
                    rowsPerPageOptions={[5,10]}
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
