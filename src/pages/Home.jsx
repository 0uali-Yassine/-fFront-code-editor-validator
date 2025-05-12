import React from 'react'
import { FileText, Trophy } from "lucide-react"
import Ego  from "../assets/Ego-removebg-preview - Copie.png"
import { NavLink, useNavigate } from 'react-router-dom'


function Home() {
  const navigate = useNavigate();

  const logOut = ()=> {
    localStorage.removeItem('user')
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-black rounded-lg flex items-center justify-center mr-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 style={{fontSize:'25px'}} className="text-md font-medium text-gray-700">First Program</h1>
        </div>
       <div className='flex gap-4'>
        <button onClick={logOut} className='bg-red-500 hover:bg-red-400'>
            Log out
          </button>
          <div className="h-10 w-10 rounded-lg overflow-hidden">
            <img src={Ego} alt="Profile" className="h-full w-full object-cover" />
          </div>
       </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Banner */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 h-60 relative">
              <img
                src="https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/Crrtt0LwQ0Cuj5vKbntc"
                alt="Tech Circuit"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-800">Full Stack Coding Bootcamp</h2>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm font-medium">ONGOING</span>
              </div>
              <p className="mt-4 text-gray-600 leading-relaxed">
                AI tools are everywhere and can boost your productivity, but at Geek Institute, we believe nothing can
                replace the creativity and problem-solving skills of a passionate, skilled Fullstack developer!
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Progress */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded mr-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="text-xl font-medium text-gray-800">Full Stack Coding #1 @Casablanca</h3>
                <div className="ml-auto text-sm text-gray-500">Page: 0 /0</div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "0%" }}></div>
              </div>
              <div className="text-right text-sm text-gray-500 mb-6">0%</div>

              {/* Continue Button */}
              <NavLink to='/classroom'>
                <button className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition">
                  Continue Learning
                </button>
              </NavLink>
            </div>
          </div>

          {/* Right Column - Leaderboard */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                  <h3 className="text-xl font-medium text-gray-800">Leaderboard</h3>
                </div>
                <a href="#" className="text-blue-600 text-sm">
                  See All
                </a>
              </div>

              {/* Leaderboard List */}
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-gray-800 mr-4">1</span>
                    <span className="text-gray-700">Zakaria Samir</span>
                  </div>
                  <span className="text-gray-500">102 xp</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-gray-800 mr-4">2</span>
                    <span className="text-gray-700">Machi muchkil Ana nsber</span>
                  </div>
                  <span className="text-gray-500">50 xp</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-gray-800 mr-4">3</span>
                    <span className="text-gray-700">Safi chi deri Akhour</span>
                  </div>
                  <span className="text-gray-500">49 xp</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home