import { useState } from 'react';

interface Event {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
  location?: string;
  participants?: string[];
}

function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Team Meeting',
      date: '2024-02-15',
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      description: 'Weekly team sync-up',
      location: 'Conference Room A',
      participants: ['John Doe', 'Jane Smith', 'Michael Brown']
    },
    {
      id: '2',
      title: 'Project Deadline',
      date: '2024-02-20',
      startTime: '5:00 PM',
      endTime: '5:00 PM',
      description: 'Submit project deliverables',
    },
    {
      id: '3',
      title: 'Client Call',
      date: '2024-02-25',
      startTime: '2:00 PM',
      endTime: '3:00 PM',
      description: 'Monthly client review',
      location: 'Virtual Meeting',
      participants: ['Client Team']
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 0) {
        setCurrentYear(prevYear => prevYear - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 11) {
        setCurrentYear(prevYear => prevYear + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth, currentYear);
    const startDay = firstDayOfMonth(currentMonth, currentYear);
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50"></div>
      );
    }
    
    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = formatDate(day);
      const dayEvents = getEventsForDate(dateStr);
      
      days.push(
        <div 
          key={day} 
          className={`h-24 border border-gray-200 p-2 overflow-y-auto cursor-pointer hover:bg-blue-50 relative ${new Date().getDate() === day && new Date().getMonth() === currentMonth && new Date().getFullYear() === currentYear ? 'bg-blue-100' : ''}`}
        >
          <div className="font-medium text-right">{day}</div>
          {dayEvents.map(event => (
            <div 
              key={event.id} 
              className="mt-1 text-xs bg-blue-100 text-blue-800 p-1 rounded truncate hover:bg-blue-200 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedEvent(event);
              }}
            >
              {event.startTime} - {event.title}
            </div>
          ))}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Team Calendar</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={handlePrevMonth}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-2xl font-semibold text-gray-700">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button 
              onClick={handleNextMonth}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Calendar days of the week header */}
          <div className="grid grid-cols-7 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-0">
            {renderCalendarDays()}
          </div>
        </div>

        {/* Event details modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Event Details</h3>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Title</h4>
                  <p className="text-lg font-semibold text-gray-800">{selectedEvent.title}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Date & Time</h4>
                  <p className="text-gray-800">{selectedEvent.date} • {selectedEvent.startTime} - {selectedEvent.endTime}</p>
                </div>
                {selectedEvent.location && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Location</h4>
                    <p className="text-gray-800">{selectedEvent.location}</p>
                  </div>
                )}
                {selectedEvent.description && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Description</h4>
                    <p className="text-gray-800">{selectedEvent.description}</p>
                  </div>
                )}
                {selectedEvent.participants && selectedEvent.participants.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Participants</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedEvent.participants.map((participant, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {participant}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;