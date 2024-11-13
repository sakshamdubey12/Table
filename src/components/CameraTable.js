import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import SearchFilter from './SearchFilter';

const CameraTable = () => {
  const [cameras, setCameras] = useState([]); // Initialize as empty array
  const [filteredCameras, setFilteredCameras] = useState([]); // Initialize as empty array
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api-app-staging.wobot.ai/app/v1/fetch/cameras', {
          headers: { Authorization: `Bearer 4ApVMIn5sTxeW7GQ5VWeWiy` }
        });
        setCameras(response.data);
        console.log({cameras})
        setFilteredCameras(response.data);
      } catch (error) {
        console.error("Error fetching camera data:", error);
        setCameras([]); // Set as empty array in case of error
        setFilteredCameras([]);
      }
    };
    fetchData();
  }, []);
console.log(cameras)
  // Search and Filter Functionality
  useEffect(() => {
    const filtered = Array.isArray(cameras) ? cameras.filter(camera =>
      camera.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : []; // Default to empty array if cameras is not an array
    setFilteredCameras(filtered);
  }, [searchTerm, cameras]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(filteredCameras) ? filteredCameras.slice(indexOfFirstItem, indexOfLastItem) : [];

  // Delete Camera
  const deleteCamera = (id) => {
    setFilteredCameras(prev => prev.filter(camera => camera.id !== id));
  };

  // Toggle Status
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    await axios.post('https://api-app-staging.wobot.ai/app/v1/update/camera/status', 
      { id, status: newStatus },
      { headers: { Authorization: `Bearer 4ApVMIn5sTxeW7GQ5VWeWiy` } }
    );
    setFilteredCameras(prev =>
      prev.map(camera => camera.id === id ? { ...camera, status: newStatus } : camera)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(camera => (
            <tr key={camera.id}>
              <td className="py-2 px-4 border-b">{camera.id}</td>
              <td className="py-2 px-4 border-b">{camera.name}</td>
              <td className="py-2 px-4 border-b">{camera.status}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => toggleStatus(camera.id, camera.status)}
                >
                  Toggle Status
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteCamera(camera.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Pagination
        totalItems={filteredCameras?.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      /> */}
    </div>
  );
};

export default CameraTable;
