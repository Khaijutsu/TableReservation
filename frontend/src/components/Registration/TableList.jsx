import './tablelist.css';
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Calendar } from 'react-date-range';
import format from 'date-fns/format';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import axios from 'axios';


const TableList = ( {tables} ) => {

  // User's selections
  const [selection, setSelection] = useState({
    table: {
      name: null,
      capacity: null,
      location: null
    },
    date: new Date(),
    time: null,
    location: "",
    size: 0
  });

  // User's information
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");


  // set Tables
  // const [Tables] = useState([
  //   tables.map((table) => {
  //     table.name,
  //     table.capacity,
  //     table.location,
  //     table.isAvailable
  //   })
  // ])

  // set Dates
  const refOne = useRef(null);
  const [calendar, setCalendar] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCalendar(format(new Date(), "MM/dd/yyyy"))
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])
  
  const handleSelect = (date) => {
    setCalendar(format(date, 'MM/dd/yyyy'))
    let newSel = {
      ...selection,
      table: {
        ...selection.table
      },
      date: date
    };
    setSelection(newSel);
  }



  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false)
    }
  }

  // Get Dates

  // set Time
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

  // Get Times
  const getTimes = () => {
    let newTimes = [];
    times.forEach(time => {
      newTimes.push(
        <DropdownItem
          key={time}
          className="booking-dropdown-item"
          onClick={() => {
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

  // set Location
  const [locations] = useState([
    "indoors",
    "outdoors"
  ]);

   // Get Locations
  const getLocations = () => {
    let newLocations = [];
    locations.forEach(location => {
      newLocations.push(
        <DropdownItem
        key={location}
        className="booking-dropdown-item"
        onClick={() => {
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

  const getSize = () => {
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

  // get Tables




  // Post reservation to DB
  const addToReservation = () => {
    axios.post("http://localhost:4000/reservations", {
      name: name,
      phoneNumber: phoneNum,
      email: email,
      date: selection.date,
      time: selection.time,
      location: selection.location,
      capacity: selection.size,
      tableReservation: {
        name: "Kobeni table",
        capacity: 8,
        location: "indoors"
      }
    });
    
  };
  const [totalTables, setTotalTables] = useState([]);
  useEffect(() => {
    const fetchTables = async () => {
      const res = await fetch("http://localhost:4000/tables");
      const filterTable = await res.json();

      if (res.ok) {
        if (selection.time && selection.date) {
          filterTable.filter((table) => 
             (selection.size > 0 ? table.capacity >= selection.size : true) &&
             (selection.location !== "Any location" ? table.location === selection.location : true) 
         );
        }
      setTotalTables(filterTable)
      }   
    }
    fetchTables()
  }, [selection.date, selection.time, selection.location, selection.size])


  return (
    <div>
      <div>
        <Row>
          <Col xs="12" sm="3" className='selection-pos'>
            <input 
              value= {calendar}
              readOnly
              onClick={() => setOpen(open => !open)}
            />
            <div ref={refOne}>
              {open &&<Calendar 
                date= {new Date()}
                onChange= {handleSelect}
                className="calendarElement"
              />}
            </div>  
          </Col>
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
          <div >
            <input type="text" placeholder="Name" onChange={(e) => {setName(e.target.value)}}/>
            <input type="text" placeholder="Phone #" onChange={(e) => {setPhoneNum(e.target.value)}}/>
            <input type="email" placeholder="email" onChange={(e) => {setEmail(e.target.value)}} />
            <Link to="/confirmation">
            <button onClick={addToReservation}>Make Reservation</button>
            </Link>
          </div>
        </form>
      </div>
      <div className="grid-container">
        {totalTables && totalTables.map((table) => (
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