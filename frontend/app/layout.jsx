import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'
import { Lobster } from 'next/font/google'
import { Righteous } from 'next/font/google'
import { Roboto } from 'next/font/google'
// import { Provider } from 'react-redux'
import store from '@/redux/store'
import CustomProvider from './customProvider'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400']
})

const righteous = Righteous({
  subsets: ['latin'],
  weight: ['400']
})

const lobster = Lobster({
  subsets: ['latin'],
  weight: ['400']
})

export const metadata = {
  title: 'Dev\'s Planner',
  description: 'Plan your application development.',
}

export default function RootLayout({ children }) {
  return (
		<html lang="en">
			<body className={`${roboto.className} bg-slate-400 m-0`}>
				<nav className="w-screen h-[50px] fixed top-0 bg-slate-800 text-white flex justify-between">
					<div
						className={`${lobster.className} text-3xl flex items-center text-yellow-400 h-full w-40 ml-[5px]`}>
						Dev's Planner
					</div>
					<div
						className={`${righteous.className} w-1/4 flex items-center justify-around text-xl h-full nt-to-l`}>
						<Link
							className="text-white hover:text-yellow-400 duration-150"
							href="/">
							Home
						</Link>
						<Link
							className="text-white hover:text-yellow-400 duration-150"
							href="/projects">
							My Projects
						</Link>
						<div
							className="text-white rounded-xl p-2 cursor-pointer
							bg-purple-700
							hover:bg-purple-400
							hover:text-black
							duration-300
						">
							<Link href="/new">New Project</Link>
						</div>
					</div>
				</nav>
				{/* <Provider store={store}> */}
				<CustomProvider>{children}</CustomProvider>
				{/* </Provider> */}
			</body>
		</html>
	);
}