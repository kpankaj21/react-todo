import React, { useEffect, useState } from "react";
import "./App.css";
import Kp from "./kp.png";
//import clsx from "clsx";
import { Button, Fab } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
//import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
//import UpdateIcon from "@mui/icons-material/Update";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

// const getLocalItems = () => {
//   let list = localStorage.getItem("lists");
//   if (list) {
//     return JSON.parse(localStorage.getItem("lists"));
//   } else {
//     return [];
//   }
// };

function Registration() {
  const [fname, setfname] = useState("");
  const [userData, setUserData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  // const [isComplete, setIsComplete] = useState([]);
  // const [isActive, setIsActive] = useState([]);
  const [displayList, setdisplayList] = useState([]);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    let list = localStorage.getItem("lists");
    if (list) {
      setUserData(JSON.parse(localStorage.getItem("lists")));
      setdisplayList(JSON.parse(localStorage.getItem("lists")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(userData));
    setdisplayList(userData);
    onFilter(tab);
  }, [userData]);

  const addClick = (_e) => {
    if (fname && !isUpdate) {
      setUserData(
        userData.map((item) => {
          if (item.id === isEditItem) {
            return { ...item, Name: fname };
          }
          return item;
        })
      );
      setfname("");
      setIsUpdate(true);
    } else if (fname !== "") {
      setUserData([
        ...userData,
        {
          id: Math.random().toString().substr(9, 4),
          Name: fname,
          status: false,
        },
      ]);
      setfname("");
    } else {
      alert("Plzz Enter Value");
    }
  };

  const editClick = (id) => {
    console.log("idddd", id);
    const editItem = userData.find((item) => item.id === id);

    setfname(editItem.Name);
    setIsUpdate(false);
    setIsEditItem(id);
  };
  const deleteClick = (id) => {
    const deleteItem = userData.filter((item) => item.id !== id);
    setUserData(deleteItem);
  };

  const checkHandler = (id) => {
    console.log("check idddd", id);

    let data = userData.map((item) => {
      if (item.id === id) {
        return { ...item, status: !item.status };
      }
      return item;
    });
    setUserData(data);
    localStorage.setItem("lists", JSON.stringify(data));

    // let data =userData.map((item) => {
    //   if(item.id ===id){
    //     return {...item,status:!item.status }
    //   }
    //   return item
    // })
    // setUserData(data)
    // setIsChecked(true)
  };

  const onFilter = (key) => {
    setTab(key);
    console.log("userData", userData);
    const dummyData = userData;

    const fiterIten = dummyData.filter((item) => {
      switch (key) {
        case "complete":
          return item.status;

        case "active":
          return !item.status;

        default:
          return true;
      }
    });
    setdisplayList(fiterIten);
  };

  // const allClick = () => {

  // };

  // const completeClick = (e) => {
  //   var completeData = userData.filter((item) => item.status === true);
  //   setIsComplete(completeData);
  //   console.log("isCompelete",isComplete);

  //    //localStorage.setItem("lists", JSON.stringify(completeData));

  // };

  // const activeClick = (e) => {
  //    var activeData = userData.filter((item) => item.status === false);
  //    setIsActive(activeData);
  //    console.log("is Active",isActive);

  //   //localStorage.setItem("lists", JSON.stringify(activeData));
  // };

  const removeAll = (e) => {
    setUserData([]);
  };

  /// console.log("storee", userData);

  return (
    <>
      <div className="imgid">
        <img src={Kp} alt="todoimg" width="200px" />
      </div>
      <div className="inputid">
        <br />
        <br />
        <input
          placeholder="input value..."
          type="text"
          value={fname}
          onChange={(e) => {
            setfname(e.target.value);
          }}
        />

        {isUpdate ? (
          <Fab
            size="medium"
            color="primary"
            sx={{ color: "white" }}
            onClick={(e) => addClick(e)}
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        ) : (
          <Fab
            size="medium"
            color="secondary"
            onClick={(e) => addClick(e)}
            aria-label="edit"
          >
            <EditIcon />
          </Fab>
        )}
      </div>
      <div className="userName">
        {displayList &&
          displayList.length > 0 &&
          displayList.map((item) => {
            return (
              <div key={item.id}>
                <input
                  type="checkbox"
                  className="m-4"
                  value={item.Name}
                  checked={item.status ? true : false}
                  onChange={() => checkHandler(item.id)}
                />
                <span
                  style={
                    item.status ? { textDecoration: "line-through" } : null
                  }
                >
                  {item.Name}
                </span>
                <Button sx={{borderRadius:10}}
                  variant="outlined"
                  color="inherit"
                  startIcon={<EditRoundedIcon />}
                  onClick={() => editClick(item.id)}
                ></Button>{" "}
                <Button
                 sx={{borderRadius:10}}
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteClick(item.id)}
                ></Button>
                <br />
              </div>
            );
          })}
        <div className="active">
          <Button
            variant="contained"
            color="inherit"
            startIcon={<OfflinePinIcon />}
            onClick={(e) => onFilter("all")}
          ></Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DoneAllRoundedIcon />}
            onClick={(e) => onFilter("complete")}
          ></Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<DoneOutlinedIcon />}
            onClick={(e) => onFilter("active")}
          ></Button>

          <Button
            variant="contained"
            color="error"
            startIcon={<ClearOutlinedIcon />}
            onClick={(e) => removeAll(e)}
          ></Button>
        </div>
      </div>
    </>
  );
}

export default Registration;
