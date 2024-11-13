import React, { useEffect, useState } from "react";
import Logo from '../images/Vector.png';
import axios from 'axios';
import Pagination from './Pagination';

const Table = () => {
  const [cameras, setCameras] = useState([]);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter states
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api-app-staging.wobot.ai/app/v1/fetch/cameras', {
          headers: { Authorization: `Bearer 4ApVMIn5sTxeW7GQ5VWeWiy` }
        });
        console.log({response})
        setCameras(response.data.data);
      } catch (error) {
        console.error("Error fetching camera data:", error);
        setCameras([]);
      }
    };
    fetchData();
  }, []);

  const toggleLocationDropdown = () => setLocationDropdownOpen(!locationDropdownOpen);
  const toggleStatusDropdown = () => setStatusDropdownOpen(!statusDropdownOpen);

  // Extract unique locations and statuses
  const uniqueLocations = Array.from(new Set(cameras.map(camera => camera.location)));
  const uniqueStatuses = Array.from(new Set(cameras.map(camera => camera.status)));

  // Filter functions
  const filterByLocation = (location) => {
    setSelectedLocation(location);
    setCurrentPage(1);
  };

  const filterByStatus = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  // Apply location and status filters
  const filteredCameras = cameras.filter(camera => 
    (!selectedLocation || camera.location === selectedLocation) &&
    (!selectedStatus || camera.status === selectedStatus)
  );

  // Calculate displayed cameras for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCameras = filteredCameras.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-5 flex flex-col relative">
      <div className="flex justify-center">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="flex justify-between mt-8">
        <div>
          <h1>Cameras</h1>
          <p className="mt-3">Manage your cameras here.</p>
        </div>
        <input
          type="text"
          id="table-search"
          placeholder="Search for items"
          className="block p-2 text-sm border border-gray-300 rounded-lg w-80"
        />
      </div>

      {/* Dropdown Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center pb-4 relative">
        {/* Location Dropdown */}
        <div className="relative">
          <button
            onClick={toggleLocationDropdown}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
          >
            {selectedLocation || 'Location'}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {locationDropdownOpen && (
            <div className="absolute overflow-y-scroll h-80 top-12 left-0 z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow">
              <ul className="p-3 space-y-1 text-sm text-gray-700">
                <li>
                  <button onClick={() => filterByLocation(null)} className="w-full text-left p-2 hover:bg-gray-100">
                    All Locations
                  </button>
                </li>
                {uniqueLocations.map((location) => (
                  <li key={location}>
                    <button onClick={() => filterByLocation(location)} className="w-full text-left p-2 hover:bg-gray-100">
                      {location}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <button
            onClick={toggleStatusDropdown}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
          >
            {selectedStatus || 'Status'}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {statusDropdownOpen && (
            <div className="absolute top-12 left-0 z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow">
              <ul className="p-3 space-y-1 text-sm text-gray-700">
                <li>
                  <button onClick={() => filterByStatus(null)} className="w-full text-left p-2 hover:bg-gray-100">
                    All Statuses
                  </button>
                </li>
                {uniqueStatuses.map((status) => (
                  <li key={status}>
                    <button onClick={() => filterByStatus(status)} className="w-full text-left p-2 hover:bg-gray-100">
                      {status}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th className="p-4">Select</th>
              <th className="px-6 py-3">NAME</th>
              <th className="px-6 py-3">HEALTH</th>
              <th className="px-6 py-3">LOCATION</th>
              <th className="px-6 py-3">RECORDER</th>
              <th className="px-6 py-3">TASK</th>
              <th className="px-6 py-3">STATUS</th>
              <th className="px-6 py-3">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentCameras.map((camera) => (
              <tr key={camera.id} className="bg-white border-b">
                <td className="p-4"><input type="checkbox" /></td>
                <td className="px-6 py-4">{camera.name}</td>
                <td className="px-6 py-4">{camera.health ? `${camera.health.cloud}, ${camera.health.device}` : 'N/A'}</td>
                <td className="px-6 py-4">{camera.location}</td>
                <td className="px-6 py-4">{camera.recorder}</td>
                <td className="px-6 py-4">{camera.task}</td>
                <td className="px-6 py-4">{camera.status}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        totalItems={filteredCameras.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Table;
