import Drawer from "../../components/UI/Layout/Drawer";
import Layout from "../../components/UI/Layout/Layout";

export default function ClosingSale() {
	return (
		<Layout
			sideItems={[
				// { text: "텀블러 할인 설정", url: "" },
				{ text: "단골 스탬프 설정", url: "/serviceSetting" },
				// { text: "단골 리스트", url: "" },
				{ text: "메뉴 설정", url: "/serviceSetting/menu" },
				{ text: "마감타임 설정", url: "/serviceSetting/closingsale" },
				// { text: "알림 설정", url: "" },
				// { text: "태그 설정", url: "/serviceSetting/tag" },
				loginRole === "admin" && {
					text: "관리자",
					url: "/serviceSetting/admin",
				},
			]}>
			<div>마감타임 세일</div>
		</Layout>
	);
}
