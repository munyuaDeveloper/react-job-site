import { useState } from 'react'
import { toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddJobPage = () => {
    const [formData, setFormData] = useState(
        {
            title: "",
            type: "Full-Time",
            description: "",
            location: "",
            salary: "Under $50K",
            company: {
                name: "",
                description: "",
                contactEmail: "",
                contactPhone: ""
            }
        }
    );
    const [companyData, setCompanyData] = useState(
        {
            name: "",
            description: "",
            contactEmail: "",
            contactPhone: ""
        }
    );

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleFormFieldChange = (e, form = null) => {
        e.preventDefault();
        const { name, value } = e.target;

        // Check if the field is part of the company object
        if (form === 'company') {
            setCompanyData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        } else {
            // Otherwise update the main fields
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...formData, ...{ company: companyData } }
        setLoading(true);
        createJob(payload);
        navigate('/jobs')
        toast.success('Job saved successfully')

    }

    const createJob = async (payload) => {
        try {
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
            setFormData(
                {
                    title: "",
                    type: "Full-Time",
                    description: "",
                    location: "",
                    salary: "Under $50K",
                    company: {
                        name: "",
                        description: "",
                        contactEmail: "",
                        contactPhone: ""
                    }
                }
            );
            setCompanyData(
                {
                    name: "",
                    description: "",
                    contactEmail: "",
                    contactPhone: ""
                }
            );
        }
    }

    return (
        <section className="bg-indigo-50">
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Job Type</label>
                            <select
                                id="type"
                                name="type"
                                className="border rounded w-full py-2 px-3"
                                required
                                value={formData.type}
                                onChange={e => handleFormFieldChange(e)}
                            >
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Remote">Remote</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Job Listing Name</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="border rounded w-full py-2 px-3 mb-2"
                                placeholder="eg. Beautiful Apartment In Miami"
                                required
                                value={formData.title}
                                onChange={e => handleFormFieldChange(e)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                className="border rounded w-full py-2 px-3"
                                rows="4"
                                placeholder="Add any job duties, expectations, requirements, etc"
                                value={formData.description}
                                onChange={e => handleFormFieldChange(e)}
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Salary</label>
                            <select
                                id="salary"
                                name="salary"
                                className="border rounded w-full py-2 px-3"
                                required
                                value={formData.salary}
                                onChange={e => handleFormFieldChange(e)}
                            >
                                <option value="Under $50K">Under $50K</option>
                                <option value="$50K - 60K">$50K - $60K</option>
                                <option value="$60K - 70K">$60K - $70K</option>
                                <option value="$70K - 80K">$70K - $80K</option>
                                <option value="$80K - 90K">$80K - $90K</option>
                                <option value="$90K - 100K">$90K - $100K</option>
                                <option value="$100K - 125K">$100K - $125K</option>
                                <option value="$125K - 150K">$125K - $150K</option>
                                <option value="$150K - 175K">$150K - $175K</option>
                                <option value="$175K - 200K">$175K - $200K</option>
                                <option value="Over $200K">Over $200K</option>
                            </select>
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>Location</label>
                            <input
                                type='text'
                                id='location'
                                name='location'
                                className='border rounded w-full py-2 px-3 mb-2'
                                placeholder='Company Location'
                                required
                                value={formData.location}
                                onChange={e => handleFormFieldChange(e)}
                            />
                        </div>

                        <h3 className="text-2xl mb-5">Company Info</h3>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Company Name</label>
                            <input
                                type="text"
                                id="company"
                                name="name"
                                className="border rounded w-full py-2 px-3"
                                placeholder="Company Name"
                                value={companyData.name}
                                onChange={e => handleFormFieldChange(e, 'company')}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Company Description</label>
                            <textarea
                                id="company_description"
                                name="description"
                                className="border rounded w-full py-2 px-3"
                                rows="4"
                                placeholder="What does your company do?"
                                value={companyData.description}
                                onChange={e => handleFormFieldChange(e, 'company')}
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Contact Email</label>
                            <input
                                type="email"
                                id="contact_email"
                                name="contactEmail"
                                className="border rounded w-full py-2 px-3"
                                placeholder="Email address for applicants"
                                required
                                value={companyData.contactEmail}
                                onChange={e => handleFormFieldChange(e, 'company')}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Contact Phone</label>
                            <input
                                type="tel"
                                id="contact_phone"
                                name="contactPhone"
                                className="border rounded w-full py-2 px-3"
                                placeholder="Optional phone for applicants"
                                value={companyData.contactPhone}
                                onChange={e => handleFormFieldChange(e, 'company')}
                            />
                        </div>

                        <div>
                            <button
                                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                                type="submit"
                                disabled={loading ? true : false}
                            >
                                {loading ? 'Adding job...' : 'Add Job'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AddJobPage