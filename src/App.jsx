import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';


function App() {

  const deleteJob = async (id) => {
    try {
      const data = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.log(error)
    }
    return;
  }

  const updateJob = async(payload) => {
    try {
      const data = await fetch(`/api/jobs/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      if (!data.ok) {
        throw new Error('Network response was not ok');
    }
    } catch (error) {
      console.log(error)
    }
    return;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path='/edit-job/:id' element={<EditJobPage updateJob={updateJob}/>} loader={jobLoader} />
        <Route path='/add-job' element={<AddJobPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>


    ))
  return <RouterProvider router={router} />
}

export default App