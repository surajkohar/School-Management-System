import React, { useState } from 'react';

const DataTable = ({ 
  columns, 
  data, 
  loading, 
  onSort, 
  sortField, 
  sortOrder,
  onEdit,
  onDelete,
  onView,
  actions = true,
  bulkActions = false,
  onBulkAction,
  selectedItems = [],
  onSelectItem,
  onSelectAll
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    onSort(field, order);
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return 'bi-arrow-down-up';
    return sortOrder === 'asc' ? 'bi-arrow-up' : 'bi-arrow-down';
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (itemToDelete && onDelete) {
      onDelete(itemToDelete);
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading data...</p>
        </div>
      </div>
    );
  }

  const allSelected = data.length > 0 && selectedItems.length === data.length;
  const someSelected = selectedItems.length > 0 && selectedItems.length < data.length;

  return (
    <>
      <div className="card custom-table">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                {bulkActions && (
                  <th width="50">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={allSelected}
                        ref={input => {
                          if (input) input.indeterminate = someSelected;
                        }}
                        onChange={(e) => onSelectAll(e.target.checked)}
                      />
                    </div>
                  </th>
                )}
                {columns.map((column) => (
                  <th 
                    key={column.key}
                    className={column.sortable ? 'cursor-pointer' : ''}
                    onClick={column.sortable ? () => handleSort(column.key) : undefined}
                  >
                    {column.title}
                    {column.sortable && (
                      <i className={`bi ${getSortIcon(column.key)} sort-arrow`}></i>
                    )}
                  </th>
                ))}
                {actions && <th width="150">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row, index) => (
                  <tr key={row.id || index}>
                    {bulkActions && (
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedItems.includes(row.id)}
                            onChange={(e) => onSelectItem(row.id, e.target.checked)}
                          />
                        </div>
                      </td>
                    )}
                    {columns.map((column) => (
                      <td key={column.key}>
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                      </td>
                    ))}
                    {actions && (
                      <td>
                        <div className="btn-group btn-group-sm">
                          {onView && (
                            <button 
                              className="btn btn-outline-info"
                              onClick={() => onView(row)}
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                          )}
                          {onEdit && (
                            <button 
                              className="btn btn-outline-primary"
                              onClick={() => onEdit(row)}
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                          )}
                          {onDelete && (
                            <button 
                              className="btn btn-outline-danger"
                              onClick={() => handleDeleteClick(row)}
                              title="Delete"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + (actions ? 1 : 0) + (bulkActions ? 1 : 0)} className="text-center py-5">
                    <div className="text-muted">
                      <i className="bi bi-inbox fs-1 d-block mb-3"></i>
                      <p>No data found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title text-danger">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Confirm Delete
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={cancelDelete}
                ></button>
              </div>
              <div className="modal-body">
                <div className="text-center py-3">
                  <div className="mb-3">
                    <i className="bi bi-trash3 text-danger" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h6 className="mb-3">Are you sure you want to delete this record?</h6>
                  <p className="text-muted mb-0">
                    This action cannot be undone. The record will be permanently removed from the system.
                  </p>
                  {itemToDelete && itemToDelete.name && (
                    <div className="alert alert-warning mt-3">
                      <strong>Record:</strong> {itemToDelete.name}
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={cancelDelete}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  <i className="bi bi-trash me-2"></i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataTable;