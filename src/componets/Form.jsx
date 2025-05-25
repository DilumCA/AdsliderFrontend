import React from 'react';

function Form() {
  // Arrays for dropdown options
  const ageRanges = ["18-25", "26-35", "36-45", "46-60", "60+"];
  const districts = ["Colombo", "Gampaha", "Kandy", "Galle", "Jaffna"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">New Advertisement Form</h1>
      <form
        action="http://localhost:8000/ads/"
        method="POST"
        encType="multipart/form-data"
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>

        {/* Age Range Dropdown */}
        <div>
          <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700">
            Age Range:
          </label>
          <select
            id="ageRange"
            name="ageRange"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Age Range</option>
            {ageRanges.map((range, index) => (
              <option key={index} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* District Dropdown */}
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700">
            District:
          </label>
          <select
            id="district"
            name="district"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select District</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>


  {/* plan type */}
  <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700">
            plan type:
          </label>
          <select
            id="district"
            name="district"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value=""> plan type</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

          {/* connection type */}
  <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700">
            connection type:
          </label>
          <select
            id="district"
            name="district"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select connection type</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Advertisement Uploads */}
        <div>
          <label htmlFor="adSinhala" className="block text-sm font-medium text-gray-700">
            Advertisement (Sinhala):
          </label>
          <input
            type="file"
            id="adSinhala"
            name="adSinhala"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            required
          />
        </div>
        <div>
          <label htmlFor="adTamil" className="block text-sm font-medium text-gray-700">
            Advertisement (Tamil):
          </label>
          <input
            type="file"
            id="adTamil"
            name="adTamil"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            required
          />
        </div>
        <div>
          <label htmlFor="adEnglish" className="block text-sm font-medium text-gray-700">
            Advertisement (English):
          </label>
          <input
            type="file"
            id="adEnglish"
            name="adEnglish"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;