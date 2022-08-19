import { useEffect, useState, Fragment } from 'react'
import axios from 'axios'

export const Submissions = () => {

    const [submissions, setSubmissions] = useState([])
    const [loading, setLoading] = useState(true)
    const [isError, setIsError] = useState('')

    const fetchSurveys = async () => {
        try {

            const { data } = await axios.get('http://localhost:4000/survey/all-surveys');

            setSubmissions(data.allSurveys)
            setIsError('')

        } catch (error) {
            console.error(err.response?.data?.error ?? err.message)
            setIsError(err.response?.data?.error ?? err.message);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {

        let isMounted = true;

        if (isMounted) {
            fetchSurveys()
        };

        return () => {
            isMounted = false
        }
    }, []);


    if (isError) {
        return (

            <div name="container" className="flex justify-center w-screen h-screen p-10 text-txt ">
                <div className="h-full p-6 overflow-auto rounded-lg lg:w-3/5 bg-pwgreen sm:w-screen">
                    {isError}
                </div>
            </div>
        )
    }


    return (

        <div
            name="container"
            className="flex items-center justify-center w-screen h-screen p-10 text-txt "
        >
            {loading

                ? <div className="h-full p-6 overflow-auto rounded-lg lg:w-3/5 bg-pwgreen sm:w-screen">
                    <h2>Loading, Please Wait .........</h2>
                </div>

                : <div className="h-full p-6 overflow-auto rounded-lg lg:w-3/5 bg-pwgreen scroll-smooth scrollbar sm:w-screen">

                    <h3 className='text-4xl text-center'>
                        FORM SUBMISSION REPORT
                    </h3>

                    <table className='w-full text-left mt-10'>
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Full Name</th>
                                <th>Email Address</th>
                                <th>Country</th>
                                <th>Submission Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((submission, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{submission.name}</td>
                                        <td>{submission.email}</td>
                                        <td>{submission.country}</td>
                                        <td>{new Date(submission.createdAt).toLocaleString()}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div>
            }
        </div>
    )
}