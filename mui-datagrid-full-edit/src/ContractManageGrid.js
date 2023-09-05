/*
This file is
to customize the ui of the grid and
to integrate with a communication with backend.
 */

import * as React from "react";
import FullEditDataGrid from "./lib/index";
import { useEffect, useState } from "react";
import contractController from "./contract";
import dayjs from 'dayjs';


export default function SellerManageGrid() {
    const [rows, setRawRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const setRows = (rows) => {
        return setRawRows([...rows.map((r, i) => ({ ...r, no: i + 1 }))]);
    };
    useEffect(() => {
        setLoading(true);
        contractController
            .getAll()
            .then((res) => {
                setRows(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const onSaveRow = (id, updatedRow, oldRow, oldRows) => {
        console.log(updatedRow); 

        contractController
            .saveRow(updatedRow)
            .then((res) => {
                const dbRow = res.data;
                setRows(oldRows.map((r) => (r.id === updatedRow.id ? { ...dbRow } : r)));
            })
            .catch((err) => {
                setRows(oldRows);
            });
    };

    const onDeleteRow = (id, oldRow, oldRows) => {
        contractController
            .deleteRow(id)
            .then((res) => {
                const dbRowId = res.data.id;
                setRows(oldRows.filter((r) => r.id !== dbRowId));
            })
            .catch((err) => {
                setRows(oldRows);
            });
    };

    const createRowData = (rows) => {
        console.log(rows); 

        const newId = Math.max(...rows.map((r) => (r.id ? r.id : 0) * 1)) + 1;
        const newNo = Math.max(...rows.map((r) => (r.no ? r.no : 0) * 1)) + 1;
        return { id: newId, no: newNo };
    };

    return (
        <FullEditDataGrid
            columns={columns}
            rows={rows}
            onSaveRow={onSaveRow}
            onDeleteRow={onDeleteRow}
            createRowData={createRowData}
            loading={loading}
        />
    );
}

const columns = [
    {
        field: "id",
        headerName: "Id",
        width: 50,
        align: "center",
        type: "number",
        editable: false
    },
    {
        field: "vendor_name",
        headerName: "Vendor Name",
        //width: 80,
        align: "center",
        type: "string",
        editable: true
    },
    {
        field: "contract_id",
        headerName: "Contract Number",
        //width: 100,
        headerAlign: "center",
        type: "string",
        align: "center",
        editable: true
    },
    {
        field: "start_date",
        headerName: "Start Date",
        //width: 150,
        headerAlign: "center",
        type: "date",
        //align: "center",
        editable: true,
        valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
        field: "end_date",
        headerName: "End Date",
        //width: 250,
        headerAlign: "center",
        type: "date",
        editable: true,
        valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
        field: "renewal_date",
        headerName: "Renewal Date",
        //width: 250,
        headerAlign: "center",
        type: "date",
        editable: true,
        valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
        field: "licenseBase",
        headerName: "License Base",
        //width: 250,
        headerAlign: "center",
        type: "string",
        editable: true
    },
    {
        field: "licenseCount",
        headerName: "License Count",
        //width: 250,
        headerAlign: "center",
        type: "number",
        editable: true
    },
    {
        field: "costPerLicense",
        headerName: "Cost Per License",
        //width: 250,
        headerAlign: "center",
        type: "number",
        editable: true
    },
    {
        field: "totalLicenseCost",
        headerName: "Total License Cost",
        //width: 250,
        headerAlign: "center",
        type: "number",
        editable: true
    },
    {
        field: "maintainancePs",
        headerName: "Maintainance Ps",
        //width: 250,
        headerAlign: "center",
        type: "number",
        editable: true
    },
    {
        field: "maintainanceLicense",
        headerName: "maintainanceLicense",
        //width: 250,
        headerAlign: "center",
        type: "number",
        editable: true
    },
    {
        field: "maintainanceProductionSupport",
        headerName: "Maintainance Prouction Support",
        //width: 250,
        headerAlign: "center",
        type: "number",
        editable: true
    },
    {
        field: "renewalCostIncrease",
        headerName: "renewalCostIncrease",
        //width: 250,
        headerAlign: "center",
        type: "number",
        editable: true
    },
    {
        field: "totalMaintainanceCost",
        headerName: "Total Maintainance Cost",
        //width: 250,
        headerAlign: "center",
        type: "number",
        editable: true
    },
    {
        field: "currentContractValue",
        headerName: "currentContractValue",
        //width: 250,
        headerAlign: "center",
        type: "number",
        editable: true
    },
    {
        field: "contract_value",
        headerName: "Total Contract Value",
        //width: 250,
        headerAlign: "center",
        type: "number",
        editable: true
    }
];
