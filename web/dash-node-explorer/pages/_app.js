import Head from "next/head";
import { Box, MantineProvider } from "@mantine/core";

export default function App(props) {
    const { Component, pageProps } = props;

    return (
        <Box style={{ overflow: "hidden" }}>
            <Head>
                <title>Page title</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    /** Put your mantine theme override here */
                    colorScheme: "dark",
                }}
            >
                <Component {...pageProps} />
            </MantineProvider>
        </Box>
    );
}
