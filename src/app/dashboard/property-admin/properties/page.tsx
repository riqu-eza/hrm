"use client";
import { useUser } from "@/app/context/UserContext";
import { useEffect, useState } from "react";
import { 
  BuildingOfficeIcon, 
  PlusIcon, 
  XMarkIcon,
  HomeModernIcon,
  UserIcon,
  CurrencyDollarIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from "@heroicons/react/24/outline";

type Tenant = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
};

type Room = {
  _id: string;
  name: string;
  type: string;
  price: number;
  status: "available" | "occupied";
  tenant?: Tenant;
};

type Property = {
  _id: string;
  name: string;
  address: string;
  rooms?: Room[];
};

export default function MyProperties() {
  const { user, loading } = useUser();
  const [properties, setProperties] = useState<Property[]>([]);
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [newProperty, setNewProperty] = useState({ name: "", address: "" });
  const [newRoom, setNewRoom] = useState({ name: "", type: "", price: 0 });
  const [showPropertyForm, setShowPropertyForm] = useState(false);

  // Fetch properties
  useEffect(() => {
    if (!user || loading) return;
    fetch(`/api/properties?userId=${user.userId}`)
      .then((res) => res.json())
      .then(setProperties);
  }, [user, loading]);

  // Create property
  const handleCreate = async () => {
    if (!user) return;
    const res = await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newProperty,
        adminIds: [user.userId],
      }),
    });
    const data = await res.json();
    setProperties([...properties, data]);
    setNewProperty({ name: "", address: "" });
    setShowPropertyForm(false);
  };

  // Create room
  const handleCreateRoom = async () => {
    if (!activeProperty) return;
    const res = await fetch("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newRoom,
        propertyId: activeProperty._id,
      }),
    });
    const room = await res.json();

    // update state
    setProperties((prev) =>
      prev.map((p) =>
        p._id === activeProperty._id
          ? { ...p, rooms: [...(p.rooms || []), room] }
          : p
      )
    );
    setNewRoom({ name: "", type: "", price: 0 });
  };

  // Calculate property stats
  const getPropertyStats = (property: Property) => {
    const rooms = property.rooms || [];
    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter(room => room.status === "occupied").length;
    const monthlyRevenue = rooms
      .filter(room => room.status === "occupied")
      .reduce((sum, room) => sum + room.price, 0);
    
    return { totalRooms, occupiedRooms, monthlyRevenue };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Properties</h1>
            <p className="mt-2 text-gray-600">Manage your listed properties and rooms</p>
          </div>
          <button
            onClick={() => setShowPropertyForm(true)}
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Add Property
          </button>
        </div>
      </div>

      {/* Add Property Modal */}
      {showPropertyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Add New Property</h2>
              <button
                onClick={() => setShowPropertyForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Sunshine Apartments"
                  value={newProperty.name}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Full property address"
                  value={newProperty.address}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, address: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCreate}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Create Property
                </button>
                <button
                  onClick={() => setShowPropertyForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Properties Grid */}
      {properties.length === 0 ? (
        <div className="text-center py-12">
          <BuildingOfficeIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties yet</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first property</p>
          <button
            onClick={() => setShowPropertyForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Add Your First Property
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((property) => {
            const stats = getPropertyStats(property);
            return (
              <div key={property._id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{property.name}</h3>
                        <p className="text-gray-500 text-sm mt-1">{property.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{stats.totalRooms}</div>
                      <div className="text-xs text-gray-500">Total Rooms</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{stats.occupiedRooms}</div>
                      <div className="text-xs text-gray-500">Occupied</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        KSh {stats.monthlyRevenue.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">Monthly</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveProperty(property)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <HomeModernIcon className="w-4 h-4" />
                    Manage Rooms
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Property Manager Modal */}
      {activeProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{activeProperty.name}</h2>
                <p className="text-gray-500 text-sm mt-1">{activeProperty.address}</p>
              </div>
              <button
                onClick={() => setActiveProperty(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Rooms Table */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rooms</h3>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Room
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tenant
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {activeProperty.rooms?.map((room) => (
                          <tr key={room._id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <HomeModernIcon className="w-4 h-4 text-gray-400" />
                                <span className="font-medium text-gray-900">{room.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-600">{room.type}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-1">
                                <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />
                                <span className="font-medium">KSh {room.price.toLocaleString()}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  room.status === "available"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {room.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {room.status === "occupied" ? (
                                <div className="flex items-center gap-2">
                                  <UserIcon className="w-4 h-4 text-gray-400" />
                                  <span className="font-medium text-gray-900">{room.tenant?.name}</span>
                                </div>
                              ) : (
                                <span className="text-gray-400 italic">Vacant</span>
                              )}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end gap-2">
                                {room.status === "available" ? (
                                  <button className="text-blue-600 hover:text-blue-700 p-1 rounded transition-colors">
                                    <PlusIcon className="w-4 h-4" />
                                  </button>
                                ) : (
                                  <button className="text-green-600 hover:text-green-700 p-1 rounded transition-colors">
                                    <EyeIcon className="w-4 h-4" />
                                  </button>
                                )}
                                <button className="text-gray-600 hover:text-gray-700 p-1 rounded transition-colors">
                                  <PencilIcon className="w-4 h-4" />
                                </button>
                                <button className="text-red-600 hover:text-red-700 p-1 rounded transition-colors">
                                  <TrashIcon className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Add Room Form */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Room</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Room 101"
                      value={newRoom.name}
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, name: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Single, Double"
                      value={newRoom.type}
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, type: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Price (KSh)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={newRoom.price}
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, price: Number(e.target.value) })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  onClick={handleCreateRoom}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  Add Room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}