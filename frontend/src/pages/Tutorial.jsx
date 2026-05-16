import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { Plus, ExternalLink, BookOpen, Edit, Trash2, X } from 'lucide-react';

const Tutorial = () => {
  const navigate = useNavigate();
  const [tutorials, setTutorials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingTutorial, setEditingTutorial] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: ''
  });

  const API_URL = '/api/tutorials';

  // Fetch all tutorials
  const fetchTutorials = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setTutorials(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching tutorials:', err);
      setError(`Failed to load tutorials: ${err.message}`);
      setTutorials([]);
    } finally {
      setLoading(false);
    }
  };

  // Add a new tutorial
  const handleAddTutorial = async (tutorialData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tutorialData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const newTutorial = await response.json();
      setTutorials([...tutorials, newTutorial]);
      setError('');
      return true;
    } catch (err) {
      console.error('Error adding tutorial:', err);
      setError(`Failed to add tutorial: ${err.message}`);
      return false;
    }
  };

  // Update a tutorial
  const handleUpdateTutorial = async (id, tutorialData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tutorialData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const updatedTutorial = await response.json();
      setTutorials(tutorials.map(t => t._id === id ? updatedTutorial : t));
      setError('');
      return true;
    } catch (err) {
      console.error('Error updating tutorial:', err);
      setError(`Failed to update tutorial: ${err.message}`);
      return false;
    }
  };

  // Delete a tutorial
  const handleDeleteTutorial = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tutorial?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      setTutorials(tutorials.filter(t => t._id !== id));
      setError('');
    } catch (err) {
      console.error('Error deleting tutorial:', err);
      setError(`Failed to delete tutorial: ${err.message}`);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = formData.title.trim();
    const description = formData.description.trim();
    const url = formData.url.trim();

    // Validation
    if (!title || !description || !url) {
      setError('Please fill in all fields');
      return;
    }

    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    const tutorialData = { title, description, url };
    let success = false;

    if (editingTutorial) {
      success = await handleUpdateTutorial(editingTutorial._id, tutorialData);
    } else {
      success = await handleAddTutorial(tutorialData);
    }

    if (success) {
      setFormData({ title: '', description: '', url: '' });
      setShowForm(false);
      setEditingTutorial(null);
    }
  };

  // Handle edit
  const handleEdit = (tutorial) => {
    setEditingTutorial(tutorial);
    setFormData({
      title: tutorial.title,
      description: tutorial.description,
      url: tutorial.url
    });
    setShowForm(true);
  };

  // Handle cancel
  const handleCancel = () => {
    setShowForm(false);
    setEditingTutorial(null);
    setFormData({ title: '', description: '', url: '' });
    setError('');
  };

  // Load tutorials on mount
  useEffect(() => {
    fetchTutorials();
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-8 mb-8 text-white">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-lg transition-all duration-200 hover:scale-105 hover:bg-purple-500/20 text-white mr-2"
                title="Back to Home"
              >
                ←
              </button>
              <div className="text-center flex-1">
                <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
                  <BookOpen size={40} />
                  Tutorial Manager - Dhansathi
                </h1>
                <p className="text-purple-100">Smart tutorial management for your learning journey</p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-semibold">Error: {error}</p>
                  <p className="text-sm mt-2 text-red-600">Check that the backend is running on port 5000 and MongoDB is connected.</p>
                </div>
                <button
                  onClick={() => setError('')}
                  className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Add Tutorial Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-100 p-3 rounded-2xl">
                <BookOpen className="text-purple-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {editingTutorial ? 'Edit Tutorial' : 'Add New Tutorial'}
              </h2>
            </div>

            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus size={20} />
                Add New Tutorial
              </button>
            ) : (
              <div>
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="text-gray-500 hover:text-gray-700 transition-colors p-2"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Tutorial Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-500 outline-none transition-all text-gray-800 placeholder-gray-400"
                        placeholder="Enter tutorial title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Tutorial URL *
                      </label>
                      <input
                        type="url"
                        name="url"
                        value={formData.url}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-500 outline-none transition-all text-gray-800 placeholder-gray-400"
                        placeholder="https://example.com/tutorial"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Description *
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-500 outline-none transition-all text-gray-800 placeholder-gray-400"
                        placeholder="Enter tutorial description"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {editingTutorial ? 'Update Tutorial' : 'Add Tutorial'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-8 rounded-2xl font-semibold transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Tutorials Overview */}
          <div className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-3xl p-8 mb-8 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Tutorial Collection</h3>
                <p className="text-purple-200">Manage your learning resources</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-yellow-400">{tutorials.length}</div>
                <div className="text-sm text-purple-200">Total Tutorials</div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 text-lg">Loading tutorials...</p>
            </div>
          )}

          {/* Tutorials List */}
          {!loading && (
            <div className="space-y-6">
              {tutorials.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
                  <BookOpen size={64} className="mx-auto text-gray-300 mb-6" />
                  <h3 className="text-2xl font-bold text-gray-600 mb-3">No tutorials yet</h3>
                  <p className="text-gray-500 text-lg">Add your first tutorial to get started on your learning journey!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tutorials.map((tutorial) => (
                    <div
                      key={tutorial._id}
                      className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-purple-100 p-2 rounded-xl">
                          <BookOpen className="text-purple-600" size={20} />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(tutorial)}
                            className="text-purple-600 hover:text-purple-800 transition-colors p-2 rounded-xl hover:bg-purple-50"
                            title="Edit tutorial"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteTutorial(tutorial._id)}
                            className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-xl hover:bg-red-50"
                            title="Delete tutorial"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{tutorial.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{tutorial.description}</p>

                      <a
                        href={tutorial.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <ExternalLink size={16} />
                        Visit Tutorial
                      </a>

                      {tutorial.createdAt && (
                        <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100">
                          Added: {new Date(tutorial.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tutorial;
