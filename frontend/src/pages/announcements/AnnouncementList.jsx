import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const pageSize = 10;

  // Mock data
  const mockAnnouncements = [
    {
      id: 1,
      title: 'School Reopening Notice',
      content: 'School will reopen on April 15th, 2024 after the spring break.',
      targetAudience: 'All Students',
      priority: 'High',
      status: 'Published',
      createdBy: 'Admin',
      createdAt: '2024-04-01',
      publishDate: '2024-04-01'
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      content: 'Parent-teacher meeting scheduled for April 20th, 2024.',
      targetAudience: 'Parents',
      priority: 'Medium',
      status: 'Published',
      createdBy: 'Principal',
      createdAt: '2024-03-28',
      publishDate: '2024-03-28'
    },
    {
      id: 3,
      title: 'Sports Day Event',
      content: 'Annual sports day will be held on May 5th, 2024.',
      targetAudience: 'All Students',
      priority: 'Medium',
      status: 'Draft',
      createdBy: 'Sports Teacher',
      createdAt: '2024-03-25',
      publishDate: null
    },
    {
      id: 4,
      title: 'Exam Schedule Released',
      content: 'Second terminal exam schedule has been published.',
      targetAudience: 'Students & Parents',
      priority: 'High',
      status: 'Published',
      createdBy: 'Academic Head',
      createdAt: '2024-03-20',
      publishDate: '2024-03-20'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setAnnouncements(mockAnnouncements);
      setTotalCount(mockAnnouncements.length);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    {
      key: 'title',
      title: 'Title',
      sortable: true
    },
    {
      key: 'targetAudience',
      title: 'Target Audience',
      sortable: true
    },
    {
      key: 'priority',
      title: 'Priority',
      render: (value) => (
        <span className={`badge bg-${
          value === 'High' ? 'danger' : 
          value === 'Medium' ? 'warning' : 'info'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span className={`badge bg-${
          value === 'Published' ? 'success' : 
          value === 'Draft' ? 'secondary' : 'warning'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'createdBy',
      title: 'Created By',
      sortable: true
    },
    {
      key: 'createdAt',
      title: 'Created Date',
      render: (value) => new Date(value).toLocaleDateString(),
      sortable: true
    },
    {
      key: 'publishDate',
      title: 'Publish Date',
      render: (value) => value ? new Date(value).toLocaleDateString() : '-'
    }
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field, order) => {
    setSortField(field);
    setSortOrder(order);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleView = (announcement) => {
    console.log('View announcement:', announcement.id);
  };

  const handleEdit = (announcement) => {
    console.log('Edit announcement:', announcement.id);
  };

  const handleDelete = (announcement) => {
    if (window.confirm(`Are you sure you want to delete "${announcement.title}"?`)) {
      console.log('Delete announcement:', announcement.id);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="announcement-list animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Announcements</h1>
        <button className="btn btn-primary btn-custom">
          <i className="bi bi-plus-circle me-2"></i>
          Create Announcement
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search announcements..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="d-flex gap-2 justify-content-end">
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-funnel me-1"></i>
                  Filters
                </button>
                <button className="btn btn-outline-success">
                  <i className="bi bi-download me-1"></i>
                  Export
                </button>
                <button className="btn btn-outline-info">
                  <i className="bi bi-printer me-1"></i>
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={announcements}
        loading={loading}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AnnouncementList;