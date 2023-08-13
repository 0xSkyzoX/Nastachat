import React from "react";

const Footer: React.FC = () => {
     return (
          <div id="footer">
               <footer className=" bg-[#0c0d11] shadow-[#31313127] shadow-inner border-t border-[#80808048] pt-14 pb-8 w-[100%]">
                    <div className="ml-3 mr-3">
                         <div className="max-w-[1300px] ml-auto mr-auto">
                              <div className="flex flex-wrap mobile-footer:flex-col mobile-footer:ml-5 justify-around gap-10 ml-auto mr-auto max-w-[1000px]">
                                   <div className="leading-8 ml-2">
                                        <h1 className="text-[26px] font-[600] mb-3">Social Media</h1>
                                        <ul className="[&>*>*]:transition duration-200">
                                             <li><a className="hover:text-blue-500" href="/payments">Social News</a></li>
                                             <li><a className="hover:text-blue-500" href="/collections">Explore Posts</a></li>
                                             <li><a className="hover:text-blue-500" href="/conversions">Join Groups</a></li>
                                             <li><a className="hover:text-blue-500" href="/global-account">Global Chat</a></li>
                                        </ul>
                                   </div>
                                   <div className="leading-8">
                                        <h1 className="text-[26px] font-[600] mb-3">Our Company</h1>
                                        <ul className="[&>*>*]:transition duration-200">
                                             <li><a className="hover:text-blue-500" href="about-us">About Us</a></li>
                                             <li><a className="hover:text-blue-500" href="news">News &amp; Media</a></li>
                                             <li><a className="hover:text-blue-500" href="licenses">Licenses</a></li>
                                        </ul>
                                   </div>
                                   <div className="leading-8">
                                        <h1 className="text-[26px] font-[600] mb-3">Resources</h1>
                                        <ul className="[&>*>*]:transition duration-200">
                                             <li><a className="hover:text-blue-500" href="blog">Blog</a></li>
                                             <li><a className="hover:text-blue-500" href="help">Help Center</a>
                                             </li><li><a className="hover:text-blue-500" href="partnerships">Partnerships</a></li>
                                             <li><a className="hover:text-blue-500" href="developers">Developers</a></li>
                                             <li><a className="hover:text-blue-500" href="safely">Safely &amp; securely</a></li>
                                        </ul>
                                   </div>
                                   <div className="leading-8">
                                        <h1 className="text-[26px] font-[600] mb-3">Members</h1>
                                        <ul className="[&>*>*]:transition duration-200">
                                             <li><a className="hover:text-blue-500" href="/login">Login In</a></li>
                                             <li><a className="hover:text-blue-500" href="/register">Sign Up</a></li>
                                        </ul>
                                   </div>
                                   <div className="mr-0">
                                        <h2 className="text-[26px] mb-3 font-[600]">Subscribe to our news</h2>
                                        <input type="text" className="pl-4 pr-4 pt-2 pb-2 mb-3 bg-gray-900 mobile-sm:w-[150px] opacity-90 cursor-not-allowed rounded-md border border-[#52525293]" placeholder="Email Address" required disabled />
                                        <p>We care about protecting your data.</p>

                                   </div>
                              </div>
                              <div className="flex flex-col mobile-footer:ml-5 justify-center ml-auto mr-auto max-w-[1000px] mt-14">
                                   <div className="flex justify-between flex-col lg:flex-row">
                                        <h1 className="font-bold text-[35px] mobile-2sm:text-[20px]">Nastachat</h1>
                                        <p className="text-[14px] max-w-[700px]">Special Code Technologies Ltd is authorised and regulated by the Financial Conduct Authority under the Electronic Money Regulations 2011 the purposes of issuing electronic money and provide payment services. Firm Reference Number 963951.
                                        </p>
                                   </div>
                                   <div className="flex mt-6 justify-between flex-col lg:flex-row">
                                        <p className="text-[14px]">©2023 Special Code - Singapore / Hong Kong / Indonesia / Macao / United Kingdom</p>
                                        <ul className="flex flex-wrap gap-3 [&>*]:transition duration-200 text-[14px]">
                                             <li className="hover:text-blue-500"><a href="terms-of-use">Terms of Use</a></li>
                                             <li className="hover:text-blue-500"><a href="safeguarding">Safeguarding</a></li>
                                             <li className="hover:text-blue-500"><a href="privacy-notice">Privacy Notice</a></li>
                                             <li className="hover:text-blue-500"><a href="cookie-policy">Cookie Policy</a></li>
                                        </ul>
                                   </div>
                              </div>
                         </div>
                    </div>

               </footer>
          </div>
     )
}


export default Footer;