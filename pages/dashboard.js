import Layout from "../components/UI/Layout/Layout";

import DashBoardMain from "../components/DashBoard/DashBoard-main";

export default function DashBoard() {
	return (
		<Layout sideItems={["통계"]}>
			<DashBoardMain />
		</Layout>
	);
}
