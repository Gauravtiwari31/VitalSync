"use client";
import React, { useState } from "react";
import {
  User,
  Heart,
  Activity,
  Calendar,
  FileText,
  Bell,
  CheckCircle,
  Clock,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Target,
  File,
  Clipboard,
  Shield,
  PieChart,
  TrendingUp,
  MessageCircle,
  Phone,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

/**
 * Reference ranges below follow the ACC/AHA adult thresholds. They classify a
 * reading for display only — this is not a diagnosis, and the UI never acts on
 * the result beyond choosing a colour.
 */
type VitalStatusName = "normal" | "low" | "elevated" | "critical" | "info";

const hrStatus = (bpm?: number | string): VitalStatusName => {
  const n = Number(bpm);
  if (!Number.isFinite(n) || n <= 0) return "info";
  if (n < 50 || n > 120) return "critical";
  if (n < 60) return "low";
  if (n > 100) return "elevated";
  return "normal";
};

const spo2Status = (pct?: number | string): VitalStatusName => {
  const n = Number(pct);
  if (!Number.isFinite(n) || n <= 0) return "info";
  if (n < 90) return "critical";
  if (n < 95) return "elevated";
  return "normal";
};

// Expects "systolic/diastolic", e.g. "118/76".
const bpStatus = (bp?: string): VitalStatusName => {
  if (typeof bp !== "string") return "info";
  const [sysRaw, diaRaw] = bp.split("/");
  const sys = Number(sysRaw);
  const dia = Number(diaRaw);
  if (!Number.isFinite(sys) || !Number.isFinite(dia)) return "info";
  if (sys >= 180 || dia >= 120) return "critical";
  if (sys >= 130 || dia >= 80) return "elevated";
  if (sys < 90 || dia < 60) return "low";
  return "normal";
};

const ProfilePage = ({ patient }:any) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Dummy data for undefined values
  const defaultPatient = {
    name: "John Doe",
    age: 42,
    gender: "Male",
    bloodgroup: "O+",
    imageUrl: "/api/placeholder/96/96",
    isVerified: true,
    email: "john.doe@example.com",
    contactno: "+1 (555) 123-4567",
    address: "123 Health Street, Medical City, MC 12345",
    emergencycontact: "+1 (555) 987-6543",
    healthStatus: "Good",
    healthMetrics: {
      bloodPressure: "120/80",
      heartRate: 72,
      weight: 75,
      oxygenLevel: 98,
      cholesterol: "180 mg/dL",
      glucoseLevel: "95 mg/dL",
      progressData: [
        { date: "Feb 28, 2025", weight: 76, bloodPressure: "122/82" },
        { date: "Jan 15, 2025", weight: 77, bloodPressure: "124/83" },
        { date: "Dec 05, 2024", weight: 78, bloodPressure: "125/84" },
        { date: "Nov 10, 2024", weight: 79, bloodPressure: "126/85" },
      ],
      healthGoals: [
        {
          achieved: true,
          description: "Reduce blood pressure to normal range",
        },
        { achieved: false, description: "Walk 10,000 steps daily" },
        { achieved: true, description: "Maintain weight under 80kg" },
        { achieved: false, description: "Reduce cholesterol by 10%" },
      ],
    },
    notifications: [
      {
        title: "Appointment Confirmed",
        message:
          "Your appointment with Dr. Smith has been confirmed for March 5th at 2:00 PM.",
        time: "2 hours ago",
      },
      {
        title: "Prescription Refill Ready",
        message:
          "Your prescription refill is ready for pickup at Central Pharmacy.",
        time: "Yesterday",
      },
      {
        title: "Lab Results Available",
        message:
          "Your recent lab test results are now available. Please check the health records section.",
        time: "2 days ago",
      },
      {
        title: "Health Goal Achieved",
        message:
          "Congratulations! You've achieved your goal of reducing blood pressure to normal range.",
        time: "1 week ago",
      },
    ],
    appointments: [
      {
        appointment: {
          doctorName: "Dr. Emma Smith",
          specialty: "Cardiologist",
          date: "March 5, 2025",
          time: "2:00 PM",
        },
      },
      {
        appointment: {
          doctorName: "Dr. James Wilson",
          specialty: "Nutritionist",
          date: "March 12, 2025",
          time: "10:30 AM",
        },
      },
      {
        appointment: {
          doctorName: "Dr. Sarah Johnson",
          specialty: "General Physician",
          date: "March 20, 2025",
          time: "4:15 PM",
        },
      },
    ],
    documents: [
      {
        document: {
          id: 1,
          name: "Blood Test Results",
          date: "February 25, 2025",
        },
      },
      {
        document: {
          id: 2,
          name: "Cardiac Examination Report",
          date: "January 15, 2025",
        },
      },
      {
        document: {
          id: 3,
          name: "Vaccination Certificate",
          date: "December 10, 2024",
        },
      },
      {
        document: {
          id: 4,
          name: "Allergy Test Results",
          date: "November 5, 2024",
        },
      },
    ],
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        purpose: "Blood pressure",
      },
      {
        name: "Atorvastatin",
        dosage: "20mg",
        frequency: "Once daily",
        purpose: "Cholesterol",
      },
      {
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        purpose: "Blood sugar",
      },
    ],
    recentVisits: [
      {
        date: "February 10, 2025",
        doctor: "Dr. Emma Smith",
        reason: "Regular checkup",
        notes: "Patient shows improvement in cardiovascular health",
      },
      {
        date: "December 5, 2024",
        doctor: "Dr. James Wilson",
        reason: "Dietary consultation",
        notes: "New nutrition plan provided",
      },
    ],
  };

  // Merge provided patient data with default data
  const mergedPatient = {
    ...defaultPatient,
    ...patient,
    healthMetrics: {
      ...defaultPatient.healthMetrics,
      ...(patient?.healthMetrics || {}),
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Enhanced Profile Header with Gradient and Pattern Background */}
      <div className="relative bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-900 text-white rounded-2xl shadow-lg overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="smallGrid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>

        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white/30 overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
                <img
                  src={mergedPatient?.imageUrl}
                  alt={mergedPatient?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {mergedPatient?.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-1">
                  <CheckCircle className="text-emerald-500" size={22} />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {mergedPatient?.name}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    ID: #{mergedPatient?.id || "PAT-1234"}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    {mergedPatient?.age} years
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    {mergedPatient?.gender}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    Blood: {mergedPatient?.bloodgroup}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-sm max-w-2xl">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-1.5 rounded-full">
                    <MessageCircle size={14} />
                  </div>
                  <span className="truncate">{mergedPatient?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-1.5 rounded-full">
                    <Phone size={14} />
                  </div>
                  <span className="truncate">{mergedPatient?.contactno}</span>
                </div>
                <div className="flex items-center gap-2 md:col-span-2">
                  <div className="bg-white/20 p-1.5 rounded-full">
                    <Shield size={14} />
                  </div>
                  <span className="truncate">
                    Emergency: {mergedPatient?.emergencycontact}
                  </span>
                </div>
              </div>
            </div>

            {/* Health Status Indicator */}
            <div className="hidden md:flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div
                className={`
                ${
                  mergedPatient?.healthStatus === "Excellent"
                    ? "bg-emerald-500"
                    : mergedPatient?.healthStatus === "Good"
                    ? "bg-green-500"
                    : mergedPatient?.healthStatus === "Fair"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }
                w-12 h-12 rounded-full flex items-center justify-center mb-2
              `}
              >
                <Heart className="text-white" size={24} />
              </div>
              <span className="text-sm font-medium">
                {mergedPatient?.healthStatus} Health
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        {/* Tab Navigation */}
        <div className="px-6 sm:px-8 pb-0 pt-2 bg-white/10 backdrop-blur-xs overflow-x-auto">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="flex bg-transparent gap-2 min-w-max">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-700 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400 rounded-t-lg border-b-0 text-white py-2 px-4"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="records"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-700 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400 rounded-t-lg border-b-0 text-white py-2 px-4"
              >
                Records
              </TabsTrigger>
              <TabsTrigger
                value="appointments"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-700 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400 rounded-t-lg border-b-0 text-white py-2 px-4"
              >
                Appointments
              </TabsTrigger>
              <TabsTrigger
                value="medications"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-700 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400 rounded-t-lg border-b-0 text-white py-2 px-4"
              >
                Medications
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-1">
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsContent value="overview" className="m-0">
            <div className="p-4 space-y-6">
              {/* Vitals Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <VitalCard
                  icon={Heart}
                  label="Blood pressure"
                  value={mergedPatient?.healthMetrics?.bloodPressure}
                  trend={-2.5}
                  status={bpStatus(mergedPatient?.healthMetrics?.bloodPressure)}
                  range="<120/80 mmHg"
                />
                <VitalCard
                  icon={Activity}
                  label="Heart rate"
                  value={`${mergedPatient?.healthMetrics?.heartRate} bpm`}
                  trend={1.2}
                  status={hrStatus(mergedPatient?.healthMetrics?.heartRate)}
                  range="60–100 bpm"
                />
                <VitalCard
                  icon={User}
                  label="Weight"
                  value={`${mergedPatient?.healthMetrics?.weight} kg`}
                  trend={-0.5}
                  status="info"
                />
                <VitalCard
                  icon={PieChart}
                  label="Oxygen saturation"
                  value={`${mergedPatient?.healthMetrics?.oxygenLevel || 98}%`}
                  trend={0.3}
                  status={spo2Status(
                    mergedPatient?.healthMetrics?.oxygenLevel ?? 98
                  )}
                  range="95–100%"
                />
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Progress + Appointments */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Health Progress */}
                  <Card className="border dark:border-gray-800 shadow-xs hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between py-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="text-blue-500" size={18} />
                        <CardTitle className="text-lg">
                          Health Progress
                        </CardTitle>
                      </div>
                      <button className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                        View All <ChevronRight size={14} />
                      </button>
                    </CardHeader>
                    <CardContent className="pt-0 px-4">
                      <div className="space-y-3 mb-4">
                        {mergedPatient?.healthMetrics?.progressData?.map(
                          (data:any, index:any) => (
                            <div
                              key={index}
                              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            >
                              <span className="text-sm font-medium">
                                {data.date}
                              </span>
                              <div className="flex gap-4 mt-1 sm:mt-0">
                                <div className="flex items-center gap-1">
                                  <User
                                    className="text-emerald-500"
                                    size={14}
                                  />
                                  <span className="text-xs">
                                    {data.weight} kg
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Heart className="text-rose-500" size={14} />
                                  <span className="text-xs">
                                    {data.bloodPressure}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upcoming Appointments */}
                  <Card className="border dark:border-gray-800 shadow-xs hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-indigo-500" size={18} />
                        <CardTitle className="text-lg">
                          Upcoming Appointments
                        </CardTitle>
                      </div>
                      <button className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                        View All <ChevronRight size={14} />
                      </button>
                    </CardHeader>
                    <CardContent className="pt-0 px-4">
                      <div className="space-y-3 mb-4">
                        {mergedPatient?.appointments?.map((app:any, index:any) => (
                          <AppointmentCard
                            key={index}
                            appointment={app.appointment}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Notifications + Goals */}
                <div className="space-y-6">
                  {/* Recent Notifications */}
                  <Card className="border dark:border-gray-800 shadow-xs hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between py-4">
                      <div className="flex items-center gap-2">
                        <Bell className="text-amber-500" size={18} />
                        <CardTitle className="text-lg">Notifications</CardTitle>
                      </div>
                      <button className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                        View All <ChevronRight size={14} />
                      </button>
                    </CardHeader>
                    <CardContent className="pt-0 px-4">
                      <div className="space-y-3 mb-4">
                        {mergedPatient?.notifications?.map(
                          (notification:any, index:any) => (
                            <NotificationCard
                              key={index}
                              notification={notification}
                            />
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Health Goals */}
                  <Card className="border dark:border-gray-800 shadow-xs hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between py-4">
                      <div className="flex items-center gap-2">
                        <Target className="text-green-500" size={18} />
                        <CardTitle className="text-lg">Health Goals</CardTitle>
                      </div>
                      <button className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                        Manage <ChevronRight size={14} />
                      </button>
                    </CardHeader>
                    <CardContent className="pt-0 px-4">
                      <div className="space-y-3 mb-4">
                        {mergedPatient?.healthMetrics?.healthGoals?.map(
                          (goal:any, index:any) => (
                            <GoalCard key={index} goal={goal} index={index} />
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Recent Documents - Full Width */}
              <Card className="border dark:border-gray-800 shadow-xs hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between py-4">
                  <div className="flex items-center gap-2">
                    <FileText className="text-blue-500" size={18} />
                    <CardTitle className="text-lg">Recent Documents</CardTitle>
                  </div>
                  <button className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                    View All <ChevronRight size={14} />
                  </button>
                </CardHeader>
                <CardContent className="pt-0 px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    {mergedPatient?.documents?.map((doc:any, index:any) => (
                      <DocumentCard key={index} document={doc.document} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="records" className="m-0 p-6">
            <div className="text-center py-8">
              <Clipboard className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                Health Records
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                View your complete medical history here
              </p>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="m-0 p-6">
            <div className="text-center py-8">
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                All Appointments
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Manage your past and upcoming appointments
              </p>
            </div>
          </TabsContent>

          <TabsContent value="medications" className="m-0 p-6">
            <div className="text-center py-8">
              <Clipboard className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                Medication Schedule
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Track your current medications and refill schedule
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Enhanced Components

/**
 * A single vital reading. `status` maps onto the clinical scale defined in
 * globals.css, so the colour here means the same thing it does on the hero
 * monitor and on triage badges. `range` shows the adult reference interval
 * so the reading is interpretable without leaving the page.
 */
const VitalCard = ({ icon: Icon, label, value, trend, status = "normal", range }: any) => {
  const tone: Record<string, string> = {
    normal: "text-vital-normal",
    low: "text-vital-low",
    elevated: "text-vital-elevated",
    critical: "text-vital-critical",
    info: "text-vital-info",
  };
  const bar: Record<string, string> = {
    normal: "bg-vital-normal",
    low: "bg-vital-low",
    elevated: "bg-vital-elevated",
    critical: "bg-vital-critical",
    info: "bg-vital-info",
  };
  const soft: Record<string, string> = {
    normal: "bg-vital-normal/10",
    low: "bg-vital-low/10",
    elevated: "bg-vital-elevated/10",
    critical: "bg-vital-critical/10",
    info: "bg-vital-info/10",
  };
  const color = tone[status] ?? tone.normal;

  return (
    <Card className="overflow-hidden border transition-shadow hover:shadow-md dark:border-gray-800">
      <div className={`h-1 w-full ${bar[status] ?? bar.normal}`} />
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className={`rounded-lg p-2 ${soft[status] ?? soft.normal}`}>
              <Icon className={color} size={20} />
            </div>
            {trend !== undefined && (
              <div
                className={`vitals-num flex items-center text-xs font-medium ${
                  trend > 0 ? "text-vital-normal" : "text-vital-critical"
                }`}
              >
                {trend > 0 ? "+" : ""}
                {trend}%
              </div>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <p className={`vitals-num truncate text-xl font-semibold ${color}`}>
              {value || "—"}
            </p>
            {range && (
              <p className="text-xs text-muted-foreground">Ref {range}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AppointmentCard = ({ appointment }:any) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
    <div className="bg-indigo-500/10 dark:bg-indigo-500/20 p-2 rounded-lg shrink-0">
      <Calendar className="text-indigo-500" size={20} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-sm truncate">
        {appointment?.doctorName || "Dr. Smith"}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {appointment?.specialty || "General Physician"}
      </p>
      <div className="flex items-center gap-2 mt-1">
        <div className="flex items-center gap-1">
          <Clock className="text-gray-400" size={12} />
          <p className="text-xs font-medium">
            {appointment?.time || "9:00 AM"}
          </p>
        </div>
        <span className="text-gray-300 dark:text-gray-600">•</span>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {appointment?.date || "March 10, 2025"}
        </p>
      </div>
    </div>
    <button className="px-3 py-1 text-xs text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 rounded-full shrink-0 transition-colors">
      Details
    </button>
  </div>
);

const NotificationCard = ({ notification }:any) => (
  <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
    <div className="bg-amber-500/10 dark:bg-amber-500/20 p-2 rounded-lg shrink-0 h-min">
      <Bell className="text-amber-500" size={18} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-sm truncate">
        {notification?.title || "System Notification"}
      </p>
      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mt-0.5">
        {notification?.message ||
          "You have a new notification from the health system."}
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
        {notification?.time || "Just now"}
      </p>
    </div>
    <div className="shrink-0">
      <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400">
        <ChevronRight size={16} />
      </button>
    </div>
  </div>
);

const GoalCard = ({ goal, index }:any) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
    <div
      className={`${
        goal?.achieved
          ? "bg-green-500/10 dark:bg-green-500/20"
          : "bg-amber-500/10 dark:bg-amber-500/20"
      } p-2 rounded-lg shrink-0`}
    >
      <Target
        className={goal?.achieved ? "text-green-500" : "text-amber-500"}
        size={18}
      />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium truncate">
        {goal?.description || "Health Goal"}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {goal?.achieved ? "Achieved" : "In Progress"}
      </p>
    </div>
    {goal?.achieved && (
      <CheckCircle className="text-green-500 shrink-0" size={16} />
    )}
  </div>
);

const DocumentCard = ({ document }:any) => (
  <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors h-full border border-gray-100 dark:border-gray-700">
    <div className="bg-blue-500/10 dark:bg-blue-500/20 p-3 rounded-lg w-min mb-3">
      <File className="text-blue-500" size={20} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-sm mb-1 truncate">
        {document?.name || "Medical Document"}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        {document?.date || "March 1, 2025"}
      </p>
    </div>
    <button className="w-full mt-auto text-xs text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 py-1.5 px-3 rounded-md flex items-center justify-center gap-1 transition-colors">
      View <ArrowRight size={12} />
    </button>
  </div>
);

export default ProfilePage;
