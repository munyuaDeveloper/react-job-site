import React from 'react'
import Hero from '../components/Hero'
import HomeCards from '../components/HomeCards'
import JobListings from '../components/JobListings'
import ViewAllJobsButton from '../components/ViewAllJobsButton'

const HomePage = () => {
    return (
        <>
            <Hero />
            <HomeCards />
            <JobListings isHome="true"/>
            <ViewAllJobsButton />
        </>
    )
}

export default HomePage