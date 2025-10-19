import "./video.css";
import Pooja from "../../../assests/pooja.png";
import Festival from "../../../assests/temple.png";
import HomeCalendar from "../homecalendar/HomeCalendar";
import VideoCarousel from "../videoslider/VideoCarousel";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Video = () => {
  const [festival, SetFestival] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    if (i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  useEffect(() => {
    axios
      .get("https://templeclone-backend.onrender.com/api/uthchavams")
      .then((response) => {
        const currentDate = new Date();
        const filteredFestivals = response.data
          .filter((festival) => {
            const endDate = new Date(festival.enddate);
            return endDate > currentDate;
          })
          .map((festival) => festival.imageurls[0]);
        SetFestival(filteredFestivals);
      })
      .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
      });
  }, []);

  const isPdf = (url) => url && url.endsWith(".pdf");

  return (
    <>
      <div className="container containerbanner">
        <div className="row">
          {/* Left Side */}
          <div className="col-md-3">
          {festival[0] ? (
  isPdf(festival[0]) ? (
    // PDF Preview with hover effect and full PDF button
    <div className="pdf-container">
      <iframe
        src={festival[0]}
        title="PDF Preview"
        className="pdf-embed"
      ></iframe>
      <a href={festival[0]} target="_blank" rel="noopener noreferrer">
        <button className="full-pdf-button ">Full PDF</button>
      </a>
    </div>
  ) : (
    // Image Preview with click event
    <img
      src={festival[0]}
      alt="Festival Preview 1"
      className="homecard prev_image"
      onClick={() => window.open(festival[0], "_blank")}
    />
  )
) : (
  // Default card if no URL
  <div className="homecard">
    <div className="homecard-details">
      <img src={Pooja} alt="Pooja" className="cardimg" />
      <p className="card-text-body">{t("card1")}</p>
    </div>
    <a className="home-card-button" href="/festival">
      {t("cardbtn")}
    </a>
  </div>
)}

          </div>

          {/* Video Player */}
          <div className="col-md-6">
            <iframe
              className="videoplayer"
              src="https://www.youtube.com/embed/Cvwua8a89LY?si=M9DST4lqYFtMbwBl"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          {/* Right Side */}
          <div className="col-md-3">
            {festival[1] ? (
              isPdf(festival[1]) ? (
                <div className="pdf-container">
                <iframe
                  src={festival[1]}
                  title="PDF Preview"
                  className="pdf-embed"
                ></iframe>
                <a href={festival[1]} target="_blank" rel="noopener noreferrer">
                  <button className="full-pdf-button ">Full PDF</button>
                </a>
              </div>
              ) : (
                // Image Preview with click event
                <img
                  src={festival[1]}
                  alt="Festival Preview 2"
                  className="homecard prev_image"
                  onClick={() => window.open(festival[1], "_blank")}
                />
              )
            ) : (
              // Default card if no URL
              <div className="homecard">
                <div className="homecard-details">
                  <img src={Festival} alt="Festival" className="cardimg" />
                  <p className="card-text-body">{t("card2")}</p>
                </div>
                <a className="home-card-button" href="/pooja">
                  {t("cardbtn")}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="calendarposition">
          <HomeCalendar />
        </div>
        <div className="calendarposition">
          <VideoCarousel />
        </div>
      </div>
    </>
  );
};

export default Video;
