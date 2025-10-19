import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import FeedbackCard from '../feedbackcard/FeedbackCard';
import './FeedbackPage.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
const FeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filterMode, setFilterMode] = useState('all');

  useEffect(() => {
    fetchFeedback();
  }, []);
   const navigate = useNavigate();
  const applySidebarFilter = useCallback(() => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    let filtered = [...feedbackList];

    if (filterMode === 'today') {
      filtered = filtered.filter((f) => {
        const dateStr = new Date(f.timestamp).toISOString().split('T')[0];
        return dateStr === todayStr;
      });
    } else if (filterMode === 'past') {
      filtered = filtered.filter((f) => {
        const dateStr = new Date(f.timestamp).toISOString().split('T')[0];
        return dateStr < todayStr;
      });
    }

    setFilteredList(filtered);
  }, [feedbackList, filterMode]);

  useEffect(() => {
    applySidebarFilter();
  }, [applySidebarFilter]);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get('https://venkatesaperumal-backend.onrender.com/api/feedback/all');
      const sorted = res.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setFeedbackList(sorted);
      setFilteredList(sorted);
    } catch (err) {
      console.error('Error fetching feedback:', err);
    }
  };

  const handleFilter = () => {
    let filtered = [...feedbackList];

    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.fullname?.toLowerCase().includes(term) ||
          f.email?.toLowerCase().includes(term) ||
          f.phone?.toString().includes(term)
      );
    }

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      filtered = filtered.filter((f) => {
        const date = new Date(f.timestamp);
        return date >= from && date <= to;
      });
    }

    setFilteredList(filtered);
  };

  const handleReset = () => {
    setSearch('');
    setFromDate('');
    setToDate('');
    applySidebarFilter();
  };

  const handleLogout = async () => {
    try {
      await axios.post('https://venkatesaperumal-backend.onrender.com/api/auth/logout', {}, {
        withCredentials: true // Ensure cookies are sent
      });

      // Delete the 'access_token' cookie
      document.cookie = 'access_token=; max-age=0; domain=localhost; path=/';
      localStorage.removeItem('user');

      // Update local state to reflect logout
      
      navigate('/');
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 sidenavbar ">
          <h4 className='mb-4 text-center'>Feedback Navigation</h4>
          <button
            className={`btn w-100 mb-2 ${filterMode === 'all' ? 'btn-success text-white' : 'btn-outline-success'}`}
            onClick={() => setFilterMode('all')}
          >
            All Feedback
          </button>

          <button
            className={`btn w-100 mb-2 ${filterMode === 'today' ? 'btn-success text-white' : 'btn-outline-success'}`}
            onClick={() => setFilterMode('today')}
          >
            Today Feedback
          </button>
          <button
            className={`btn w-100 mb-2 ${filterMode === 'past' ? 'btn-success text-white' : 'btn-outline-success'}`}
            onClick={() => setFilterMode('past')}
          >
            Past Feedback
          </button>
          <div className="logout-container">
        <Button variant="outline-danger" className="logoutbtn" onClick={handleLogout}>
          Logout
        </Button>
      </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 main-content">
          <div className="filter-box row mb-4">
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Search name/email/phone"
                value={search}
                className="form-control"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="date"
                value={fromDate}
                className="form-control"
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="date"
                value={toDate}
                className="form-control"
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div className="col-md-3 d-flex gap-2">
              <button className="btn btn-primary w-50" onClick={handleFilter}>
                Filter
              </button>
              <button className="btn btn-secondary w-50" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>

          <div className="row">
            {filteredList.length > 0 ? (
              filteredList.map((fb) => (
                <div className="col-md-4 mb-4" key={fb._id}>
                  <FeedbackCard feedback={fb} />
                </div>
              ))
            ) : (
              <div className="col-12">
                <p className="text-muted">No feedback found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
