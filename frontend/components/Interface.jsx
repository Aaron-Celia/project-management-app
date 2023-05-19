import { Permanent_Marker } from "next/font/google";

const pm = Permanent_Marker({
	subsets: ["latin"],
	weight: ["400"]
});

export default function Interface({ headerColor, headerText, component, addedClassName }) {
	return (
		<div className="h-[100%] w-[100%]">
			<div
				className={`fixed top-0 rounded-t-xl h-[50px] mt-[90px] w-[75vw] ml-[12.5vw] ${headerColor} flex items-center`}>
				<h1 className={`${pm.className} text-3xl font-bold ml-8`}>
					{headerText}
				</h1>
			</div>
			<section
				className={`${addedClassName} drop-shadow-2xl w-3/4 ml-[12.5vw] mt-[75px] rounded-b-xl fixed top-[65px] h-[80vh] overflow-scroll`}>
				{component}
			</section>
		</div>
	);
}
