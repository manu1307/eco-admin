import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
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
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_GA_KEY}`}></Script>
			<Script id='google-analytics' strategy='afterInteractive'>
				{`
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());
				gtag('config', ${process.env.NEXT_GA_KEY});
				`}
			</Script>
			<RecoilRoot>
				<Component {...pageProps} />
			</RecoilRoot>
		</>
	);
}

export default MyApp;
