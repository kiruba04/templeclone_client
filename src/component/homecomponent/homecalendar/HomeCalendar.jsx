import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import "./homecalendar.css"
const HomeCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [days, setDays] = useState([]);
  const [poojas, setPoojas] = useState([]);
  const [selectedPoojas, setSelectedPoojas] = useState([]);
  const { t, i18n } = useTranslation(); // useTranslation hook
 
  useEffect(() => {
    // Get the saved language from localStorage
    const savedLanguage = localStorage.getItem('language') || 'en'; // Default to 'en' if not set
    if (i18n.language !== savedLanguage) {
      // Only change language if it's different from the current one
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]); // Run only once when the component mounts

  const displayCalendar = useCallback(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const numberOfDays = new Date(year, month + 1, 0).getDate();

    const daysArray = [];

    for (let x = 1; x <= firstDay; x++) {
      daysArray.push("");
    }

    for (let i = 1; i <= numberOfDays; i++) {
      let currentDate = new Date(year, month, i);
      daysArray.push(currentDate);
    }

    setDays(daysArray);
  }, [year, month]);

  useEffect(() => {
    displayCalendar();
  }, [displayCalendar]);

  const handlePreviousMonth = () => {
    setDays([]);
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    setDays([]);
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleSelectDate = (date) => {
    const formattedDate = date.toDateString();
    setSelectedDate(formattedDate);

    const matchingPoojas = poojas.filter((pooja) =>
      new Date(pooja.date).toDateString() === formattedDate
    );
    setSelectedPoojas(matchingPoojas);
  };

  useEffect(() => {
    fetchPoojas();
  }, []);

  const fetchPoojas = async () => {
    try {
      const response = await axios.get('https://templeclone-backend.onrender.com/api/specialPoojas', {
        withCredentials: true
      });
      setPoojas(response.data);
  
      // Filter poojas for the initially selected date
      const todayDate = new Date().toDateString();
      const matchingPoojas = response.data.filter(
        (pooja) => new Date(pooja.date).toDateString() === todayDate
      );
      setSelectedPoojas(matchingPoojas);
    } catch (error) {
      console.error('Error fetching poojas', error);
    }
  };

  return (
    <div className="homecontainerclander">
      <div className="row calendar-direction">
      
    <div className="col-lg-6">
      <div className="display-selected">
        <p className="selected homedate">
          {selectedDate ? `Selected Date: ${selectedDate}` : "No date selected"}
        </p>
        <div className="row">
          {selectedPoojas.length > 0 ? (
          selectedPoojas.map((pooja) => (
            <div key={pooja._id} className="col-md-6 mb-3">
              <div className="card cardbg">
                <div className="card-body cardtext">
                  <h5 className="card-title title home-text">
                  {i18n.language === 'ta' ? pooja.poojaname_ta : pooja.poojaname}
                  </h5>
                  <p className="card-text "><strong>{t('time')}:</strong> {pooja.starttime} - {pooja.endtime}</p>

                </div>
              </div>
            </div>
          ))
          ) : (
          <p className="homedate">{t('nopojaa')}</p>
          )}
        </div>
      </div>
      </div>
      <div className="col-lg-6 nopadding">
      <div className="homecalendar">
        <header>
          <pre className="left arror" onClick={handlePreviousMonth}>◀</pre>

          <div className="header-display">
            <p className="display">
              {new Date(year, month).toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <pre className="right arror" onClick={handleNextMonth}>▶</pre>
        </header>

        <div className="week">
          <div>Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
        </div>

        <div className="days">
          {days.map((day, index) => {
            const isToday = day && day.toDateString() === new Date().toDateString();
            const isSelected = day && day.toDateString() === selectedDate;

            const hasPooja = day && poojas.some((pooja) => new Date(pooja.date).toDateString() === day.toDateString());

            return (
              <div
                key={index}
                className={`day ${isToday ? "current-date" : ""} ${isSelected ? "selected-date" : ""} ${hasPooja ? "pooja-date" : ""}`}
                onClick={() => day && handleSelectDate(day)}
              >
                {day ? day.getDate() : ""}
              </div>
            );
          })}
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCalendar;
