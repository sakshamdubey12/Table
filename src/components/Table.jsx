import React, {useEffect,useState } from "react";
import Logo from '../images/Vector.png';
import axios from 'axios';


const Table = () => {
  const [cameras, setCameras] = useState([]); // Initialize as empty array
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://api-app-staging.wobot.ai/app/v1/fetch/cameras', {
              headers: { Authorization: `Bearer 4ApVMIn5sTxeW7GQ5VWeWiy` }
            });
            setCameras(response.data.data);
            console.log(cameras,"---")
          } catch (error) {
            console.error("Error fetching camera data:", error);
            setCameras([]); // Set as empty array in case of error
          }
        };
        fetchData();
      }, []);

    

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleStatusDropdown = () => {
        setStatusDropdownOpen(!statusDropdownOpen);
    };

    return (
        <div className="p-5 flex flex-col">
            <div className="flex justify-center">
                <img src={Logo} alt="" />
            </div>
            <div className="flex justify-between mt-8">
                <div>
                    <h1>Cameras</h1>
                    <p className="mt-3">Manage your cameras here.</p>
                </div>
                <div className="relative mt-4">
                    <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for items"
                    />
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
                <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center pb-4">
                    <div>
                        <button
                            onClick={toggleDropdown}
                            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                        >
                            Location
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
                        {dropdownOpen && (
                            <div className="z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                                    <li><div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"><input id="filter-radio-example-1" type="radio" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600" /><label htmlFor="filter-radio-example-1" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last day</label></div></li>
                                    {/* Additional options here */}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Status Dropdown */}
                    <div>
                        <button
                            onClick={toggleStatusDropdown}
                            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                        >
                            Status
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
                            <div className="z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                                    <li><div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"><input id="status-active" type="radio" name="status-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600" /><label htmlFor="status-active" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Active</label></div></li>
                                    <li><div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"><input id="status-inactive" type="radio" name="status-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600" /><label htmlFor="status-inactive" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Inactive</label></div></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                NAME
              </th>
              <th scope="col" className="px-6 py-3">
                HEALTH
              </th>
              <th scope="col" className="px-6 py-3">
                LOCATION
              </th>
              <th scope="col" className="px-6 py-3">
                RECORDER
              </th>
              <th scope="col" className="px-6 py-3">
                TASK
              </th>
              <th scope="col" className="px-6 py-3">
                STATUS
              </th>
              <th scope="col" className="px-6 py-3">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {cameras.map((camera) => (
              <tr key={camera.id} className="bg-white border-b hover:bg-gray-50">
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4">{camera.name}</td>
                {/* Render specific nested properties or JSON stringify as needed */}
                <td className="px-6 py-4">
                  {typeof camera.health === 'object' 
                    ? camera.health.cloud && camera.health.device   
                    : camera.location}
                </td>
                <td className="px-6 py-4">{camera.location}</td>
                
                
                <td className="px-6 py-4">
                  {camera.recorder}
                </td>
                
                <td className="px-6 py-4">{camera.task}</td>
                <td className="px-6 py-4">{camera.status}</td>
                <td className="px-6 py-4">
                  <button className="font-medium text-blue-600 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
