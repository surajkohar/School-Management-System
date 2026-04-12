import React, { useState } from 'react';

const FilterDropdown = ({ 
  isOpen, 
  onClose, 
  onApply, 
  filters = {},
  filterOptions = {} 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = Object.keys(localFilters).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    setLocalFilters(clearedFilters);
    onApply(clearedFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="position-fixed top-0 start-0 w-100 h-100" 
        style={{ zIndex: 999 }}
        onClick={onClose}
      ></div>
      
      {/* Filter Dropdown */}
      <div className="filter-dropdown">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">
            <i className="bi bi-funnel me-2"></i>
            Filters
          </h6>
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={onClose}
          >
            <i className="bi bi-x"></i>
          </button>
        </div>

        <div className="row g-3">
          {/* Status Filter */}
          {filterOptions.status && (
            <div className="col-12">
              <label className="form-label">Status</label>
              <select 
                className="form-select form-select-sm"
                value={localFilters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                {filterOptions.status.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Class Filter */}
          {filterOptions.class && (
            <div className="col-6">
              <label className="form-label">Class</label>
              <select 
                className="form-select form-select-sm"
                value={localFilters.class || ''}
                onChange={(e) => handleFilterChange('class', e.target.value)}
              >
                <option value="">All Classes</option>
                {filterOptions.class.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Section Filter */}
          {filterOptions.section && (
            <div className="col-6">
              <label className="form-label">Section</label>
              <select 
                className="form-select form-select-sm"
                value={localFilters.section || ''}
                onChange={(e) => handleFilterChange('section', e.target.value)}
              >
                <option value="">All Sections</option>
                {filterOptions.section.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Department Filter */}
          {filterOptions.department && (
            <div className="col-12">
              <label className="form-label">Department</label>
              <select 
                className="form-select form-select-sm"
                value={localFilters.department || ''}
                onChange={(e) => handleFilterChange('department', e.target.value)}
              >
                <option value="">All Departments</option>
                {filterOptions.department.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Date Range */}
          {filterOptions.dateRange && (
            <>
              <div className="col-6">
                <label className="form-label">From Date</label>
                <input 
                  type="date"
                  className="form-control form-control-sm"
                  value={localFilters.dateFrom || ''}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                />
              </div>
              <div className="col-6">
                <label className="form-label">To Date</label>
                <input 
                  type="date"
                  className="form-control form-control-sm"
                  value={localFilters.dateTo || ''}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                />
              </div>
            </>
          )}

          {/* Custom Filters */}
          {filterOptions.custom && filterOptions.custom.map(filter => (
            <div key={filter.key} className={filter.colClass || 'col-12'}>
              <label className="form-label">{filter.label}</label>
              {filter.type === 'select' ? (
                <select 
                  className="form-select form-select-sm"
                  value={localFilters[filter.key] || ''}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                >
                  <option value="">{filter.placeholder || `All ${filter.label}`}</option>
                  {filter.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input 
                  type={filter.type || 'text'}
                  className="form-control form-control-sm"
                  placeholder={filter.placeholder}
                  value={localFilters[filter.key] || ''}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        <div className="d-flex gap-2 mt-3">
          <button 
            className="btn btn-primary btn-sm flex-fill"
            onClick={handleApply}
          >
            <i className="bi bi-check me-1"></i>
            Apply
          </button>
          <button 
            className="btn btn-outline-secondary btn-sm flex-fill"
            onClick={handleClear}
          >
            <i className="bi bi-arrow-clockwise me-1"></i>
            Clear
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterDropdown;