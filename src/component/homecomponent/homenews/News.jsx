import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './news.css';

const News = () => {
    const [newsData, setNewsData] = useState([]);
    const scrollRef = useRef(null);
    const { i18n } = useTranslation(); // eslint-disable-next-line

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://templeclone-backend.onrender.com/api/news');
                setNewsData(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        fetchNews();
    }, []);

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') || 'en';
        if (i18n.language !== savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);

    // ✅ Auto adjust scroll speed based on content width
    useEffect(() => {
        if (!scrollRef.current) return;
        const contentWidth = scrollRef.current.scrollWidth;
        const containerWidth = scrollRef.current.parentElement.offsetWidth;
         
        if (contentWidth <= containerWidth) {
            scrollRef.current.style.animationDuration = '10s';
            return;
        }

        // Speed formula → bigger width = longer duration
        const duration = Math.max(10, contentWidth / 35); // adjust speed factor
        scrollRef.current.style.animationDuration = `${duration}s`;
    }, [newsData, i18n.language]);

    return (
        <div className="newscontainer">
            <div className="scroll-wrapper">
                <div className="scroll-content" ref={scrollRef}>
                    {newsData.concat(newsData).map((newsItem, index) => (
                        <div key={index} className="news-headline headerfont me-2">
                            {i18n.language === 'ta' ? newsItem.newsheadlines_ta : newsItem.newsheadlines_en}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;
