import React from 'react'
import { images } from '../constants';
import { IoLogoLinkedin } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import MainLayout from '../Components/MainLayout';


const AboutUs = () => {
  return (
    <MainLayout>
    <section class="bg-white mt-24 dark:bg-gray-900">
  <div class="py-8 px-5 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
      <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">The Team Behind Predictive Play</h2>
     </div> 
      <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          <div class="items-center  bg-gray-50 rounded-lg shadow flex flex-row dark:bg-gray-800 dark:border-gray-700">
              <div className='w-[60%] lg:w-[70%]'>
               <a href="#">
                  <img class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src={images.imgpru}  alt="Jese Avatar"/>
              </a>
              </div>
              <div class="p-5">
                  <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a href="#">Pruthviraj M Savanur</a>
                  </h3>
                  <span class="text-gray-500 dark:text-gray-400">Backend Developer</span>
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">This website is created for entertainment purposes, so feel free to enjoy yourself!</p>
                  <ul class="flex flex-row space-x-4 sm:mt-0">
                      <li>
                          <a href="https://www.instagram.com/pruthvirajmsavanur" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
<FaInstagramSquare size={25}/>                          </a>
                      </li>
                      <li>
                          <a href="https://www.linkedin.com/in/pruthviraj-m-savanur-286294260/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
<IoLogoLinkedin size={25}/>                          </a>
                      </li>
                      <li>
                          <a href="https://github.com/Pruthviraj-2004" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
<FaGithub size={25}/>                          </a>
                      </li>
                      
                  </ul>
              </div>
          </div> 
          <div class="items-center bg-gray-50 rounded-lg shadow flex flex-row dark:bg-gray-800 dark:border-gray-700">
             
              <div className='w-[50%]'>
                <a href="#">
                  <img class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src={images.imgsunitha} alt="Bonnie Avatar"/>
              </a>
              </div>
              <div class="p-5 lg:w-[70%] md:w-[70%] sm:w-[70%] items-center">
                  <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a href="#">Sunitha B</a>
                  </h3>
                  <span class="text-gray-500 dark:text-gray-400">Web developer</span>
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Get ready to be entertained and have a great time exploring this website!</p>
                  <ul class="flex flex-row space-x-4 sm:mt-0">
                      <li>
                          <a href="https://www.instagram.com/_.sunitha_/" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
<FaInstagramSquare size={25}/>                          </a>
                      </li>
                      <li>
                          <a href="https://www.linkedin.com/in/sunitha-b-1a0960230/" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
<IoLogoLinkedin size={25}/>                          </a>
                      </li>
                     <li>
                          <a href="https://github.com/Sssunithaaa" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
<FaGithub size={25}/>                          </a>
                      </li>
                      
                  </ul>
              </div>
          </div> 
         
      </div>  
  </div>
</section>
</MainLayout>
  )
}

export default AboutUs