import Layout from "../components/UI/Layout/Layout";

export default function DashBoard() {
	return (
		<Layout
			sideItems={[
				{ text: "텀블러 할인 설정", url: "" },
				{ text: "단골 스탬프 설정", url: "" },
				{ text: "단골 리스트", url: "" },
				{ text: "메뉴 설정", url: "/service-setting-menu" },
				{ text: "마감타임 설정", url: "" },
				{ text: "알림 설정", url: "" },
				{ text: "댓글신고", url: "" },
			]}></Layout>
	);
}
