function GeneralPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">General Settings</h1>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">System Preferences</h2>
          <p className="text-gray-600 mb-4">
            Configure general system settings that apply across all features and modules.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Dark Mode</label>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" className="peer sr-only" id="darkMode" />
                <label 
                  htmlFor="darkMode" 
                  className="absolute inset-0 flex items-center justify-start bg-gray-300 rounded-full transition-all duration-300 ease-in-out px-0.5 cursor-pointer peer-checked:justify-end peer-checked:bg-green-500"
                >
                  <span className="h-5 w-5 bg-white rounded-full transition-transform duration-300 ease-in-out transform peer-checked:translate-x-6"></span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Notifications</label>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" className="peer sr-only" id="notifications" defaultChecked />
                <label 
                  htmlFor="notifications" 
                  className="absolute inset-0 flex items-center justify-start bg-gray-300 rounded-full transition-all duration-300 ease-in-out px-0.5 cursor-pointer peer-checked:justify-end peer-checked:bg-green-500"
                >
                  <span className="h-5 w-5 bg-white rounded-full transition-transform duration-300 ease-in-out transform peer-checked:translate-x-6"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Display Options</h2>
          <p className="text-gray-600 mb-4">
            Customize how information is displayed throughout the application.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Time Zone</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>UTC+08:00 (Beijing)</option>
                <option>UTC-05:00 (New York)</option>
                <option>UTC+00:00 (London)</option>
                <option>UTC+09:00 (Tokyo)</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Date Format</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>YYYY-MM-DD</option>
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralPage;