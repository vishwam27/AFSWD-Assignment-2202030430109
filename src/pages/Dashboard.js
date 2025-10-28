import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  AcademicCapIcon,
  ClockIcon,
  TrophyIcon,
  ChartBarIcon,
  BookOpenIcon,
  PlayIcon,
  CheckCircleIcon,
  FireIcon
} from '@heroicons/react/24/outline';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(true);

  // Mock data - in real app this would come from API
  const [dashboardData, setDashboardData] = useState({
    stats: {
      coursesEnrolled: 12,
      coursesCompleted: 8,
      totalStudyTime: 156, // hours
      currentStreak: 7, // days
      certificates: 5,
      averageScore: 87
    },
    recentActivity: [
      { id: 1, type: 'completed', course: 'React Fundamentals', date: '2024-01-15', score: 92 },
      { id: 2, type: 'started', course: 'Advanced JavaScript', date: '2024-01-14' },
      { id: 3, type: 'quiz', course: 'CSS Grid Layout', date: '2024-01-13', score: 85 },
      { id: 4, type: 'completed', course: 'Node.js Basics', date: '2024-01-12', score: 88 }
    ],
    enrolledCourses: [
      { id: 1, title: 'Advanced JavaScript', progress: 65, nextLesson: 'Async/Await Patterns', estimatedTime: '2h 30m' },
      { id: 2, title: 'React Performance', progress: 30, nextLesson: 'Memoization Techniques', estimatedTime: '1h 45m' },
      { id: 3, title: 'TypeScript Mastery', progress: 80, nextLesson: 'Advanced Types', estimatedTime: '45m' },
      { id: 4, title: 'GraphQL Fundamentals', progress: 15, nextLesson: 'Schema Design', estimatedTime: '3h 15m' }
    ]
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Chart data
  const progressChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Study Hours',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Courses Completed',
        data: [1, 1, 2, 1, 2, 1],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      }
    ],
  };

  const skillsChartData = {
    labels: ['JavaScript', 'React', 'Node.js', 'CSS', 'TypeScript', 'GraphQL'],
    datasets: [
      {
        data: [90, 85, 75, 80, 70, 60],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#06B6D4',
        ],
        borderWidth: 0,
      },
    ],
  };

  const performanceChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Score',
        data: [78, 82, 85, 87, 89, 87],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name || 'Student'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's your learning progress and achievements
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <AcademicCapIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Courses Enrolled</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData.stats.coursesEnrolled}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData.stats.coursesCompleted}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <ClockIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Study Time</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData.stats.totalStudyTime}h</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                <FireIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData.stats.currentStreak} days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Progress Chart */}
          <div className="lg:col-span-2 card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Learning Progress</h2>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="input-field text-sm"
              >
                <option value="week">Last 6 Weeks</option>
                <option value="month">Last 6 Months</option>
                <option value="year">Last Year</option>
              </select>
            </div>
            <Line data={progressChartData} options={chartOptions} />
          </div>

          {/* Skills Chart */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Skill Levels</h2>
            <Doughnut data={skillsChartData} options={doughnutOptions} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Chart */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Performance Trends</h2>
            <Bar data={performanceChartData} options={chartOptions} />
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {dashboardData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'completed' ? 'bg-green-100 dark:bg-green-900' :
                    activity.type === 'started' ? 'bg-blue-100 dark:bg-blue-900' :
                    'bg-yellow-100 dark:bg-yellow-900'
                  }`}>
                    {activity.type === 'completed' ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : activity.type === 'started' ? (
                      <PlayIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <BookOpenIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.type === 'completed' ? 'Completed' : 
                       activity.type === 'started' ? 'Started' : 'Quiz taken in'} {activity.course}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {activity.date} {activity.score && `• Score: ${activity.score}%`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current Courses */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dashboardData.enrolledCourses.map((course) => (
              <div key={course.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{course.title}</h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{course.progress}%</span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Next: {course.nextLesson}</p>
                    <p className="text-gray-500 dark:text-gray-500">Est. {course.estimatedTime}</p>
                  </div>
                  <button className="btn-primary text-sm py-1 px-3">
                    Continue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mt-8 card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg text-white">
              <TrophyIcon className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold">Course Master</h3>
              <p className="text-sm opacity-90">Completed 5+ courses</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg text-white">
              <FireIcon className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold">Week Warrior</h3>
              <p className="text-sm opacity-90">7-day learning streak</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-lg text-white">
              <ChartBarIcon className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold">High Performer</h3>
              <p className="text-sm opacity-90">85%+ average score</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
