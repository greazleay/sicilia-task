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

                ? <div className="flex items-center justify-center h-full overflow-auto rounded-lg lg:w-3/5 bg-pwgreen sm:w-screen">
                    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                            <div className="flex-1 space-y-6 py-1">
                                <div className="h-2 bg-slate-200 rounded"></div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                    </div>
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                : <div className="h-full p-6 overflow-auto rounded-lg lg:w-3/5 bg-pwgreen scroll-smooth scrollbar sm:w-screen">

                    <h3 className='text-4xl text-center underline underline-offset-8'>
                        FORM SUBMISSION REPORT
                    </h3>

                    <table className='w-full text-left mt-10 table-auto border-collapse border-2 whitespace-normal'>
                        <thead>
                            <tr>
                                <th className='border-2 border-slate-300 bg-neutral-500'>S/N</th>
                                <th className='border-2 border-slate-300 bg-neutral-500'>Full Name</th>
                                <th className='border-2 border-slate-300 bg-neutral-500'>Email Address</th>
                                <th className='border-2 border-slate-300 bg-neutral-500'>Country</th>
                                <th className='border-2 border-slate-300 bg-neutral-500'>Submission Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((submission, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='border border-slate-300'>{index + 1}.</td>
                                        <td className='border border-slate-300'>{submission.name}</td>
                                        <td className='border border-slate-300'>{submission.email}</td>
                                        <td className='border border-slate-300'>{submission.country}</td>
                                        <td className='border border-slate-300'>{new Date(submission.createdAt).toLocaleString()}</td>
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