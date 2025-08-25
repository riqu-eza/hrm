"use client";

import React from "react";

export default function PropertyAdminOverview() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Property Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Welcome to your property management dashboard. Use the sidebar to
        navigate between properties, rooms, tenants, and payments.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="font-semibold">Total Properties</h2>
          <p className="text-2xl">5</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="font-semibold">Active Tenants</h2>
          <p className="text-2xl">120</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="font-semibold">Pending Payments</h2>
          <p className="text-2xl">12</p>
        </div>
      </div>
    </div>
  );
}
