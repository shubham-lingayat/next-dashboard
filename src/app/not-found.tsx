import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='not_found w-screen h-screen flex justify-center items-center flex-col'>
      <h2>Not Found</h2>
      <p>404</p>
      <Link href="/">
      <button className='border-1 bg-pink-500 text-white p-3 rounded-lg cursor-pointer'>Return to Home</button></Link>
    </div>
  )
}