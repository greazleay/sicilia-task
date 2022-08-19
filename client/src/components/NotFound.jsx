import { Link } from 'react-router-dom'

export const NotFound = () => {
    return (
        <div name="container" className="flex justify-center w-screen h-screen p-10 text-txt">
            <div className="flex flex-col items-center justify-evenly h-full overflow-auto rounded-lg lg:w-3/5 bg-pwgreen sm:w-screen">
                <h3 className="text-4xl">Page Not Found</h3>
                <Link to='/'className='border rounded-full text-lg p-3 bg-wkgreen'>
                    Back to Homepage
                </Link>
            </div>
        </div>
    )
}