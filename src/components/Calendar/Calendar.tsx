// src/components/Calendar/Calendar.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskModal from '../TaskModal/TaskModal';

const Calendar: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [holidays, setHolidays] = useState<{ [key: string]: boolean }>({});

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
  };

  const closeModal = () => {
    setSelectedDay(null);
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get('https://isdayoff.ru/api/getdata?year=2024&month=7');
        console.log('API response:', response.data);

        const newHolidays: { [key: string]: boolean } = {};
        
        // Предполагаем, что ответ - строка, где каждый символ - это день месяца (0 или 1)
        const daysArray = response.data.split('').map(Number);
        
        daysArray.forEach((day: number, index: number) => {
          if (day === 1) {
            const date = new Date(2024, 6, index + 1); // месяц 6 - июль
            newHolidays[date.toDateString()] = true;
          }
        });

        setHolidays(newHolidays);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    fetchHolidays();
  }, []);

  return (
    <div className="calendar">
      {Array.from({ length: 31 }, (_, i) => {
        const date = new Date(2024, 6, i + 1);
        const isHoliday = holidays[date.toDateString()];

        return (
          <div
            key={i}
            onClick={() => handleDayClick(date)}
            style={{ backgroundColor: isHoliday ? 'red' : 'transparent' }}
          >
            {i + 1}
          </div>
        );
      })}
      {selectedDay && (
        <TaskModal selectedDay={selectedDay} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Calendar;
