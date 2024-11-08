import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

// Fake API call function
const fakeApiCall = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("API Response: Course created successfully with data:", data);
      resolve({ success: true, message: "Course created successfully!" });
    }, 1000);
  });
};

const CreateCoursePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    aboutThisCourse: {
      description: '',
      features: [''],
    },
    testimonials: {
      title: 'Testimonials',
      isActive: false,
      testimonialsMetaData: [{ name: '', profilePic: null, description: '', rating: '' }],
    },
    courseBenefits: {
      title: 'Course Benefits',
      benefitsActive: false,
      benefitsMetaData: [{ emoji: '', title: '' }],
    },
    faQ:{
        title: "Frequently Asked Questions",
        isActive: true,
        faQMetaData:[
            {
                question: "",
                answer: ""
            }
        ]
    },
    gallery:{
        title: "Gallery",
        isActive: false,
        imageMetaData: [
            {
                name: "",
                image:""
            },
        ]
    },
    products:{
        title: "Products",
        isActive: false,
        productMetaData: [
            {
                name: "",
                price: "",
                productLink:""
            }
        ]
    }
  });

  const [imagePreviews, setImagePreviews] = useState({});
  const [error, setError] = useState('');
  

  const handleAddFeature = () =>
    setFormData({
      ...formData,
      aboutThisCourse: {
        ...formData.aboutThisCourse,
        features: [...formData.aboutThisCourse.features, ''],
      },
    });

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.aboutThisCourse.features];
    updatedFeatures[index] = value;
    setFormData({
      ...formData,
      aboutThisCourse: { ...formData.aboutThisCourse, features: updatedFeatures },
    });
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...formData.aboutThisCourse.features];
    updatedFeatures.splice(index, 1);
    setFormData({
      ...formData,
      aboutThisCourse: { ...formData.aboutThisCourse, features: updatedFeatures },
    });
  };

  const handleAddTestimonial = () => {
    setFormData({
      ...formData,
      testimonials: {
        ...formData.testimonials,
        testimonialsMetaData: [
          ...formData.testimonials.testimonialsMetaData,
          { name: '', profilePic: null, description: '', rating: '' },
        ],
      },
    });
  };

  const handleRemoveTestimonial = (index) => {
    const updatedTestimonials = [...formData.testimonials.testimonialsMetaData];
    updatedTestimonials.splice(index, 1);
    setFormData({
      ...formData,
      testimonials: { ...formData.testimonials, testimonialsMetaData: updatedTestimonials },
    });
  };

  const handleTestimonialChange = (index, field, value) => {
    const updatedTestimonials = [...formData.testimonials.testimonialsMetaData];
    updatedTestimonials[index][field] = value;
    setFormData({
      ...formData,
      testimonials: { ...formData.testimonials, testimonialsMetaData: updatedTestimonials },
    });
  };

  const handleAddBenefit = () => {
    setFormData({
      ...formData,
      courseBenefits: {
        ...formData.courseBenefits,
        benefitsMetaData: [...formData.courseBenefits.benefitsMetaData, { emoji: '', title: '' }],
      },
    });
  };

  const handleRemoveBenefit = (index) => {
    const updatedBenefits = [...formData.courseBenefits.benefitsMetaData];
    updatedBenefits.splice(index, 1);
    setFormData({
      ...formData,
      courseBenefits: { ...formData.courseBenefits, benefitsMetaData: updatedBenefits },
    });
  };

  const handleBenefitChange = (index, field, value) => {
    const updatedBenefits = [...formData.courseBenefits.benefitsMetaData];
    updatedBenefits[index][field] = value;
    setFormData({
      ...formData,
      courseBenefits: { ...formData.courseBenefits, benefitsMetaData: updatedBenefits },
    });
  };

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedTestimonials = [...formData.testimonials.testimonialsMetaData];
      updatedTestimonials[index].profilePic = file;
      setFormData({
        ...formData,
        testimonials: { ...formData.testimonials, testimonialsMetaData: updatedTestimonials },
      });

      setImagePreviews({
        ...imagePreviews,
        [index]: URL.createObjectURL(file),
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.aboutThisCourse.description) {
      setError('Please fill in the title, price, and course description.');
      return;
    }
    const response = await fakeApiCall(formData);
    if (response.success) {
      alert(response.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-8">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">Create New Course</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Title, Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200"
                placeholder="Enter course title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200"
                placeholder="Enter course price"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.aboutThisCourse.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  aboutThisCourse: { ...formData.aboutThisCourse, description: e.target.value },
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200"
              placeholder="Describe your course"
              required
            ></textarea>
          </div>

          {/* Features */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
            <div className="space-y-3">
              {formData.aboutThisCourse.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-red-500 hover:text-red-600"
                      aria-label={`Remove feature ${index + 1}`}
                    >
                      <Minus size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddFeature}
              className="mt-4 inline-flex items-center text-sm px-4 py-2 bg-gray-100 text-gray-600 rounded-lg shadow-sm hover:bg-gray-200"
            >
              <Plus size={16} className="mr-2" />
              Add Feature
            </button>
          </div>

          {/* Testimonials */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Enable Testimonials</label>
              <input
                type="checkbox"
                checked={formData.testimonials.isActive}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    testimonials: {
                      ...formData.testimonials,
                      isActive: e.target.checked,
                    },
                  })
                }
                className="w-5 h-5 text-indigo-500 rounded focus:ring-indigo-300"
              />
            </div>
            {formData.testimonials.isActive && (
              <div className="mt-4 space-y-4">
                {formData.testimonials.testimonialsMetaData.map((testimonial, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        placeholder="Name"
                        value={testimonial.name}
                        onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveTestimonial(index)}
                        className="ml-2 text-red-500 hover:text-red-600"
                      >
                        <Minus size={18} />
                      </button>
                    </div>
                    <textarea
                      placeholder="Description"
                      value={testimonial.description}
                      onChange={(e) => handleTestimonialChange(index, 'description', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    ></textarea>
                    <input
                      type="file"
                      onChange={(e) => handleImageUpload(index, e)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    {imagePreviews[index] && (
                      <img src={imagePreviews[index]} alt={`Profile ${index}`} className="w-16 h-16 rounded-full mt-2" />
                    )}
                    <input
                      type="number"
                      placeholder="Rating (1-5)"
                      value={testimonial.rating}
                      onChange={(e) => handleTestimonialChange(index, 'rating', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddTestimonial}
                  className="inline-flex items-center text-sm px-4 py-2 bg-gray-100 text-gray-600 rounded-lg shadow-sm hover:bg-gray-200"
                >
                  <Plus size={16} className="mr-2" />
                  Add Testimonial
                </button>
              </div>
            )}
          </div>

          {/* Course Benefits */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Enable Course Benefits</label>
              <input
                type="checkbox"
                checked={formData.courseBenefits.benefitsActive}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    courseBenefits: {
                      ...formData.courseBenefits,
                      benefitsActive: e.target.checked,
                    },
                  })
                }
                className="w-5 h-5 text-indigo-500 rounded focus:ring-indigo-300"
              />
            </div>
            {formData.courseBenefits.benefitsActive && (
              <div className="mt-4 space-y-4">
                {formData.courseBenefits.benefitsMetaData.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      placeholder="Emoji"
                      value={benefit.emoji}
                      onChange={(e) => handleBenefitChange(index, 'emoji', e.target.value)}
                      className="w-1/6 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Benefit Title"
                      value={benefit.title}
                      onChange={(e) => handleBenefitChange(index, 'title', e.target.value)}
                      className="w-5/6 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveBenefit(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Minus size={18} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddBenefit}
                  className="inline-flex items-center text-sm px-4 py-2 bg-gray-100 text-gray-600 rounded-lg shadow-sm hover:bg-gray-200"
                >
                  <Plus size={16} className="mr-2" />
                  Add Benefit
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCoursePage;