import React from "react";

const AdminPanel: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="space-y-4">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p>View, add, or remove users. (Feature coming soon)</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Order Management</h2>
          <p>View and manage orders. (Feature coming soon)</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Menu Management</h2>
          <p>Edit menu items. (Feature coming soon)</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
