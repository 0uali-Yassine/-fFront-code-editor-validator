import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, FileText, Circle } from "lucide-react"
import Ego from "../assets/Ego-removebg-preview - Copie.png"
import { NavLink, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { MdOutlineTimelapse } from "react-icons/md";
import PythonEditor from '../components/PythonEditor';

const fetcherWithToken = async (url) => {

    const token = localStorage.getItem('token');
    const res = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.');
        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
};


function ClassRoom() {
    const navigate = useNavigate();
    const [Lectourse, setLectourse] = useState([]);
    const [Sections, setSections] = useState([]);
    const [Quiz, setQuiz] = useState([]);
    const [showLectures, setShowLectures] = useState(true);
    const [showAssignments, setShowAssignments] = useState(false); // new
    const [showQuizzes, setShowQuizzes] = useState(false); 


    const { data, error, isLoading } = useSWR(
        'http://localhost:3000/api/student-content',
        fetcherWithToken
    );

   

    // const { page, sections, sectionWithCode } = data;

    const [pageTitle, setPageTitle] = useState('');
    const [pageDescrition, setPageDescrition] = useState('');
    console.log({pageDescrition});

    useEffect(() => {
        if (data?.sections && data?.sections.length > 0) {
            setPageTitle(data?.sections[0].title);
            setPageDescrition(data?.sections[0].description);
        }
    }, [data?.sections]);
    

    useEffect(() => {
        if (data?.sections && Array.isArray(data?.sections)) {
            setLectourse(data?.sections.filter(sect => sect.type === "lecture"));
            setSections(data?.sections.filter(sect => sect.type === "exercise"));
            setQuiz(data?.sections.filter(sect => sect.type === "quiz"));
        }
    }, [data?.sections]);
    if (isLoading) return <div className="p-8">Loading...</div>;
    if (error) return <div className="p-8 text-red-500">Failed to load data</div>;

    const logOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div className="flex flex-col h-screen bg-white">
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
                    <h1 style={{ fontSize: '25px' }} className="text-md font-medium text-gray-700">First Program</h1>
                </div>
                <div className='flex gap-4 justify-between'>
                    <NavLink to='/home' className="text-blue-500">Back home</NavLink>
                    <button onClick={logOut} className='bg-red-500 hover:bg-red-400'>
                        Log out
                    </button>
                    <div className="h-10 w-10 rounded-lg overflow-hidden">
                        <img src={Ego} alt="Profile" className="h-full w-full object-cover" />
                    </div>
                </div>
            </header>
            {/* Top navigation */}
            <div className="flex items-center justify-between border-b p-2">
                <div className="flex gap-2 items-center border bg-gray-50 p-3 rounded-md">
                        <ChevronLeft className="h-5 w-5 bg-gray-100 rounded-md text-gray-600 cursor-pointer" />
                    <span className="text-gray-700 font-medium">{data?.page?.title}</span>
                        <ChevronRight className="h-5 w-5 bg-gray-100 rounded-md text-gray-600 cursor-pointer" />
                </div>
                <div className="flex items-center">
                    <span className="text-gray-700 font-medium">{pageTitle}</span>
                    <button variant="ghost" size="icon" className="ml-2">
                        <ChevronUp className="h-5 w-5" />
                    </button>
                    <button variant="ghost" size="icon" className="ml-2">
                        <ChevronDown className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}

                {/* lecoure */}
                <div className="relative w-64 border-r overflow-y-auto bg-gray-50">
                    <div className="relative w-64 border-r overflow-y-auto">
                        {/* Header: Click to toggle */}
                        <div
                            onClick={() => setShowLectures(!showLectures)}
                            className="p-3 border-b cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-700">Lecture</span>
                                {showLectures ? (
                                    <ChevronUp className="h-4 w-4 text-gray-500" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                )}
                            </div>
                        </div>

                        {/* Lecture Items: Only show if expanded */}
                        {showLectures &&
                            Lectourse.map((lecture, key) => {
                                console.log({lecture})
                                return (<div
                                    key={key}
                                    onClick={() => {
                                        setPageTitle(lecture.title);
                                        setPageDescrition(lecture.description);
                                    }}
                                    className="flex cursor-pointer hover:bg-gray-100 items-center p-3 border-b border-gray-200"
                                >
                                    <FileText className="h-4 w-4 text-gray-500 mr-2" />
                                    <span className="text-gray-700">{lecture.title}</span>
                                </div>)

    })}
                    </div>
                    {/* exercice */}
                    <div className="relative w-64 border-r overflow-y-auto">
                        {/* Header: Click to toggle */}
                        <div
                            onClick={() => setShowAssignments(!showAssignments)}
                            className="p-3 border-b cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-700">Assingment</span>
                                {showAssignments ? (
                                    <ChevronUp className="h-4 w-4 text-gray-500" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                )}
                            </div>
                        </div>

                        {/* Lecture Items: Only show if expanded */}
                        {showAssignments &&
                            Sections.map((sect, key) => (
                                <div
                                    key={key}
                                    onClick={() => {
                                        setPageTitle(sect.title);
                                        setPageDescrition(sect.description);
                                    }}
                                    className="flex gap-3  cursor-pointer hover:bg-gray-100 items-center p-3 border-b border-gray-200"
                                >
                                    <FileText className="h-4 w-4 text-gray-500 mr-2" />
                                    <span className="text-gray-700">{sect.title}</span>
                                     {
                                        data?.sectionWithCode.length === 0 ? (<MdOutlineTimelapse className='text-gray-400 text-xl' />)
                                        :(<MdOutlineTimelapse className='text-green-400 text-xl' />)
                                     }
                                    {/* <Circle className="h-5 w-5 text-gray-400 border border-gray-400 rounded-full" /> */}
                                </div>
                            ))}
                    </div>
                   
                    {/* Quiz */}
                    <div className="relative w-64 border-r overflow-y-auto">
                        {/* Header: Click to toggle */}
                        <div
                            onClick={() => setShowQuizzes(!showQuizzes)}
                            className="p-3 border-b cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-700">Quiz</span>
                                {showQuizzes ? (
                                    <ChevronUp className="h-4 w-4 text-gray-500" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                )}
                            </div>
                        </div>

                        {/* Lecture Items: Only show if expanded */}
                        {showQuizzes &&
                           
                            Quiz.map((q, key) => {
                                return (<div>
                                    <div key={key}
                                    onClick={() => {
                                        setPageTitle(q.title);
                                        setPageDescrition(q.description);
                                    }}
                                     className="flex items-center hover:bg-gray-100 cursor-pointer p-3 border-b border-gray-200">
                                        <FileText className="h-4 w-4 text-gray-500 mr-2" />
                                        <span className="text-gray-700">{q.title}</span>
                                    </div>
                                </div>)
                            })
                        }
                    </div>

                    <div>
                        <div className="flex items-center p-3 border-b border-gray-200">
                            <div className="h-6 w-6  bg-black rounded mr-2 flex items-center justify-center text-white text-xs">
                                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                            <span className="text-gray-700">First Program</span>
                        </div>
                    </div>
                </div>

                {/* Main content area */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <h1 className="text-3xl font-bold mb-8">{pageTitle}</h1>

                    <div className="flex justify-center mb-8 text-red-400">
                    <div
                        className="flex justify-center mb-8"
                        dangerouslySetInnerHTML={{ __html: pageDescrition }} // correct spelling!
                        />

                    </div>
                    <PythonEditor/>

                </div>
            </div>
        </div>
    )
}

export default ClassRoom;