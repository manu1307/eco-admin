// import { atom, useRecoilState } from "recoil";
// import { Line } from "react-chartjs-2";

// const fontsizeState = atom({
//   key: "fontsizeState",
//   default: 14,
// });

// export const options = {
//   responsive: true,
//   plugins: {
//     title: {
//       display: true,
//       text: "Chart.js Line Chart",
//     },
//   },
// };

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [0, 16, 26, 27, 2, 5, 7],
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//   ],
// };

// const FontButton = () => {
//   const [fontsize, setFontSize] = useRecoilState(fontsizeState);

//   return (
//     <button
//       onClick={() => setFontSize((size) => size + 1)}
//       style={{ fontSize: fontsize }}
//     >
//       click to enlarge
//     </button>
//   );
// };

export default function test() {
	return (
		<>
			<div>test</div>
		</>
	);
}
