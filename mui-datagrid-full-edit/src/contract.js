/*
This is a file for only communication interface with a server.
In real developing you should delete "virtual axios" parts in this file
and use real axios parts alternatively.
*/

//import axios from "./controllers/axios"

import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:5000';

let rows = [
    {
        id: 1,
        login: "cycle-depot",
        title: "Cycle-Depot",
        desc: "Fat",
        dateCreated: "2023-03-09"
    },
    {
        id: 2,
        login: "toplowriderstore",
        title: "Top Lowrider",
        desc: "Has",
        dateCreated: "2023-03-09"
    }
];

const getAll = () => {
    //real axios
    return axios.get('/contract', {});

    //virtual axios
    // return new Promise((resolve, reject) => {
    //     const res = { data: rows };
    //     resolve(res);
    // });
};

const saveRow = (row) => {
    console.log(row); 

    //real axios
    return axios.patch('/contract', row);

    //virtual axios
    // return new Promise((resolve, reject) => {
    //     if(row.isNew) rows.push(row);
    //     else rows = rows.map(r => r.id === row.id ? row : r);
    //     resolve({ data: row });
    // });
};

const deleteRow = (rowId) => {
    console.log(rowId); 
    //real axios
    return axios.delete(`/contract/${rowId}`);

    //virtual axios
    // return new Promise((resolve, reject) => {
    //     const deletedRow = rows.find((r) => r.id === rowId);
    //     rows = rows.filter(r => r.id !== rowId);
    //     resolve({ data: deletedRow });
    // });
};

const ContractController = {
    getAll,
    saveRow,
    deleteRow
};

export default ContractController;
