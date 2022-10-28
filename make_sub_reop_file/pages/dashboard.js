import Layout from "../components/UI/Layout/Layout";

import DashBoardMain from "../components/DashBoard/DashBoard-main";

export default function DashBoard() {
	return (
		<Layout
			sideItems={[
				{ text: "통계", url: "/dashboard" },
				{ text: "QR", url: "/dashboard-qrcode" },
			]}>
			<DashBoardMain />
		</Layout>
	);
}
