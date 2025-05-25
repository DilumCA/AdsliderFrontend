import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import ImageCropperModal from "./ImageCropperModal";
import dataURLtoFile from "./utils/dataURLtoFile";

function Form({ onCancel,onSuccess,editAd }) {


  const [title, setTitle] = useState(editAd?.title || "");
  const [description, setDescription] = useState(editAd?.description || "");
  // const [startDate, setStartDate] = useState(editAd?.startDate || "");
  // const [endDate, setEndDate] = useState(editAd?.endDate || "");
  const [selectedAgeRanges, setSelectedAgeRanges] = useState(editAd?.ageRange || []);
  const [selectedDistricts, setSelectedDistricts] = useState(editAd?.districts || []);
  const [selectedPlanType, setSelectedPlanType] = useState(editAd?.planType || []);
  const [selectedConnections, setSelectedConnections] = useState(editAd?.connectionTypes || []);
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState({
    adSinhala: editAd?.adSinhala || null,
    adTamil: editAd?.adTamil || null,
    adEnglish: editAd?.adEnglish || null,
  });
  
  const [cropModal, setCropModal] = useState({ open: false, id: null, src: null });

const handleFileChange = (event) => {
  const { id, files } = event.target;
  if (files && files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // If you want to use the crop modal, open it here
      setCropModal({ open: true, id, src: e.target.result });
      // If you want to skip cropping and just preview, uncomment below:
      // setPreviews((prev) => ({
      //   ...prev,
      //   [id]: e.target.result,
      // }));
    };
    reader.readAsDataURL(files[0]);
  }
};
const handleCropComplete = (croppedImage) => {
  setPreviews((prev) => ({
    ...prev,
    [cropModal.id]: croppedImage,
  }));
  setCropModal({ open: false, id: null, src: null });
};
  const [startDate, setStartDate] = useState(
    editAd?.startDate ? new Date(editAd.startDate).toISOString().split("T")[0] : ""
  );
  const [endDate, setEndDate] = useState(
    editAd?.endDate ? new Date(editAd.endDate).toISOString().split("T")[0] : ""
  );

  // State for selected districts, connection types, plan type, file previews, and dates
  // const [selectedDistricts, setSelectedDistricts] = useState([]);
  // const [selectedConnections, setSelectedConnections] = useState([]);
  // const [selectedPlanType, setSelectedPlanType] = useState([]);
  // const [selectedAgeRanges, setSelectedAgeRanges] = useState([]);
  // const [loading, setLoading] = useState(false); //loading state
  // const [previews, setPreviews] = useState({
  //   adSinhala: null,
  //   adTamil: null,
  //   adEnglish: null,
  // });
  // const [startDate, setStartDate] = useState(""); // State for start date
  // const [endDate, setEndDate] = useState(""); // State for end date


  // Arrays for dropdown options
  const ageRanges = ["18-25", "26-35", "36-45", "46-60", "60+"];
  const districts = [
    "Ampara","Anuradhapura","Badulla","Batticaloa","Colombo","Galle","Gampaha","Hambantota","Jaffna","Kalutara","Kandy","Kegalle","Kilinochchi", "Kurunegala",   "Mannar","Matale","Matara","Monaragala", "Mullaitivu","Nuwara Eliya","Polonnaruwa","Puttalam","Ratnapura","Trincomalee","Vavuniya",
  ];
  const connectionTypes = ["3G", "4G", "5G", "Fiber"];

  // Handle individual district checkbox change
  const handleDistrictChange = (district) => {
    if (selectedDistricts.includes(district)) {
      setSelectedDistricts(selectedDistricts.filter((d) => d !== district));
    } else {
      setSelectedDistricts([...selectedDistricts, district]);
    }
  };

  // Handle "All" district checkbox change
  const handleSelectAllDistricts = () => {
    if (selectedDistricts.length === districts.length) {
      setSelectedDistricts([]); // Deselect all
    } else {
      setSelectedDistricts(districts); // Select all
    }
  };

  // Handle individual connection type checkbox change
  const handleConnectionChange = (connection) => {
    if (selectedConnections.includes(connection)) {
      setSelectedConnections(
        selectedConnections.filter((c) => c !== connection)
      );
    } else {
      setSelectedConnections([...selectedConnections, connection]);
    }
  };

  // Handle "All" connection type checkbox change
  const handleSelectAllConnections = () => {
    if (selectedConnections.length === connectionTypes.length) {
      setSelectedConnections([]); // Deselect all
    } else {
      setSelectedConnections(connectionTypes); // Select all
    }
  };

  // Handle plan type change
  const handlePlanTypeChange = (event) => {
    const value = event.target.value;
  
    if (value === "Prepaid,Postpaid") {
      // If "Both" is selected, set the array ["Prepaid", "Postpaid"]
      setSelectedPlanType(["Prepaid", "Postpaid"]);
    } else if (value) {
      // Otherwise, set the selected value as an array
      setSelectedPlanType([value]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!description.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Description is required.",
      });
      setLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description); // Ensure this is included
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("ageRange", JSON.stringify(selectedAgeRanges));
    formData.append("districts", JSON.stringify(selectedDistricts));
    formData.append("planType", JSON.stringify(selectedPlanType));
    formData.append("connectionTypes", JSON.stringify(selectedConnections));
  
    if (previews.adSinhala && previews.adSinhala.startsWith("data:")) {
    formData.append("adSinhala", dataURLtoFile(previews.adSinhala, "adSinhala.jpg"));
  } else if (e.target.adSinhala.files[0]) {
    formData.append("adSinhala", e.target.adSinhala.files[0]);
  }

  if (previews.adTamil && previews.adTamil.startsWith("data:")) {
    formData.append("adTamil", dataURLtoFile(previews.adTamil, "adTamil.jpg"));
  } else if (e.target.adTamil.files[0]) {
    formData.append("adTamil", e.target.adTamil.files[0]);
  }

  if (previews.adEnglish && previews.adEnglish.startsWith("data:")) {
    formData.append("adEnglish", dataURLtoFile(previews.adEnglish, "adEnglish.jpg"));
  } else if (e.target.adEnglish.files[0]) {
    formData.append("adEnglish", e.target.adEnglish.files[0]);
  }
  
    // Log FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      if (editAd) {
        await axios.put(`${import.meta.env.VITE_BASE_URL}/ads/${editAd._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Advertisement updated successfully!",
        });
      } else {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/ads/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Advertisement created successfully!",
        });
      }
      onSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Failed to submit advertisement.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {cropModal.open && (
  <ImageCropperModal
    open={cropModal.open}
    imageSrc={cropModal.src}
    onClose={() => setCropModal({ open: false, id: null, src: null })}
    onCropComplete={handleCropComplete}
    aspect={2.5} // 5:2 aspect ratio
  />
)}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
  type="text"
  id="title"
  name="title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
  required
/>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
  id="description"
  name="description"
  value={description} // Bound to state
  onChange={(e) => setDescription(e.target.value)} // Updates state on change
  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
  required
></textarea>
        </div>

        {/* Start Date */}
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

              {/* Age Range Checkboxes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Age Range:
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2">
          {ageRanges.map((range, index) => (
  <div key={index}>
    <input
      type="checkbox"
      id={`ageRange-${index}`}
      value={range}
      checked={selectedAgeRanges.includes(range)} // Check if the range is selected
      onChange={(e) => {
        if (e.target.checked) {
          setSelectedAgeRanges((prev) => [...prev, range]);
        } else {
          setSelectedAgeRanges((prev) =>
            prev.filter((selected) => selected !== range)
          );
        }
      }}
    />
    <label
      htmlFor={`ageRange-${index}`}
      className="ml-2 text-sm text-gray-700"
    >
      {range}
    </label>
  </div>
))}
          </div>
        </div>

        {/* District Checkboxes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            District:
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div>
              <input
                type="checkbox"
                id="selectAllDistricts"
                checked={selectedDistricts.length === districts.length}
                onChange={handleSelectAllDistricts}
              />
              <label
                htmlFor="selectAllDistricts"
                className="ml-2 text-sm text-gray-700"
              >
                All
              </label>
            </div>
            {districts.map((district, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`district-${index}`}
                  checked={selectedDistricts.includes(district)}
                  onChange={() => handleDistrictChange(district)}
                />
                <label
                  htmlFor={`district-${index}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {district}
                </label>
              </div>
            ))}
          </div>
        </div>

    
{/* Plan Type Dropdown */}
<div>
  <label
    htmlFor="planType"
    className="block text-sm font-medium text-gray-700"
  >
    Plan Type:
  </label>
  <select
  id="planType"
  name="planType"
  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
  value={selectedPlanType.join(",")} // Convert array to string for display
  onChange={handlePlanTypeChange}
  required
>
  <option value="">Select Plan Type</option>
  <option value="Prepaid">Prepaid</option>
  <option value="Postpaid">Postpaid</option>
  <option value="Prepaid,Postpaid">Both (Prepaid/Postpaid)</option>
</select>
</div>

        {/* Connection Type Checkboxes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Connection Type:
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div>
              <input
                type="checkbox"
                id="selectAllConnections"
                checked={selectedConnections.length === connectionTypes.length}
                onChange={handleSelectAllConnections}
                disabled={selectedPlanType === "Prepaid"}
              />
              <label
                htmlFor="selectAllConnections"
                className="ml-2 text-sm text-gray-700"
              >
                All
              </label>
            </div>
            {connectionTypes.map((type, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`connection-${index}`}
                  checked={selectedConnections.includes(type)}
                  onChange={() => handleConnectionChange(type)}
                  disabled={selectedPlanType === "Prepaid" && type === "Fiber"}
                />
                <label
                  htmlFor={`connection-${index}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Advertisement Uploads with Previews */}
        <div>
          <label
            htmlFor="adSinhala"
            className="block text-sm font-medium text-gray-700"
          >
            Advertisement (Sinhala):
          </label>
          <input
  type="file"
  id="adSinhala"
  name="adSinhala"
  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
  onChange={handleFileChange}
  required={!editAd} // Only required for new ads
/>
          {previews.adSinhala && (
            <img
              src={previews.adSinhala}
              alt="Sinhala Advertisement Preview"
              className="mt-2 w-full h-auto rounded-md"
            />
          )}
        </div>
        <div>
          <label
            htmlFor="adTamil"
            className="block text-sm font-medium text-gray-700"
          >
            Advertisement (Tamil):
          </label>
          <input
  type="file"
  id="adTamil"
  name="adTamil"
  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
  onChange={handleFileChange}
  required={!editAd}
/>
          {previews.adTamil && (
            <img
              src={previews.adTamil}
              alt="Tamil Advertisement Preview"
              className="mt-2 w-full h-auto rounded-md"
            />
          )}
        </div>
        <div>
          <label
            htmlFor="adEnglish"
            className="block text-sm font-medium text-gray-700"
          >
            Advertisement (English):
          </label>
          <input
  type="file"
  id="adEnglish"
  name="adEnglish"
  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
  onChange={handleFileChange}
  required={!editAd}
/>
          {previews.adEnglish && (
            <img
              src={previews.adEnglish}
              alt="English Advertisement Preview"
              className="mt-2 w-full h-auto rounded-md"
            />
          )}
        </div>

         {/* Buttons */}
         <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 flex items-center"
            disabled={loading} // Disable button while loading
          >
            {loading && <CircularProgress size={20} className="mr-2 text-white" />}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;