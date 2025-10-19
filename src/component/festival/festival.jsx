import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next'; 

const Festival = () => {
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2, // Trigger when 20% of the element is visible
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate'); // Add 'animate' class when in view
          observer.unobserve(entry.target); // Stop observing once animation is triggered
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Select all paragraphs and headings by their class
    const paragraphs = document.querySelectorAll('.para1, .para2, .para3');
    const headings = document.querySelectorAll('.headcontent1, .line1, .line2');

    paragraphs.forEach(paragraph => {
      observer.observe(paragraph); // Observe all paragraphs
    });

    headings.forEach(heading => {
      observer.observe(heading); // Observe all headings and lines
    });

    return () => {
      paragraphs.forEach(paragraph => {
        observer.unobserve(paragraph); // Cleanup observer for all paragraphs
      });

      headings.forEach(heading => {
        observer.unobserve(heading); // Cleanup observer for all headings
      });
    };
  }, []);
  const { t, i18n } = useTranslation(); // useTranslation hook
   
  useEffect(() => {
      // Get the saved language from localStorage
      const savedLanguage = localStorage.getItem('language') || 'en'; // Default to 'en' if not set
      if (i18n.language !== savedLanguage) {
        // Only change language if it's different from the current one
        i18n.changeLanguage(savedLanguage);
      }
    }, [i18n]); // Run only once when the component mounts
    const isTamil = i18n.language === 'ta';

    return(
        <>
        <div className='container containerbanner'>
            <div className={`row ${isTamil ? 'tamil-font' : ''}`}>
                <div className='col-12'>
                    <h5 className='headcontent1'>{t('festivalhead1')}</h5>
                    <div className='line2'></div>
                    <p className='para1'>
                    {t('festivalpara1')}
                    </p>
                    <p className='para2'>
                    {t('festivalpara2')} 
                    </p>
                </div>
                <div className='col-12'>
                    <h5 className='headcontent1'>{t('festivalhead2')}</h5>
                    <div className='line2'></div>
                    <p className='para3'>
                    {t('festivalpara3')} 
                    </p>
                </div>
                
            </div>
        </div>
        </>
    )
}

export default Festival