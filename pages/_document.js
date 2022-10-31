import Document from "next/document";
import { ServerStyleSheet } from "styled-components";

import bundleCss from "!raw-loader!../styles/tailwindSSR.css";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          initialProps.styles,
          ///////// 여기서부터 /////////
          <style
            key="custom"
            dangerouslySetInnerHTML={{
              __html: bundleCss,
            }}
          />,
          ///////// 여기까지 추가 ////////
          sheet.getStyleElement(),
        ],
      };
    } finally {
      sheet.seal();
    }
  }
}
