import Layout from "../../components/UI/Layout/Layout";

export default function MarketSettingTag() {
	return (
		<Layout
			sideItems={[
				{ text: "매장 설정", url: "/market-setting" },
				{ text: "태그 설정", url: "/market-setting/tag" },
			]}>
			<div>태그 등록</div>
			<div>태그 조회</div>
			<div>태그 수정</div>
		</Layout>
	);
}
