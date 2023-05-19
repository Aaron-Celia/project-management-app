'use client';
import axios from 'axios';
import { Permanent_Marker } from "next/font/google";
import { useEffect } from 'react';

const pm = Permanent_Marker({
	subsets: ["latin"],
	weight: ["400"]
});

export default function Home() {
  const setNewDevice = async () => {
    console.log('4444')
    const device = localStorage.getItem('deviceId');
    if(!device){
      const res = await axios.post('http://localhost:4000/api/v1/devices');
      console.log('RES: ', res)
      localStorage.setItem('deviceId', res.data.data.device._id);
    }
  }
  useEffect(() => {
    // localStorage.removeItem('deviceId')
    setNewDevice();
  }, []);
	return (
		<main className="h-screen w-screen mt-[80px]">
			{/* <section>add images of the tools/ interface here when they are done</section> */}
			<section className="w-screen text-center">
				<div className="w-1/2 m-[50px] ml-[25vw]">
					<h1 className={`${pm.className} text-3xl font-bold`}>
						Plan Your App
					</h1>
					<p className="text-xl mt-5">
						Our online tools assume you use a component-based front end
						framework and help you plan your side projects component by
						component, function by function, and even helps you design your
						database.
					</p>
				</div>
				<div className="w-1/2 m-[50px] ml-[25vw]">
					<h2 className={`${pm.className} text-3xl font-bold`}>
						No Need To Sign Up
					</h2>
					<p className="text-xl mt-5">
						We keep track of your projects on the specific browser and device
						you're currently using. If either of these change, you will not be
						able to access your previously saved plans. This is done to simplify
						and expidite the planning of your projects.
					</p>
				</div>
				<div className="w-1/2 m-[50px] ml-[25vw]">
					<h2 className={`${pm.className} text-3xl font-bold`}>
						Do not clear your browsers cache
					</h2>
					<p className="text-xl mt-5">
						Due to the methods used to keep track of your projects, clearing the cache of your browser will cause your work to be lost.
					</p>
				</div>
			</section>
		</main>
	);
}
