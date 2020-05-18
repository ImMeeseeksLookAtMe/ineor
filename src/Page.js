import React, { Fragment, useState, useEffect} from 'react';
import image from './image.jpg';
import './Page.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from 'react-router-dom';
import setHours from "date-fns/setMinutes";
import setMinutes from "date-fns/setMinutes";
import subDays from "date-fns/subDays";
import getDay from "date-fns/getDay";

const Page = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        
    })
    
    const [ barbers, setBarbers ] = useState([])
    const [ services, setServices ] = useState([])
    const [ appointments, setAppointments ] = useState([])
    const [ workHours, setWorkHours ] = useState([])

    useEffect(() => {
        async function getData() {
        const resBab = await axios.get("http://localhost:3000/barbers")
        const resSer = await axios.get('http://localhost:3000/services')
        const resApp = await axios.get('http://localhost:3000/appointments')
        setBarbers(resBab.data)
        setServices(resSer.data)
        setAppointments(resApp.data)
        setWorkHours(resBab.data[0].workHours)
        console.log(resBab.data)
        console.log(resSer.data)
        console.log(resApp.data)
        console.log(resBab.data[0].workHours)
        }
        getData()
    }, [])

    //const addAppintment
    //set Date
    
    const [startDate, setStartDate] = useState(null)

    const[ selectBar, setSelectBar  ] = useState(0)
    
    const[ selectSer, setSelectSer ] = useState(0)


    const {
        firstName,
        lastName,
        email,
        contactNumber
    } = formData

    const appData = {}

    Object.assign(appData, {barberId:  selectBar})
    Object.assign(appData, {serviceId: selectSer})
    Object.assign(appData, {startDate: new Date(startDate).getTime() / 1000}) //unix

    const onChange = e =>  {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const isWeekday = date => {
      const day = getDay(date);
      return day !== 0 && day !== 6;
    };
    

    const onSubmit = e => {
        e.preventDefault()
        //funkcija post
        async function postData() {
          const config = {
              headers: {
                'Content-Type': 'application/json'
            }
          }
          try {
            const sendData = await axios.post('http://localhost:3000/appointments', appData, config)
            console.log(sendData)
          } catch(err) {
            console.log("sending problem")
          }
        }
        postData()
    }

  return (
    <Fragment>
      <div className="container">
        <div className="flex">
          <div className="header">
            <h2>BOOK YOUR BARBER</h2>
            <p className="forWord">
            Great Hair Doesn't Happen By Chance. 
            It Happens By Appointment! 
            <span className="small-brake"><br/>So Don't Wait And Book Your Appointment</span>
            </p>
          </div>
        </div>
          <div className="flex flex-image"> 
            <img className="barber" src={image} alt="Barber"></img>
          </div>
        <div className="flex">
          <form className="book-appointment" onSubmit={e=> onSubmit(e)}>
            
            <div className="input-container">
                <div className="book-appointment-header">
                  <h2>BOOK YOUR APPOINTMENT</h2>
                </div>
                  <div className="input-columns">
                    <div className="item input-item1">
                      <input 
                       placeholder="First Name"
                       name="firstName"
                       value={firstName}
                       onChange={e => onChange(e)} 
                       required
                      />
                    </div>
                    <div className="item input-item2">
                      <input 
                      name="lastName" 
                      placeholder="Last Name"
                      value={lastName}
                      onChange={e => onChange(e)}
                      required 
                      />
                    </div>
                    <div className="item input-item3">
                      <input 
                      name="email" 
                      placeholder="Email"
                      value={email}
                      onChange={e => onChange(e)}
                      required
                      />
                    </div>
                    <div className="item input-item4">
                      <input 
                      name="contactNumber" 
                      placeholder="Contact Number"
                      value={contactNumber}
                      onChange={e => onChange(e)}
                      required
                      />
                    </div>
                    <div className="item input-item5">
                      <select name="selectBarber" value={ selectBar } onChange={e => setSelectBar(e.target.value)}> 
                        <option value={0} key={0}>Select Barber</option> 
                        { barbers.map(barber =>(
                          <>
                            <option value={barber.id} key={barber.id}>{ barber.firstName } {" "} { barber.lastName }</option>
                          </>
                        ))
                        }
                        
                      </select>
                    </div>
                    <div className="item input-item6">
                      <select name="selectService" value={ selectSer } onChange={e => setSelectSer(e.target.value)}>
                        <option value={0} key={0}>Select Service</option>
                        { services.map(service =>(
                          <>
                            <option value={service.id} key={service.id}>{service.name}</option>
                          </>
                        ))
                        }
                      </select>
                    </div>
                    <div className="item input-item7">
                    <DatePicker 
                    dateFormat="d.MM.yyyy"
                    selected={ startDate }
                    className="pick"
                    placeholderText="Start Date"
                    filterDate={isWeekday}
                    onChange={date => setStartDate(date)}
                    required
                     />
                    </div>
                    <div className="item input-item8">
                    <DatePicker
                      selected={ startDate }
                      onChange={date => setStartDate(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      className="pick"
                      placeholderText="Start Time"
                      minTime={setHours(setMinutes(new Date(), 0),7)}
                      maxTime={setHours(setMinutes(new Date(), 30),15)} 
                      /*excludeTimes={workHours.map(app => (
                      setHours(setMinutes(new Date(), app.startHour), Number(app.endHour)))
                      )}*/
                      required
                    />
                    </div>
                  </div>
                <div className="item input-item9">
                  <select name="selectPrice" value={selectSer} disabled>
                    <option value={0} key={0}>Select Price</option>
                      { services.map(service =>(
                          <>
                            <option value={service.id} key={service.id}>{service.price}</option>
                          </>
                      ))}
                  </select>
                </div>
                <div className="input-item10">
                  <button 
                  className="button"
                  >BOOK{" "}
                  <span className="diss">
                    APPOINTMENT</span>
                  </button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
 );
}

export default Page;
    