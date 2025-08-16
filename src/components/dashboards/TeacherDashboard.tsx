import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TeacherOverview from '../teacher/TeacherOverview';
import CoordinationForms from '../teacher/CoordinationForms';
import AttendanceList from '../teacher/AttendanceList';
import VisitPlanning from '../teacher/VisitPlanning';
import StudentList from '../teacher/StudentList';
import Messages from '../teacher/Messages';

const TeacherDashboard: React.FC = () => {
  return (
    <Routes>
      <Route index element={<TeacherOverview />} />
      <Route path="forms" element={<CoordinationForms />} />
      <Route path="attendance" element={<AttendanceList />} />
      <Route path="visits" element={<VisitPlanning />} />
      <Route path="students" element={<StudentList />} />
      <Route path="messages" element={<Messages />} />
    </Routes>
  );
};

export default TeacherDashboard;