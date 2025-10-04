"use client";

import React from "react";
import { 
  BuildingOfficeIcon, 
  UsersIcon, 
  CurrencyDollarIcon,
  DocumentCheckIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

export default function PropertyAdminOverview() {
  // Dummy data - will be replaced with API data
  const statsData = {
    properties: {
      total: 8,
      occupied: 6,
      vacant: 2,
      maintenance: 1
    },
    tenants: {
      total: 24,
      active: 22,
      pending: 2
    },
    financials: {
      monthlyRevenue: 450000,
      pendingPayments: 85000,
      collectedThisMonth: 365000
    },
    maintenance: {
      pending: 3,
      inProgress: 2,
      completed: 12
    }
  };

  const recentActivities = [
    { id: 1, type: 'payment', message: 'John Doe paid rent for Property A', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'maintenance', message: 'New maintenance request for Property C', time: '5 hours ago', status: 'pending' },
    { id: 3, type: 'tenant', message: 'New tenant application received', time: '1 day ago', status: 'pending' },
    { id: 4, type: 'payment', message: 'Rent reminder sent to 3 tenants', time: '1 day ago', status: 'info' }
  ];

  const quickActions = [
    { title: 'Add Property', description: 'Register new property', icon: BuildingOfficeIcon, href: '/properties/add', color: 'blue' },
    { title: 'Collect Rent', description: 'Process payments', icon: CurrencyDollarIcon, href: '/payments/collect', color: 'green' },
    { title: 'Maintenance', description: 'Handle requests', icon: WrenchScrewdriverIcon, href: '/maintenance', color: 'orange' },
    { title: 'Reports', description: 'View analytics', icon: ChartBarIcon, href: '/reports', color: 'purple' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Property Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Here&#39;s your property management overview for today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Properties Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Properties</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{statsData.properties.total}</p>
              <div className="flex gap-4 mt-3 text-xs">
                <span className="text-green-600">{statsData.properties.occupied} occupied</span>
                <span className="text-blue-600">{statsData.properties.vacant} vacant</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Tenants Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Tenants</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{statsData.tenants.active}</p>
              <div className="flex gap-4 mt-3 text-xs">
                <span className="text-gray-600">Total: {statsData.tenants.total}</span>
                <span className="text-orange-600">{statsData.tenants.pending} pending</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <UsersIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                KSh {statsData.financials.monthlyRevenue.toLocaleString()}
              </p>
              <div className="flex gap-4 mt-3 text-xs">
                <span className="text-green-600">
                  Collected: KSh {statsData.financials.collectedThisMonth.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <CurrencyDollarIcon className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Maintenance Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Maintenance</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{statsData.maintenance.pending}</p>
              <div className="flex gap-4 mt-3 text-xs">
                <span className="text-blue-600">{statsData.maintenance.inProgress} in progress</span>
                <span className="text-gray-600">{statsData.maintenance.completed} completed</span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <WrenchScrewdriverIcon className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`p-3 rounded-lg mb-2 ${
                  action.color === 'blue' ? 'bg-blue-100' :
                  action.color === 'green' ? 'bg-green-100' :
                  action.color === 'orange' ? 'bg-orange-100' : 'bg-purple-100'
                }`}>
                  <action.icon className={`w-6 h-6 ${
                    action.color === 'blue' ? 'text-blue-600' :
                    action.color === 'green' ? 'text-green-600' :
                    action.color === 'orange' ? 'text-orange-600' : 'text-purple-600'
                  }`} />
                </div>
                <span className="text-sm font-medium text-gray-900">{action.title}</span>
                <span className="text-xs text-gray-500 mt-1">{action.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 mt-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'pending' ? 'bg-orange-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Payments Section */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Pending Payments</h2>
          <span className="text-sm text-orange-600 font-medium">
            KSh {statsData.financials.pendingPayments.toLocaleString()} total
          </span>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DocumentCheckIcon className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">
                {statsData.financials.pendingPayments > 0 ? 'Action Required' : 'All payments collected'}
              </span>
            </div>
            <button className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors">
              View Details
            </button>
          </div>
          {statsData.financials.pendingPayments > 0 && (
            <p className="text-xs text-orange-700 mt-2">
              You have pending rent payments that need attention
            </p>
          )}
        </div>
      </div>
    </div>
  );
}