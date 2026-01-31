import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import StyleGuide from './pages/StyleGuide';
import { MainLayout } from './components/layout/MainLayout';

// Rector pages
const RectorDashboard = React.lazy(() => import('./pages/rector/Dashboard'));
const RectorAspirantes = React.lazy(() => import('./pages/rector/Aspirantes'));
const RectorEstudiantes = React.lazy(() => import('./pages/rector/Estudiantes'));
const RectorProfesores = React.lazy(() => import('./pages/rector/Profesores'));
const RectorUsuarios = React.lazy(() => import('./pages/rector/GestionUsuarios'));
const RectorHorarios = React.lazy(() => import('./pages/rector/Horarios'));
const RectorObservador = React.lazy(() => import('./pages/rector/Observador'));

// Billing pages
const BillingDashboard = React.lazy(() => import('./pages/billing/Dashboard'));
const BillingCrearCobro = React.lazy(() => import('./pages/billing/CrearCobro'));
const BillingCartera = React.lazy(() => import('./pages/billing/Cartera'));

// Student pages
const StudentDashboard = React.lazy(() => import('./pages/student/Dashboard'));
const StudentProfile = React.lazy(() => import('./pages/student/Profile'));
const StudentAccount = React.lazy(() => import('./pages/student/AccountStatement'));
const StudentGrades = React.lazy(() => import('./pages/student/Grades'));
const StudentActivities = React.lazy(() => import('./pages/student/Activities'));
const StudentObserver = React.lazy(() => import('./pages/student/Observer'));

// Teacher pages
const TeacherDashboard = React.lazy(() => import('./pages/teacher/Dashboard'));
const TeacherGrading = React.lazy(() => import('./pages/teacher/Grading'));
const TeacherAttendance = React.lazy(() => import('./pages/teacher/Attendance'));
const TeacherFiles = React.lazy(() => import('./pages/teacher/Files'));
const TeacherObserver = React.lazy(() => import('./pages/teacher/Observer'));

// Shared pages
const MailPage = React.lazy(() => import('./pages/shared/Mail'));

// Psychologist pages
const PsychologistDashboard = React.lazy(() => import('./pages/psychologist/Dashboard'));
const PsychologistDiagnostico = React.lazy(() => import('./pages/psychologist/Diagnostico'));
const PsychologistHistorial = React.lazy(() => import('./pages/psychologist/Historial'));

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="text-primary font-medium">Cargando...</div></div>}>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/style-guide" element={<MainLayout><StyleGuide /></MainLayout>} />

          {/* Rector Routes */}
          <Route path="/rector/dashboard" element={<MainLayout><RectorDashboard /></MainLayout>} />
          <Route path="/rector/aspirantes" element={<MainLayout><RectorAspirantes /></MainLayout>} />
          <Route path="/rector/estudiantes" element={<MainLayout><RectorEstudiantes /></MainLayout>} />
          <Route path="/rector/profesores" element={<MainLayout><RectorProfesores /></MainLayout>} />
          <Route path="/rector/usuarios" element={<MainLayout><RectorUsuarios /></MainLayout>} />
          <Route path="/rector/horarios" element={<MainLayout><RectorHorarios /></MainLayout>} />
          <Route path="/rector/observador" element={<MainLayout><RectorObservador /></MainLayout>} />
          <Route path="/rector/correo" element={<MainLayout><MailPage /></MainLayout>} />
          <Route path="/rector/*" element={<MainLayout><RectorDashboard /></MainLayout>} />

          {/* Billing Routes */}
          <Route path="/billing/dashboard" element={<MainLayout><BillingDashboard /></MainLayout>} />
          <Route path="/billing/crear-cobro" element={<MainLayout><BillingCrearCobro /></MainLayout>} />
          <Route path="/billing/cartera" element={<MainLayout><BillingCartera /></MainLayout>} />
          <Route path="/billing/correo" element={<MainLayout><MailPage /></MainLayout>} />
          <Route path="/billing/*" element={<MainLayout><BillingDashboard /></MainLayout>} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<MainLayout><StudentDashboard /></MainLayout>} />
          <Route path="/student/perfil" element={<MainLayout><StudentProfile /></MainLayout>} />
          <Route path="/student/cuenta" element={<MainLayout><StudentAccount /></MainLayout>} />
          <Route path="/student/notas" element={<MainLayout><StudentGrades /></MainLayout>} />
          <Route path="/student/actividades" element={<MainLayout><StudentActivities /></MainLayout>} />
          <Route path="/student/observador" element={<MainLayout><StudentObserver /></MainLayout>} />
          <Route path="/student/correo" element={<MainLayout><MailPage /></MainLayout>} />
          <Route path="/student/material" element={<MainLayout><StudentDashboard /></MainLayout>} />
          <Route path="/student/*" element={<MainLayout><StudentDashboard /></MainLayout>} />

          {/* Teacher Routes */}
          <Route path="/teacher/dashboard" element={<MainLayout><TeacherDashboard /></MainLayout>} />
          <Route path="/teacher/calificar" element={<MainLayout><TeacherGrading /></MainLayout>} />
          <Route path="/teacher/asistencia" element={<MainLayout><TeacherAttendance /></MainLayout>} />
          <Route path="/teacher/archivos" element={<MainLayout><TeacherFiles /></MainLayout>} />
          <Route path="/teacher/observador" element={<MainLayout><TeacherObserver /></MainLayout>} />
          <Route path="/teacher/correo" element={<MainLayout><MailPage /></MainLayout>} />
          <Route path="/teacher/*" element={<MainLayout><TeacherDashboard /></MainLayout>} />

          {/* Psychologist Routes */}
          <Route path="/psychologist/dashboard" element={<MainLayout><PsychologistDashboard /></MainLayout>} />
          <Route path="/psychologist/diagnostico" element={<MainLayout><PsychologistDiagnostico /></MainLayout>} />
          <Route path="/psychologist/historial" element={<MainLayout><PsychologistHistorial /></MainLayout>} />
          <Route path="/psychologist/*" element={<MainLayout><PsychologistDashboard /></MainLayout>} />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
