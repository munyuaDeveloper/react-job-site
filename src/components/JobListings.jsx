
import JobListing from './JobListing';
import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from './Spinner';

function JobListings({ isHome = false }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs()
    }, [])

    const fetchJobs = async () => {
        try {
            const data = await fetch(`/api/jobs${isHome ? '?_limit=3' : ''}`)
                .then((response) => response.json())
                .then((data) => data)
            setJobs(isHome ? data.slice(0, 3) : data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }

    }

    return (
        <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                    {isHome ? 'Recent Jobs' : 'Browse Jobs'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {
                        loading ? (<Spinner loading={loading} />) : (
                            <>
                                {
                                    jobs.map((job) => (
                                        <JobListing job={job} key={job.id} />
                                    ))
                                }

                            </>
                        )
                    }


                </div>
            </div>
        </section>

    )
}

export default JobListings
