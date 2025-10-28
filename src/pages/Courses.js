import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import {
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  PlayIcon,
  ShoppingCartIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const Courses = () => {
  const { addToCart, isInCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock course data
  const courses = [
    {
      id: 1,
      title: 'Complete React Developer Course',
      instructor: 'John Smith',
      category: 'Web Development',
      price: 89.99,
      originalPrice: 199.99,
      rating: 4.8,
      students: 15420,
      duration: '40 hours',
      lessons: 156,
      level: 'Beginner',
      thumbnail: 'https://via.placeholder.com/400x225/3B82F6/FFFFFF?text=React+Course',
      description: 'Master React from basics to advanced concepts with hands-on projects.',
      features: ['Build 10+ Projects', 'React Hooks', 'Redux', 'Next.js', 'Certificate']
    },
    {
      id: 2,
      title: 'Advanced JavaScript Mastery',
      instructor: 'Sarah Johnson',
      category: 'Programming',
      price: 79.99,
      originalPrice: 149.99,
      rating: 4.9,
      students: 12800,
      duration: '35 hours',
      lessons: 128,
      level: 'Advanced',
      thumbnail: 'https://via.placeholder.com/400x225/F59E0B/FFFFFF?text=JavaScript',
      description: 'Deep dive into advanced JavaScript concepts and modern ES6+ features.',
      features: ['ES6+ Features', 'Async Programming', 'Design Patterns', 'Performance', 'Testing']
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Emily Chen',
      category: 'Design',
      price: 69.99,
      originalPrice: 129.99,
      rating: 4.7,
      students: 9650,
      duration: '25 hours',
      lessons: 89,
      level: 'Beginner',
      thumbnail: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=UI%2FUX+Design',
      description: 'Learn design principles and create beautiful user interfaces.',
      features: ['Design Principles', 'Figma', 'Prototyping', 'User Research', 'Portfolio']
    },
    {
      id: 4,
      title: 'Node.js Backend Development',
      instructor: 'Michael Rodriguez',
      category: 'Backend',
      price: 94.99,
      originalPrice: 179.99,
      rating: 4.6,
      students: 8920,
      duration: '45 hours',
      lessons: 167,
      level: 'Intermediate',
      thumbnail: 'https://via.placeholder.com/400x225/10B981/FFFFFF?text=Node.js',
      description: 'Build scalable backend applications with Node.js and Express.',
      features: ['Express.js', 'MongoDB', 'Authentication', 'APIs', 'Deployment']
    },
    {
      id: 5,
      title: 'Machine Learning with Python',
      instructor: 'Dr. Alex Kumar',
      category: 'Data Science',
      price: 119.99,
      originalPrice: 249.99,
      rating: 4.8,
      students: 11200,
      duration: '60 hours',
      lessons: 201,
      level: 'Intermediate',
      thumbnail: 'https://via.placeholder.com/400x225/EF4444/FFFFFF?text=Machine+Learning',
      description: 'Master machine learning algorithms and build AI applications.',
      features: ['Scikit-learn', 'TensorFlow', 'Data Analysis', 'Neural Networks', 'Projects']
    },
    {
      id: 6,
      title: 'Mobile App Development with React Native',
      instructor: 'Lisa Wang',
      category: 'Mobile Development',
      price: 99.99,
      originalPrice: 199.99,
      rating: 4.7,
      students: 7850,
      duration: '50 hours',
      lessons: 178,
      level: 'Intermediate',
      thumbnail: 'https://via.placeholder.com/400x225/06B6D4/FFFFFF?text=React+Native',
      description: 'Build cross-platform mobile apps with React Native.',
      features: ['iOS & Android', 'Navigation', 'State Management', 'Native Modules', 'Publishing']
    }
  ];

  const categories = ['All', ...new Set(courses.map(course => course.category))];

  const filteredCourses = courses
    .filter(course => selectedCategory === 'All' || course.category === selectedCategory)
    .filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     course.instructor.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        default:
          return b.students - a.students;
      }
    });

  const handleAddToCart = (course) => {
    addToCart(course);
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover thousands of courses from expert instructors
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search courses..."
                className="input-field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredCourses.length} courses
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="card hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                  {course.level}
                </div>
                {course.originalPrice > course.price && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    by {course.instructor}
                  </p>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <PlayIcon className="h-4 w-4" />
                    <span>{course.lessons} lessons</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {renderStars(course.rating)}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {course.rating}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ({course.students.toLocaleString()})
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {course.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                  {course.features.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      +{course.features.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${course.price}
                    </span>
                    {course.originalPrice > course.price && (
                      <span className="text-sm text-gray-500 dark:text-gray-500 line-through">
                        ${course.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/courses/${course.id}`}
                      className="btn-secondary text-sm py-1 px-3"
                    >
                      Preview
                    </Link>
                    {isInCart(course.id) ? (
                      <button
                        disabled
                        className="btn-primary text-sm py-1 px-3 opacity-50 cursor-not-allowed flex items-center space-x-1"
                      >
                        <CheckIcon className="h-4 w-4" />
                        <span>In Cart</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(course)}
                        className="btn-primary text-sm py-1 px-3 flex items-center space-x-1"
                      >
                        <ShoppingCartIcon className="h-4 w-4" />
                        <span>Add to Cart</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No courses found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="btn-primary mt-4"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
