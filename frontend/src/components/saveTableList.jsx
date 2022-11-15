import './tablelist.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
// import useFetch from '../useFetch';
const TableList = ( {tables} ) => {
  // User's selections
  const [selection, setSelection] = useState({
    table: {
      name: null,
      id: null
    },
    date: new Date(),
    time: null,
    location: "",
    size: 0
  });

  // User's booking details
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    email: ""
  });
  const [locations] = useState([
    "indoors",
    "outdoors"
  ]);
  const [times] = useState([
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM"
  ]);

  const getDate = _ => {
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
      "December"
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

  // Get Dates


  // Get Times
  const getTimes = () => {
    let newTimes = [];
    times.forEach(time => {
      newTimes.push(
        <DropdownItem
          key={time}
          className="booking-dropdown-item"
          onClick={_ => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table
              },
              time: time
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

   // Get Locations
  const getLocations = () => {
    let newLocations = [];
    locations.forEach(location => {
      newLocations.push(
        <DropdownItem
        key={location}
        className="booking-dropdown-item"
        onClick={_ => {
          let newSel = {
            ...selection,
            table: {
              ...selection.table
            },
            location: location
          };
          setSelection(newSel);
        }}
        >
          {location}
        </DropdownItem>
      );
    })
    return newLocations
  };

  const getSize=() => {
    const newSizes = [];
    for (let i = 1; i < 8; i++) {
      newSizes.push(
        <DropdownItem
          key={i}
          className="booking-dropdown-item"
          onClick={e => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table
              },
              size: i
            };
            setSelection(newSel);
          }}
        >{i}</DropdownItem>
      );
    }
    return newSizes;
  };


  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <Row>
          <Col xs="12" sm="3" className='selection-pos'>
            <UncontrolledDropdown>
              <DropdownToggle color="none" caret className="booking-dropdown">
                {selection.time === null ? "Select a Time" : selection.time}
              </DropdownToggle>
              <DropdownMenu right className="booking-dropdown-menu">
                {getTimes()}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
          <Col xs="12" sm="3" className='selection-pos'>
            <UncontrolledDropdown>
              <DropdownToggle color="none" caret className="booking-dropdown">
                {selection.location === "" ? "Select a Location" : selection.location}
              </DropdownToggle>
              <DropdownMenu right className="booking-dropdown-menu">
                {getLocations()}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
          <Col xs="12" sm="3" className='selection-pos'>
            <UncontrolledDropdown>
              <DropdownToggle color="none" caret className="booking-dropdown">
                {selection.size === 0 ? "Select Party Size" : selection.size.toString()}
              </DropdownToggle>
              <DropdownMenu right className="booking-dropdown-menu">
                {getSize()}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
        </Row>
        
        
        <form>
          <div class="rtp">
            <input type="text" placeholder="Name"/>
            <input type="text" placeholder="Phone #"/>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email" className="fg"/>
          </div>
        </form>
      </div>
      <div className="grid-container">
        {tables.map((table) => (
          <div key={table.id} className="grid-item">
            <h3>{table.name}</h3>
            <p>capacity: {table.capacity}</p>
            <p>location: {table.location}</p>
            <span>{table.isAvailable ? "Available" : ''}</span>
            <p>{table.isAvailable ? <button onClick={table.isAvailable === false}>Reserve</button> : "Table is not Available"}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableList