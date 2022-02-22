import React, { useState, useEffect } from 'react'
import MaterialTable from "material-table";
import tableIcons from "./MaterialIcons";
import axios from 'axios';

const columns = [
    { title: "pID", field: "_id", hidden: true},
    { title: "ID", field: "id" },
    { title: "DateTime", field: "datetime", editable: false },
    { title: "Description", field: "description" },
    { title: "Longitude", field: "longitude", type: "Number" },
    { title: "Latitude", field: "latitude", type: "Number" },
    { title: "Elevation", field: "elevation", type: "Number" },
  ]

const DataGrid = () => {

    const [data, setData] = useState([]); //table data

    useEffect(() => {
        axios.get("/api/products")
            .then(res => {
                setData(res.data)
            })
            .catch(error => {
                console.log("Error")
            })
    }, [])

    const handleRowUpdate = (newData, oldData, resolve) => {
        axios.patch("/api/products/" + newData._id, newData)
            .then(res => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                resolve()
            })
    }

    const handleRowAdd = (newData, resolve) => {
        axios.post("/api/products", newData)
            .then(res => {
                let dataToAdd = [...data];
                dataToAdd.push(newData);
                setData(dataToAdd);
                resolve()
            })
    }

    const handleRowDelete = (oldData, resolve) => {
        axios.delete("/api/products/" + oldData._id)
            .then(res => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve()
            })
    }
    return (
        <div style={{ height: 700, width: '100%' }}>
            <MaterialTable mt={90}
              title="Taxada Products"
              columns={columns}
              data={data}
              icons={tableIcons}
              options={{
                headerStyle:{size:'80px'}
                }}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                      handleRowUpdate(newData, oldData, resolve);
                       
                  }),
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    handleRowAdd(newData, resolve)
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDelete(oldData, resolve)
                  }),
              }}
            />
        </div>
    )
}

export default DataGrid