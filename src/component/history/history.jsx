import React, { useEffect } from 'react';
import './history.css';
import { useTranslation } from 'react-i18next'; 
const History = () => {
  
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
    const paragraphs = document.querySelectorAll('.para1, .para2, .para3, .para4, .para5, .para6');
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
    return(
        <>
        <div className='container containerbanner'>
            <div className='row'>
                <div className='col-12'>
                    <p className='para1'>
                    {t('homecontent3')}
               </p>
                <p className='para2'>
                  {t('historypara2')}
                </p>
                </div>
                <div className='col-12'>
                    <h5 className='headcontent1'>{t('historyhead1')}</h5>
                    <div className='line2'></div>
                    <p className='para3'>
                    {t('historypara3')}
                    </p>
                </div>
                <div className='col-12'>
                    <h5 className='headcontent1'>{t('historyhead2')}</h5>
                    <div className='line2'></div>
                    <p className='para4'>
                    {t('historypara4')}
                    </p>
                </div>
                <div className='col-12'>
                    <h5 className='headcontent1'>{t('historyhead3')}</h5>
                    <div className='line2'></div>
                    <p className='para5'>
                    {t('historypara5')}
                    </p>
                </div>
                <div className='col-12'>
                    <h5 className='headcontent1'>{t('historyhead4')}</h5>
                    <div className='line2'></div>
                    <p className='para6'>
                    {t('historypara6')}
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default History