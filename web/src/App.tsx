import React from 'react';
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import "./App.css"

/**
 * This File contains only the introducing or the index page
 * who has the informations about Nastachat
 */

// Index Path Function

const App: React.FC = () => {
  //notifications
  return (
    <div>
      <Navbar Animated />
      <div id='App'>
        <main className='relative top-20 flex flex-col'>
          <div className=' w-[100%] flex justify-center'>
            <section className='flex ml-4 mobile:ml-0 mr-4 max-w-[1300px]'>
              <div className='max-w-[600px] ml-5 mt-[8rem] mobile:mt-[4rem]'>
                <h1 className='text-[60px] mobile:text-[40px] mobile:leading-[45px] xl:text-left text-center sl:text-left leading-[4.5rem]  font-black max-w-[700px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#5937d4] to-[#77bfee]'>The best place to talk and enjoy with poeple</h1>
                <p className='mt-5 font-medium xl:text-left sl:text-left text-[18px] text-center'>Communicate with everyone easly and everywhere in the world, join group see more news with this modern. </p>
                <div className='flex justify-center sl:justify-start xl:justify-start'>
                  <a href='/register'>
                    <button className='text-[17px] font-bold rounded-[6px] transition duration-300 pl-6 pr-6 pb-3 pt-3 mt-4 hover:bg-[#1c1c33]  bg-[#1d1d30de] border border-[#8080803d]'>Get Started</button>
                  </a>
                </div>
              </div>
              <svg className="shape relative hidden -mr-4 ml-[0rem] xl:block"></svg>
            </section>
          </div>
          <div className=" mb-24 section2 border-t-2 mt-[3rem] xl:mt-[0rem] flex text-left justify-center border-[#5959683d]">
            <section className='mt-10 mr-1 ml-10 max-w-[1300px] mr-0 mb-8'>
              <div className=' flex gap-2 flex-row-reverse'>
                <div>
                  <h1 className='text-[40px] font-bold relative bottom-5 mobile-2sm:text-[25px]'>Our Company Goals</h1>
                  <ol className="relative border-l max-w-[1500px] mr-8  ml-auto border-gray-500">
                    <div className="w-[5px] -ml-[.16rem] h-10 rounded-sm bg-[#38384b] sticky top-48"></div>
                    <li className="mb-10 ml-4">
                      <div className="absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-gray-900 bg-gray-700"></div>
                      <time className="mb-1 text-sm font-normal leading-none text-gray-500">22 June 2023</time>
                      <h3 className="text-lg font-semibold text-white">Website Nastachat code in Tailwind CSS</h3>
                      <p className="mb-4 text-base font-normal text-gray-400">Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and posting and explore & Chating Page.</p>
                      <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700 focus:ring-gray-700">Learn more <svg className="w-3 h-3 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></a>
                    </li>
                    <li className="mb-10 ml-4">
                      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-gray-900 bg-gray-700"></div>
                      <time className="mb-1 text-sm font-normal leading-none text-gray-400">1 July 2023</time>
                      <h3 className="text-lg font-semibold text-white">Start Hosting and deploy application</h3>
                      <p className="text-base font-normal text-gray-500 text-gray-400">All of the pages and components gonna be in deployment and everyone can use it, and working in the two versions even as we update the project.</p>
                    </li>
                    <li className="ml-4">
                      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-gray-900 bg-gray-700"></div>
                      <time className="mb-1 text-sm font-normal leading-none text-gray-400 text-gray-500">5 August 2023</time>
                      <h3 className="text-lg font-semibold text-gray-900 text-white">Bring Ai with Nastachat</h3>
                      <p className="text-base font-normal text-gray-500 text-gray-400">Get started with Ai and ChatGPT in web components and interactive elements built to make this application more easy to use</p>
                    </li>
                  </ol>
                </div>
                <div className='shape-2 hidden lg:block'></div>
              </div>
            </section>
          </div>
        </main>
        <div className="mt-16">
          <Footer />
        </div>
      </div>
    </div>
  )
}


export default App;