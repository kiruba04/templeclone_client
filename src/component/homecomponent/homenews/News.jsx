import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './news.css';

const News = () => {
    const [newsData, setNewsData] = useState([]);
    // eslint-disable-next-line
    const { t, i18n } = useTranslation(); // useTranslation hook

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://venkatesaperumal-backend.onrender.com/api/news'); // Adjust the URL as needed
                setNewsData(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    useEffect(() => {
        // Get the saved language from localStorage
        const savedLanguage = localStorage.getItem('language') || 'en'; // Default to 'en' if not set
        if (i18n.language !== savedLanguage) {
            // Only change language if it's different from the current one
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);

    return (
        <div className="newscontainer">
            <div className="scroll-wrapper">
                <div className="scroll-content">
                    {newsData.map((newsItem, index) => (
                        <div key={index} className="news-headline headerfont me-2">
                            <div>{i18n.language === 'ta' ? newsItem.newsheadlines_ta : newsItem.newsheadlines_en}</div>
                        </div>
                    ))}
                    {newsData.map((newsItem, index) => (
                        <div key={index} className="news-headline headerfont me-2">
                            <div>{i18n.language === 'ta' ? newsItem.newsheadlines_ta : newsItem.newsheadlines_en}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;
