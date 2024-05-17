import { useParams, Link, useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { useState } from 'react'
import { toast} from 'react-toastify'

import Modal from '../components/Modal'

const JobPage = ({ deleteJob }) => {
    const { id } = useParams();
    const job = useLoaderData();
    const navigate = useNavigate();

    const [isModalOpen, setModalOpen] = useState(false);

    const openDeleteModal = () => setModalOpen(true);
    const closeDeleteModal = () => setModalOpen(false);

    const handleConfirmDelete = () => {
        deleteJob(id);
        setModalOpen(false);
        toast.success('Job deleted successfully')
        navigate('/jobs')
    };

    return (
        <>
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                        to="/jobs"
                        className="text-indigo-500 hover:text-indigo-600 flex items-center"
                    >
                        <FaArrowLeft className="mr-2" /> Back to Job Listings
                    </Link>
                </div>
            </section>


            <section className="bg-indigo-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">

                        <main>
                            <div
                                className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
                            >
                                <div className="text-gray-500 mb-4">{job.title}</div>
                                <h1 className="text-3xl font-bold mb-4">
                                    {job.title}
                                </h1>
                                <div
                                    className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                                >
                                    <FaMapMarker
                                        className="text-lg text-orange-700 mr-2"
                                    />
                                    <p className="text-orange-700">{job.location}</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                                    Job Description
                                </h3>

                                <p className="mb-4">
                                    {job.description}
                                </p>

                                <h3 className="text-indigo-800 text-lg font-bold mb-2">Salary</h3>

                                <p className="mb-4">{job.salary} / Year</p>
                            </div>
                        </main>
                        <aside>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                                <h2 className="text-2xl">{job.company.name}</h2>

                                <p className="my-2">
                                    {job.company.description}
                                </p>

                                <hr className="my-4" />

                                <h3 className="text-xl">Contact Email:</h3>

                                <p className="my-2 bg-indigo-100 p-2 font-bold">
                                    {job.company.contactEmail}
                                </p>

                                <h3 className="text-xl">Contact Phone:</h3>

                                <p className="my-2 bg-indigo-100 p-2 font-bold">{job.company.contactPhone}</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                                <Link
                                    to={`/edit-job/${id}`}
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                >Edit Job</Link>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                    onClick={openDeleteModal}
                                >
                                    Delete Job
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
            <div className="flex items-center justify-center bg-gray-100">
                <Modal isOpen={isModalOpen} onClose={closeDeleteModal} onConfirm={handleConfirmDelete}>
                    <h3 className="text-lg font-bold mt-0 pt-0 text-center">Do you want to Delete this job?</h3>

                    <div className="flex justify-center gap-20 my-6">
                        <button
                            className=" px-8 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={closeDeleteModal}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-8 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                            onClick={handleConfirmDelete}
                        >
                            Confirm
                        </button>
                    </div>
                </Modal>
            </div>

        </>
    )
}


const jobLoader = async ({ params }) => {
    try {
        const data = await fetch(`/api/jobs/${params.id}`)
            .then((res) => res.json())
            .then((res) => res)
        return data;
    } catch (error) {
        console.log(error)
        return null;
    }

}

export { JobPage as default, jobLoader }