import { atom, useRecoilState } from "recoil";

const fontsizeState = atom({
	key: "fontsizeState",
	default: 14,
});

const FontButton = () => {
	const [fontsize, setFontSize] = useRecoilState(fontsizeState);

	return (
		<button
			onClick={() => setFontSize((size) => size + 1)}
			style={{ fontSize: fontsize }}>
			click to enlarge
		</button>
	);
};

export default function test() {
	return <FontButton />;
}
