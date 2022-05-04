import { AppShell, Box, Button, Header, Navbar, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Home({ start, _now }) {
    const [startDate, setStartDate] = useState(new Date(start));
    const [now, setNow] = useState(new Date(_now));

    useEffect(() => {
        const fetchApi = async () => {
            const resp = await fetch("/api/peers");
            const peers_json = await resp.json();
            console.log(peers_json?.count);
            console.log(peers_json?.peers[1]);
        };

        const dateUpdate = async () => setNow(new Date());

        const int = setInterval(() => {
            fetchApi();
        }, 1000 * 10);

        const int2 = setInterval(() => {
            dateUpdate();
        }, 1000 * 1);

        return () => {
            clearInterval(int);
            clearInterval(int2);
        };
    }, []);

    return (
        <AppShell
            padding="md"
            navbar={
                <Navbar width={{ base: 300 }} p="xs" style={{ display: "flex" }}>
                    {/* Navbar content */}
                    <Text mt={"md"}>{`Started: ${startDate.toLocaleString()}`}</Text>
                    <Text>{`Running for ${Math.floor((now.getTime() - startDate.getTime()) / 1000)} seconds.`}</Text>
                </Navbar>
            }
            header={
                <Header height={"60px"} p="xs" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {/* Header content */}
                    <Text style={{ fontSize: "28px", fontWeight: "bold" }} ml={"md"}>
                        Dash node explorer
                    </Text>
                    <Button variant={"outline"} color="orange" mr={"xl"}>
                        Refresh
                    </Button>
                </Header>
            }
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            <Box
                style={{
                    display: "flex",
                    height: "calc(100vh - 60px - 32px)",
                    justifyContent: "center",
                }}
            >
                hello
            </Box>
        </AppShell>
    );
}

export async function getServerSideProps({ req, res }) {
    const message = await fetch("http://localhost:3000/api/start");
    const json = await message.json();
    return {
        props: { ...json, _now: new Date().toISOString() },
    };
}
