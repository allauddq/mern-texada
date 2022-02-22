import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import tableIcons from "./MaterialIcons";
import axios from 'axios';
const moment = require('moment');
const columns = [
  { title: "pID", field: "_id", hidden: true },
  { title: "ID", field: "id", defaultSort: "asc" },
  { title: "DateTime", field: "datetime", editable: false, initialEditValue: moment().format() },
  { title: "Description", field: "description" },
  { title: "Longitude", field: "longitude", type: "Number" },
  { title: "Latitude", field: "latitude", type: "Number" },
  { title: "Elevation", field: "elevation", type: "Number" },
]

const ProductsTable = () => {
  const [data, setData] = useState([]); //table data
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    axios.get("/api/products")
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.log("Error");
      })
  }, [])

  const validation = (newData) => {
    let errorList = [];
    if (newData.id === "" || newData.id === undefined) {
      errorList.push("id");
    }
    if (newData.description === "" || newData.description === undefined) {
      errorList.push("description");
    }
    if (newData.latitude === null || newData.latitude === undefined) {
      errorList.push("longitude");
    }
    if (newData.longitude === null || newData.longitude === undefined) {
      errorList.push("latitude");
    }
    if (newData.elevation === null || newData.elevation === undefined) {
      errorList.push("elevation");
    }
    return errorList;
  }

  const updateProduct = (newData, oldData, resolve) => {
    let errorList = validation(newData);
    if (errorList.length < 1) {
      axios.put("/api/products/" + newData._id, newData)
        .then(res => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve()
        })
        .catch(error => {
          setErrorMessages(["Update failed! Server error"])
          setIserror(true)
          alert(errorMessages)
          resolve()

        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      alert(`Please fill/correct the fields: ${errorList}`)
      resolve()

    }
  }

  const addProduct = (newData, resolve) => {
    let errorList = validation(newData);
    if (errorList.length < 1) {
      axios.post("/api/products", newData)
        .then(res => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd)
          resolve()
        })
        .catch(error => {
          setErrorMessages(["Cannot add data. Server error!"])
          setIserror(true)
          alert(errorMessages)
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      alert(`Please fill/correct the fields: ${errorList}`)
      resolve()
    }
  }

  const deleteProduct = (oldData, resolve) => {
    axios.delete("/api/products/" + oldData._id)
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        alert(errorMessages)
        resolve()
      })
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MaterialTable
        title="Texada Products"
        icons={tableIcons}
        columns={columns}
        data={data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                updateProduct(newData, oldData, resolve);
              }, 300);
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                addProduct(newData, resolve);
              }, 300);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                deleteProduct(oldData, resolve);
              }, 300);
            }),
        }}
        options={{
          sorting: true,
          filtering: true
        }}
      />
    </div >
  )
}

export default ProductsTable