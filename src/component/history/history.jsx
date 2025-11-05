import React, { useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './history.css';
import { useTranslation } from 'react-i18next';

const History = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Ensure language matches localStorage
    const savedLanguage = localStorage.getItem('language') || 'en';
    if (i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  // Read history array from translations (returnObjects: true)
  // i18next will return the array exactly as you placed in your resources
  const historyArray = t('historyContent', { returnObjects: true });

  // fallback safe-check: if not an array, keep empty array
  const entries = Array.isArray(historyArray) ? historyArray : [];

  const isTamil = i18n.language === 'ta';

  return (
    <div className={`containerhistory`}>
      <h2 className={`history-title`}>{t('history') || 'History'}</h2>

      <Accordion defaultActiveKey="0" className="history-accordion mb-4">
        {entries.map((item, idx) => (
          <Accordion.Item eventKey={String(idx)} key={idx}>
            <Accordion.Header>
              <span className={isTamil ? 'tamil-font-history' : ''}>
                {item.heading}
              </span>
            </Accordion.Header>
            <Accordion.Body>
              <p className={`history-content ${isTamil ? 'tamil-font-history' : ''}`}>
                {item.content}
              </p>
            </Accordion.Body>
          </Accordion.Item>
        ))}
        {entries.length === 0 && (
          <Card.Body>
            <p>{t('nopojaa') || 'No history available.'}</p>
          </Card.Body>
        )}
      </Accordion>
    </div>
  );
};

export default History;
