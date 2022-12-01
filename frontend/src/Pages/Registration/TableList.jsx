import React, { useState, useEffect, useContext } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input
} from "reactstrap";

// Button,
import "./tablelist.css";
import Table from "./table";
// import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

const ReserveTable = () => {
  const navigate = useNavigate();
  const [totalTables, setTotalTables] = useState([]);
  const { user } = useContext(AuthContext);
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

  const printValidReserve = () => {
    if (user) {
      if (user.paymentMethod === "credit") {
        console.log(
          user.username +
            " is a regisistered user with a credit card in system and can reserve for "
        );
      } else if (
        user.paymentMethod === "cash" ||
        user.paymentMethod === "check"
      ) {
        console.log(
          user.username +
            " is a registered user with " +
            user.paymentMethod +
            " and not credit card in system and can't reserve for "
        );
      }
    } else {
      console.log("Is not a registered user and can't reserve for ");
    }
  };

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
      months[selection.date.getUTCMonth()] +
      " " +
      selection.date.getUTCDate() +
      " " +
      selection.date.getUTCFullYear();
    let time = selection.time.slice(0, -2);
    time = selection.time > 12 ? time + 12 + ":00" : time + ":00";

    if (date === "January 1 " + selection.date.getUTCFullYear()) {
      printValidReserve();
      console.log("New Years");
    } else if (date === "July 4 " + selection.date.getUTCFullYear()) {
      printValidReserve();
      console.log("Independence Day");
    } else if (date === "November 11 " + selection.date.getUTCFullYear()) {
      printValidReserve();
      console.log("Veterans Day");
    } else if (date === "December 25 " + selection.date.getUTCFullYear()) {
      printValidReserve();
      console.log("Christmas Day");
    } else if (date === "January 16 " + selection.date.getUTCFullYear()) {
      printValidReserve();
      console.log("MLK Day");
    } else if (date === "May 29 " + selection.date.getUTCFullYear()) {
      printValidReserve();
      console.log("Memorial Day");
    } else if (date === "September 4 " + selection.date.getUTCFullYear()) {
      printValidReserve();
      console.log("Labor Day");
    } else if (date === "October 9 " + selection.date.getUTCFullYear()) {
      printValidReserve();
      console.log("Columbus Day");
    } else if (date === "November 24 " + selection.date.getUTCFullYear()) {
      printValidReserve();
      console.log("Thanksgiving Day");
    }

    const datetime = new Date(date + " " + time);
    return datetime;
  };

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
      const datetime = getDate();
      let res = await fetch("http://localhost:4000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...booking,
          date: datetime,
          table: selection.table.id,
        }),
      });
      res = await res.text();
      console.log("Reserved: " + res);
      navigate("/confirmation");
    }
  };

  const endPage = async () => {
    if (
      (selection.time === null) |
      (selection.location === "Any Location") |
      (selection.size === 0) |
      (booking.name.length === 0) |
      (booking.phone.length === 0) |
      (booking.email.length === 0)
    ) {
      console.log("Incomplete Details");
      setReservationError(true);
    } else {
      const datetime = getDate();
      let res = await fetch("http://localhost:4000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...booking,
          date: datetime,
          table: selection.table.id
        })
      });
      res = await res.text();
      console.log("Reserved: " + res);
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
          onClick={() => {
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
          onClick={() => {
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
    // Check availability of tables from DB when a date and time is selected
    if (selection.time && selection.date) {
      (async (_) => {
        let datetime = getDate();
        let res = await fetch("http://localhost:4000/availiability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: datetime,
          }),
        });
        res = await res.json();
        // Filter available tables with location and group size criteria
        let tables = res.tables.filter(
          (table) =>
            (selection.size > 0 ? table.capacity >= selection.size : true) &&
            (selection.location !== "Any Location"
              ? table.location === selection.location
              : true)
        );
        setTotalTables(tables);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection.time, selection.date, selection.size, selection.location]);

  const getEmptyTables = () => {
    let tables = totalTables.filter((table) => table.isAvailable);
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
      <div>
        <div className="selectionDropDown">
          <div xs="12" sm="3">
            <input
              type="date"
              required="required"
              className="booking-dropdown"
              value={selection.date.toISOString().split("T")[0]}
              onChange={(e) => {
                if (!isNaN(new Date(new Date(e.target.value)))) {
                  let newSel = {
                    ...selection,
                    table: {
                      ...selection.table,
                    },
                    date: new Date(e.target.value),
                  };
                  setSelection(newSel);
                } else {
                  console.log("Invalid date");
                  let newSel = {
                    ...selection,
                    table: {
                      ...selection.table,
                    },
                    date: new Date(),
                  };
                  setSelection(newSel);
                }
              }}
            ></input>
          </div>
          <div xs="12" sm="3">
            <UncontrolledDropdown>
              <DropdownToggle color="none" caret className="booking-dropdown">
                {selection.time === null ? "Select a Time" : selection.time}
              </DropdownToggle>
              <DropdownMenu className="booking-dropdown-menu">
                {getTimes()}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <div xs="12" sm="3">
            <UncontrolledDropdown>
              <DropdownToggle color="none" caret className="booking-dropdown">
                {selection.location}
              </DropdownToggle>
              <DropdownMenu className="booking-dropdown-menu">
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
              <DropdownMenu className="booking-dropdown-menu">
                {getSizes()}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
      <div
            noGutters
            className="text-center justify-content-center reservation-details-container"
          >
            <div xs="12" sm="3" className="reservation-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Name"
                className="reservation-input"
                value={booking.name}
                onChange={(e) => {
                  setBooking({
                    ...booking,
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div xs="12" sm="3" className="reservation-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Phone Number"
                className="reservation-input"
                value={booking.phone}
                onChange={(e) => {
                  setBooking({
                    ...booking,
                    phone: e.target.value,
                  });
                }}
              />
            </div>
            <div xs="12" sm="3" className="reservation-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Email"
                className="reservation-input"
                value={booking.email}
                onChange={(e) => {
                  setBooking({
                    ...booking,
                    email: e.target.value,
                  });
                }}
              />
            </div>
          </div>
      <div>
        <button onClick={endPage}>Confirm</button>
      </div>
    </div>
  );
};

export default ReserveTable;
