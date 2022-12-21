import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";

function MyApp({ Component, pageProps }) {
	// GA 설정 시작
	const router = useRouter();
	useEffect(() => {
		const handleRouteChange = () => {
			gtag.pageview(url);
		};
		router.events.on("routeChangeComplete", handleRouteChange);
		router.events.on("hashChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
			router.events.off("hashChangeComplete", handleRouteChange);
		};
	}, [router.events]);
	return (
		<>
			<Head>
				<meta
					http-equiv='Content-Security-Policy'
					content='upgrade-insecure-requests'
				/>
			</Head>
			{/* Google Analytics 코드 */}
			{/* 추후 env 파일에서 KEY 변경 필요 */}
			<Script
				strategy='afterInteractive'
				src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
			/>
			<Script
				id='gtag-init'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `
       			 window.dataLayer = window.dataLayer || [];
       			 function gtag(){dataLayer.push(arguments);}
       			 gtag('js', new Date());
       			 gtag('config', '${gtag.GA_TRACKING_ID}', {
       			   page_path: window.location.pathname,
       			 });
    			  `,
				}}
			/>
			<RecoilRoot>
				<Component {...pageProps} />
			</RecoilRoot>
		</>
	);
}

export default MyApp;
