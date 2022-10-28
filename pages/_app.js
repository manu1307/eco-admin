import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta
					http-equiv='Content-Security-Policy'
					content='upgrade-insecure-requests'
				/>
			</Head>
			<RecoilRoot>
				<Component {...pageProps} />
			</RecoilRoot>
		</>
	);
}

export default MyApp;
