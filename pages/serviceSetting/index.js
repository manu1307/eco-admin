import Drawer from "../../components/UI/Layout/Drawer";
import Layout from "../../components/UI/Layout/Layout";

export default function ServiceSetting() {
	return (
		<Layout
			sideItems={[
				// { text: "텀블러 할인 설정", url: "" },
				// { text: "단골 스탬프 설정", url: "" },
				// { text: "단골 리스트", url: "" },
				{ text: "메뉴 설정", url: "/serviceSetting/menu" },
				{ text: "마감타임 설정", url: "/serviceSetting/closingsale" },
				// { text: "알림 설정", url: "" },
				{ text: "태그 설정", url: "/serviceSetting/tag" },
				// { text: "댓글신고", url: "" },
			]}>
			<div>뭔가가 들어가겠지?</div>
		</Layout>
	);
}
