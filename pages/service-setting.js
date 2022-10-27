import Layout from "../components/UI/Layout/Layout";

import DashBoardMain from "../components/DashBoard/DashBoard-main";

export default function DashBoard() {
	return (
		<Layout
			sideItems={[
				"텀블러 할인 설정",
				"단골 스탬프 설정",
				"단골 리스트",
				"메뉴 설정",
				"마감타임 설정",
				"알림 설정",
				"댓글신고",
			]}></Layout>
	);
}
