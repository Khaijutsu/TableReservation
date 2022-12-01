import React, { useState, useEffect } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
} from "reactstrap";
import "./tablelist.css";
import Table from "./table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReserveTable = ({tables}) => {
  const navigate = useNavigate();
  const [totalTables, setTotalTables] = useState([]);

  // User's selections
  const [selection, setSelection] = useState({
    table: {
      name: null,
      id: null,
    },
    date: new Date(),
    time: null,
    location: "Any Location",
    size: 0,
  });

  // User's booking details
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // List of potential locations
  const [locations] = useState(["Any Location", "Inside", "Outside"]);
  const [times] = useState([
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
  ]);
  // Basic reservation "validation"
  const [reservationError, setReservationError] = useState(false);

  const getDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date =
      months[selection.date.getMonth()] +
      " " +
      selection.date.getDate() +
      " " +
      selection.date.getFullYear();
    let time = selection.time.slice(0, -2);
    time = selection.time > 12 ? time + 12 + ":00" : time + ":00";
    console.log(time);
    const datetime = new Date(date + " " + time);
    return datetime;
  };

  // const getEmptyTables = (_) => {
  //   let tables = totalTables.filter((table) => table.isAvailable);
  //   return tables.length;
  // };

 

  // Make the reservation if all details are filled out
  const reserve = async () => {
    if (
      (booking.name.length === 0) |
      (booking.phone.length === 0) |
      (booking.email.length === 0)
    ) {
      console.log("Incomplete Details");
      setReservationError(true);
    } else {
      axios.post("http://localhost:4000/reservations", {
        name: booking.name,
        phoneNumber: booking.phone,
        email: booking.email,
      });
      navigate("/confirmation");
    }
  };

  // Clicking on a table sets the selection state
  const selectTable = (table_name, table_id) => {
    setSelection({
      ...selection,
      table: {
        name: table_name,
        id: table_id,
      },
    });
  };

  // Generate party size dropdown
  const getSizes = () => {
    let newSizes = [];

    for (let i = 2; i < 10; i += 2) {
      newSizes.push(
        <DropdownItem
          key={i}
          className="booking-dropdown-item"
          onClick={(e) => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table,
              },
              size: i,
            };
            setSelection(newSel);
          }}
        >
          {i}
        </DropdownItem>
      );
    }
    return newSizes;
  };

  // Generate locations dropdown
  const getLocations = () => {
    let newLocations = [];
    locations.forEach((loc) => {
      newLocations.push(
        <DropdownItem
          key={loc}
          className="booking-dropdown-item"
          onClick={(_) => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table,
              },
              location: loc,
            };
            setSelection(newSel);
          }}
        >
          {loc}
        </DropdownItem>
      );
    });
    return newLocations;
  };

  // Generate locations dropdown
  const getTimes = () => {
    let newTimes = [];
    times.forEach((time) => {
      newTimes.push(
        <DropdownItem
          key={time}
          className="booking-dropdown-item"
          onClick={(_) => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table,
              },
              time: time,
            };
            setSelection(newSel);
          }}
        >
          {time}
        </DropdownItem>
      );
    });
    return newTimes;
  };

  useEffect(() => {
    const fetchTables = async () => {
      const res = await fetch("http://localhost:4000/tables");
      const filterTable = await res.json();

      if (res.ok) {
        if (selection.time && selection.date) {
          filterTable.filter((table) => 
             (selection.size > 0 ? table.capacity >= selection.size : true) 
         );
        }
      setTotalTables(filterTable)
      }   
    }
    fetchTables()
  }, [selection.date, selection.time, selection.location, selection.size])

  const getEmptyTables = () => {
    let tables = totalTables.filter(table => table.isAvailable);
    return tables.length;
  };

  // Generating tables from available tables state
  const getTables = () => {
    console.log("Getting tables");
    if (getEmptyTables() > 0) {
      let tables = [];
      totalTables.forEach((table) => {
        if (table.isAvailable) {
          tables.push(
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              empty
              selectTable={selectTable}
            />
          );
        } else {
          tables.push(
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              selectTable={selectTable}
            />
          );
        }
      });
      return tables;
    }
  };

  return (
    <div>
      <div className="selectionDropDown">
        <div xs="12" sm="3">
          <UncontrolledDropdown>
            <DropdownToggle color="none" caret className="booking-dropdown">
              {selection.time === null ? "Select a Time" : selection.time}
            </DropdownToggle>
            <DropdownMenu right className="booking-dropdown-menu">
              {getTimes()}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <div xs="12" sm="3">
          <UncontrolledDropdown>
            <DropdownToggle color="none" caret className="booking-dropdown">
              {selection.location}
            </DropdownToggle>
            <DropdownMenu right className="booking-dropdown-menu">
              {getLocations()}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <div xs="12" sm="3">
          <UncontrolledDropdown>
            <DropdownToggle color="none" caret className="booking-dropdown">
              {selection.size === 0
                ? "Select a Party Size"
                : selection.size.toString()}
            </DropdownToggle>
            <DropdownMenu right className="booking-dropdown-menu">
              {getSizes()}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      <div noGutters className="tables-display">
            <div>
              {getEmptyTables() > 0 ? (
                <p className="available-tables">{getEmptyTables()} available</p>
              ) : null}

              {selection.date && selection.time ? (
                getEmptyTables() > 0 ? (
                  <div>
                    <div className="table-key">
                      <span className="empty-table"></span> &nbsp; Available
                      &nbsp;&nbsp;
                      <span className="full-table"></span> &nbsp; Unavailable
                      &nbsp;&nbsp;
                    </div>
                    <div noGutters>{getTables()}</div>
                  </div>
                ) : (
                  <p className="table-display-message">No Available Tables</p>
                )
              ) : (
                <p className="table-display-message">
                  Please select a date and time for your reservation.
                </p>
              )}
            </div>
          </div>
  
    </div>
  );
};

export default ReserveTable;
