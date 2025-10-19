import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Videocarousel.css';

const VideoCarousel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2100,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const handleVideoClick = (videoSrc) => {
    setSelectedVideo(videoSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo("");
  };

  return (
    <div className="clientcontainer mt-2">
      <div className="container">
        <section className="customer-logos">
          <Slider {...settings}>
            {[
              "https://www.youtube.com/embed/bSPhXsxh_1o",
              "https://www.youtube.com/embed/GxPoIVcl7AM",
              "https://www.youtube.com/embed/5LrSab9ybaU",
              "https://www.youtube.com/embed/wFqG_LLin5c",
            ].map((videoSrc, index) => (
              <div className="slide" key={index}>
                <div
                  className="video-overlay"
                  onClick={() => handleVideoClick(videoSrc)}
                >
                  <iframe
                    width="100%"
                    height="200"
                    src={`${videoSrc}?autoplay=0`}
                    title={`Video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </Slider>
        </section>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="video-modal" onClick={closeModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <iframe
              width="100%"
              height="500"
              src={`${selectedVideo}?autoplay=1`}
              title="Selected Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCarousel;
