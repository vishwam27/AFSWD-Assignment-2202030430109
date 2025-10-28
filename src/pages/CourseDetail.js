import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import {
  PlayIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  CheckCircleIcon,
  ShoppingCartIcon,
  CheckIcon,
  BookOpenIcon,
  AcademicCapIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const CourseDetail = () => {
  const { id } = useParams();
  const { addToCart, isInCart } = useCart();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock course data - in real app this would be fetched by ID
  const course = {
    id: parseInt(id),
    title: 'Complete React Developer Course',
    instructor: 'John Smith',
    instructorBio: 'Senior Software Engineer with 10+ years experience at top tech companies.',
    instructorImage: 'https://via.placeholder.com/100x100/3B82F6/FFFFFF?text=JS',
    category: 'Web Development',
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.8,
    students: 15420,
    duration: '40 hours',
    lessons: 156,
    level: 'Beginner',
    language: 'English',
    lastUpdated: '2024-01-15',
    thumbnail: 'https://via.placeholder.com/800x450/3B82F6/FFFFFF?text=React+Course',
    description: 'Master React from basics to advanced concepts with hands-on projects. This comprehensive course covers everything you need to become a proficient React developer.',
    longDescription: `
      This complete React developer course is designed to take you from a complete beginner to an advanced React developer. 
      You'll learn by building real-world projects and gain the skills needed to build modern web applications.
      
      The course covers React fundamentals, advanced concepts, state management with Redux, routing, testing, and deployment.
      By the end of this course, you'll have built 10+ projects and have a strong portfolio to showcase your skills.
    `,
    whatYouWillLearn: [
      'Build modern React applications from scratch',
      'Master React Hooks and functional components',
      'Implement state management with Redux and Context API',
      'Create responsive and interactive user interfaces',
      'Handle forms, validation, and user input',
      'Work with APIs and manage asynchronous operations',
      'Test React applications with Jest and React Testing Library',
      'Deploy React applications to production',
      'Optimize React applications for performance',
      'Build 10+ real-world projects for your portfolio'
    ],
    requirements: [
      'Basic knowledge of HTML, CSS, and JavaScript',
      'Familiarity with ES6+ JavaScript features',
      'A computer with internet connection',
      'Text editor or IDE (VS Code recommended)'
    ],
    curriculum: [
      {
        section: 'Getting Started with React',
        lessons: [
          { title: 'Introduction to React', duration: '15:30', preview: true },
          { title: 'Setting up Development Environment', duration: '12:45', preview: false },
          { title: 'Your First React Component', duration: '18:20', preview: true },
          { title: 'JSX Fundamentals', duration: '22:15', preview: false }
        ]
      },
      {
        section: 'React Components and Props',
        lessons: [
          { title: 'Functional vs Class Components', duration: '16:40', preview: false },
          { title: 'Understanding Props', duration: '14:25', preview: false },
          { title: 'Component Composition', duration: '19:30', preview: false },
          { title: 'Conditional Rendering', duration: '13:15', preview: false }
        ]
      },
      {
        section: 'State and Event Handling',
        lessons: [
          { title: 'Introduction to State', duration: '17:50', preview: false },
          { title: 'Event Handling in React', duration: '15:30', preview: false },
          { title: 'Forms and Controlled Components', duration: '21:40', preview: false },
          { title: 'State Management Best Practices', duration: '18:25', preview: false }
        ]
      },
      {
        section: 'React Hooks',
        lessons: [
          { title: 'useState Hook Deep Dive', duration: '20:15', preview: false },
          { title: 'useEffect Hook and Side Effects', duration: '24:30', preview: false },
          { title: 'Custom Hooks', duration: '19:45', preview: false },
          { title: 'Advanced Hooks (useContext, useReducer)', duration: '26:20', preview: false }
        ]
      }
    ],
    features: [
      '40 hours of on-demand video',
      '156 downloadable resources',
      'Full lifetime access',
      'Access on mobile and TV',
      'Certificate of completion',
      '30-day money-back guarantee'
    ],
    reviews: [
      {
        id: 1,
        user: 'Sarah M.',
        rating: 5,
        date: '2024-01-10',
        comment: 'Excellent course! The instructor explains concepts clearly and the projects are very practical.'
      },
      {
        id: 2,
        user: 'Mike R.',
        rating: 5,
        date: '2024-01-08',
        comment: 'Best React course I\'ve taken. Great balance of theory and hands-on practice.'
      },
      {
        id: 3,
        user: 'Jennifer L.',
        rating: 4,
        date: '2024-01-05',
        comment: 'Very comprehensive course. Would recommend to anyone wanting to learn React.'
      }
    ]
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i}>
        {i < Math.floor(rating) ? (
          <StarIconSolid className="h-4 w-4 text-yellow-400" />
        ) : (
          <StarIcon className="h-4 w-4 text-gray-300" />
        )}
      </span>
    ));
  };

  const handleAddToCart = () => {
    addToCart(course);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="text-primary-400 text-sm font-medium">{course.category}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {renderStars(course.rating)}
                  </div>
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-gray-400">({course.students.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpenIcon className="h-4 w-4" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center space-x-1">
                  <AcademicCapIcon className="h-4 w-4" />
                  <span>{course.level}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center space-x-4">
                <img
                  src={course.instructorImage}
                  alt={course.instructor}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium">Created by {course.instructor}</p>
                  <p className="text-sm text-gray-400">Last updated {course.lastUpdated}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="card bg-white dark:bg-gray-800 sticky top-8">
                <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${course.price}
                  </span>
                  {course.originalPrice > course.price && (
                    <>
                      <span className="text-lg text-gray-500 dark:text-gray-500 line-through">
                        ${course.originalPrice}
                      </span>
                      <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
                        {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>

                {isInCart(course.id) ? (
                  <button
                    disabled
                    className="w-full btn-primary opacity-50 cursor-not-allowed flex items-center justify-center space-x-2 mb-4"
                  >
                    <CheckIcon className="h-5 w-5" />
                    <span>Added to Cart</span>
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="w-full btn-primary flex items-center justify-center space-x-2 mb-4"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                )}

                <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                  30-Day Money-Back Guarantee
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">This course includes:</h4>
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
              <nav className="flex space-x-8">
                {['overview', 'curriculum', 'instructor', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab
                        ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    About this course
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {course.longDescription}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    What you'll learn
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {course.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-gray-400 mt-2">•</span>
                        <span className="text-gray-600 dark:text-gray-400">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Course Curriculum
                </h2>
                {course.curriculum.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {section.section}
                      </h3>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <PlayIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900 dark:text-white">{lesson.title}</span>
                            {lesson.preview && (
                              <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 px-2 py-1 rounded">
                                Preview
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {lesson.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'instructor' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  About the Instructor
                </h2>
                <div className="flex items-start space-x-4">
                  <img
                    src={course.instructorImage}
                    alt={course.instructor}
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {course.instructor}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {course.instructorBio}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Student Reviews
                </h2>
                <div className="space-y-4">
                  {course.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {review.user}
                          </span>
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Course Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Level:</span>
                  <span className="text-gray-900 dark:text-white">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                  <span className="text-gray-900 dark:text-white">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Lessons:</span>
                  <span className="text-gray-900 dark:text-white">{course.lessons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Language:</span>
                  <span className="text-gray-900 dark:text-white">{course.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Students:</span>
                  <span className="text-gray-900 dark:text-white">{course.students.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
