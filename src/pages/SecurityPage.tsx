import { useState } from 'react';

interface SecurityLog {
  id: string;
  date: string;
  time: string;
  location: string;
  device: string;
  status: 'success' | 'failed';
}

interface TwoFactorMethod {
  id: string;
  type: 'sms' | 'authenticator' | 'email';
  status: 'enabled' | 'disabled';
  details: string;
}

function SecurityPage() {
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [securityLogs] = useState<SecurityLog[]>([
    {
      id: '1',
      date: '2024-02-15',
      time: '10:23 AM',
      location: 'New York, NY',
      device: 'Chrome on macOS',
      status: 'success'
    },
    {
      id: '2',
      date: '2024-02-14',
      time: '3:45 PM',
      location: 'New York, NY',
      device: 'Safari on iOS',
      status: 'success'
    },
    {
      id: '3',
      date: '2024-02-12',
      time: '8:12 PM',
      location: 'San Francisco, CA',
      device: 'Firefox on Windows',
      status: 'failed'
    },
    {
      id: '4',
      date: '2024-02-10',
      time: '9:30 AM',
      location: 'New York, NY',
      device: 'Chrome on macOS',
      status: 'success'
    },
  ]);

  const [twoFactorMethods] = useState<TwoFactorMethod[]>([
    {
      id: '1',
      type: 'email',
      status: 'enabled',
      details: 'eric@frusciante.com'
    },
    {
      id: '2',
      type: 'sms',
      status: 'disabled',
      details: '+1 (555) ***-4567'
    },
    {
      id: '3',
      type: 'authenticator',
      status: 'disabled',
      details: 'Not set up'
    },
  ]);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handleChangePassword = () => {
    // 简单的表单验证
    if (!newPassword || !confirmPassword || !currentPassword) {
      setPasswordError('All fields are required');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match');
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    
    // 在实际应用中，这里应该调用API来更改密码
    console.log('Changing password...');
    setPasswordSuccess('Password changed successfully!');
    setPasswordError('');
    
    // 重置表单
    setNewPassword('');
    setConfirmPassword('');
    setCurrentPassword('');
    
    // 3秒后隐藏成功消息
    setTimeout(() => {
      setPasswordSuccess('');
    }, 3000);
  };

  const toggleTwoFactorMethod = (methodId: string) => {
    // 在实际应用中，这里应该调用API来启用或禁用双因素认证
    console.log(`Toggling two-factor method: ${methodId}`);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'success':
      case 'enabled':
        return 'bg-green-100 text-green-800';
      case 'failed':
      case 'disabled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'email':
        return (
          <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'sms':
        return (
          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'authenticator':
        return (
          <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Security Settings</h1>
        
        {/* Password section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Password</h2>
            <button 
              onClick={() => setPasswordModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Change Password
            </button>
          </div>
          <p className="text-gray-600">
            Last updated: January 20, 2024
          </p>
          <p className="text-gray-600 mt-2">
            We recommend changing your password regularly to keep your account secure.
          </p>
        </div>

        {/* Two-factor authentication */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Two-Factor Authentication</h2>
          <p className="text-gray-600 mb-6">
            Add an extra layer of security to your account with two-factor authentication.
          </p>
          
          <div className="space-y-4">
            {twoFactorMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="mr-4">
                    {getMethodIcon(method.type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {method.type.charAt(0).toUpperCase() + method.type.slice(1)}
                    </h3>
                    <p className="text-sm text-gray-500">{method.details}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full mr-4 ${getStatusBadgeClass(method.status)}`}>
                    {method.status.charAt(0).toUpperCase() + method.status.slice(1)}
                  </span>
                  <button 
                    onClick={() => toggleTwoFactorMethod(method.id)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {method.status === 'enabled' ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Login activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Login Activity</h2>
          <p className="text-gray-600 mb-6">
            Monitor your account's login activity to ensure no unauthorized access.
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {securityLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.device}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(log.status)}`}>
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Change password modal */}
      {passwordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Change Password</h3>
              <button 
                  onClick={() => setPasswordModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {passwordError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
                  {passwordSuccess}
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter your current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your new password"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm your new password"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end p-6 border-t border-gray-200 space-x-3">
              <button 
                    onClick={() => setPasswordModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                Cancel
              </button>
              <button 
                    onClick={handleChangePassword}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityPage;