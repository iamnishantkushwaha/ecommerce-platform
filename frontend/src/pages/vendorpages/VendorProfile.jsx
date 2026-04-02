import React, { useState } from "react";
import VendorNavbar from "../../Components/VendorNavbar";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera } from "react-icons/fi";

const VendorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    companyName: "Smith Trading Co.",
    businessAddress: "123 Business Street, New York, NY 10001",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    taxId: "98-7654321",
    bio: "Professional vendor with 5+ years in e-commerce",
  });

  const [formData, setFormData] = useState(profileData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
    // API call will be added later
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  return (
    <>
      <VendorNavbar />
      <main className="bg-gray-100 pt-20 md:pl-72 md:pt-20 pb-10">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex justify-between items-start gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Profile Settings
              </h1>
              <p className="text-gray-600 mt-1 text-sm">
                Manage your vendor profile and account information
              </p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm whitespace-nowrap"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {/* Profile Header */}
            <div className="relative bg-linear-to-r from-blue-500 to-blue-600 h-20"></div>

            {/* Profile Content */}
            <div className="px-6 pb-6">
              {/* Avatar Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-10 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                    <FiUser className="text-3xl text-gray-600" />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors">
                      <FiCamera className="text-sm" />
                    </button>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {profileData.fullName}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {profileData.companyName}
                  </p>
                </div>
              </div>

              {/* Form Content */}
              {isEditing ? (
                <form className="space-y-4">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <input
                          type="text"
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business Information */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                      Business Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Business Address
                        </label>
                        <input
                          type="text"
                          name="businessAddress"
                          value={formData.businessAddress}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          State / Province
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          ZIP / Postal Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Tax ID
                        </label>
                        <input
                          type="text"
                          name="taxId"
                          value={formData.taxId}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleSave}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-5">
                  {/* Personal Information Display */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-3">
                        <FiUser className="text-gray-400 text-lg mt-1 shrink-0" />
                        <div>
                          <p className="text-gray-600 text-xs">Full Name</p>
                          <p className="text-gray-900 font-medium text-sm">
                            {profileData.fullName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FiMail className="text-gray-400 text-lg mt-1 shrink-0" />
                        <div>
                          <p className="text-gray-600 text-xs">Email</p>
                          <p className="text-gray-900 font-medium text-sm">
                            {profileData.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FiPhone className="text-gray-400 text-lg mt-1 shrink-0" />
                        <div>
                          <p className="text-gray-600 text-xs">Phone</p>
                          <p className="text-gray-900 font-medium text-sm">
                            {profileData.phone}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">Bio</p>
                        <p className="text-gray-900 font-medium text-sm">
                          {profileData.bio}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Business Information Display */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                      Business Information
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <p className="text-gray-600 text-xs">Company Name</p>
                        <p className="text-gray-900 font-medium text-sm">
                          {profileData.companyName}
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <FiMapPin className="text-gray-400 text-lg mt-1 shrink-0" />
                        <div>
                          <p className="text-gray-600 text-xs">Address</p>
                          <p className="text-gray-900 font-medium text-sm">
                            {profileData.businessAddress}
                          </p>
                          <p className="text-gray-600 text-xs">
                            {profileData.city}, {profileData.state}{" "}
                            {profileData.zipCode}, {profileData.country}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">Tax ID</p>
                        <p className="text-gray-900 font-medium text-sm">
                          {profileData.taxId}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default VendorProfile;
