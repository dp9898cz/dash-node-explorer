import { AppShell, Box, Button, Header, Navbar, Text, Switch, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import "chart.js/auto";
import { Chart, Doughnut } from "react-chartjs-2";
import { getPeersDataset } from "../data/peer";
import MUIDataTable from "mui-datatables";

export default function Home({ start, _now }) {
    const [startDate, setStartDate] = useState(new Date(start));
    const [now, setNow] = useState(new Date(_now));
    const [autoUpdate, setAutoUpdate] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [peers, setPeers] = useState([]);
    const [peersDataset, setPeersDataset] = useState([]);
    const [addrs, setAddrs] = useState([]);
    const [done, setDone] = useState([]);
    const [view, setView] = useState("peers");

    const fetchApi = async (triggered) => {
        if (!autoUpdate && !triggered) return;
        setUpdating(true);

        const resp = await fetch("/api/peers");
        const peers_json = await resp.json();
        setPeers(peers_json?.peers);
        setPeersDataset(getPeersDataset(peers_json?.peers));

        const resp_a = await fetch("/api/addresses");
        const addrs_json = await resp_a.json();
        setAddrs(addrs_json?.addrs);

        const resp_d = await fetch("/api/done");
        const addrs_done = await resp_d.json();
        setDone(addrs_done?.addrs);

        setUpdating(false);
    };

    useEffect(() => {
        const dateUpdate = async () => setNow(new Date());

        const int = setInterval(() => {
            fetchApi(false);
        }, 1000 * 10);

        const int2 = setInterval(() => {
            dateUpdate();
        }, 1000 * 1);

        return () => {
            clearInterval(int);
            clearInterval(int2);
        };
    }, [autoUpdate]);

    return (
        <AppShell
            padding="md"
            navbar={
                <Navbar p="xs" style={{ display: "flex", width: "300px", minWidth: "300px" }}>
                    {/* Navbar content */}
                    <Text mt={"md"}>{`Started: ${startDate.toLocaleString()}`}</Text>
                    <Text>{`Tool running ${Math.floor((now.getTime() - startDate.getTime()) / 1000 / 60)} minutes.`}</Text>
                    {updating ? <Text color={"orange"}>Updating...</Text> : <Text style={{ color: "transparent" }}>A</Text>}
                    <Select
                        value={view}
                        mt={"xl"}
                        labelProps={{
                            style: { color: "orange" },
                        }}
                        onChange={setView}
                        label={"Select view"}
                        color={"orange"}
                        data={[
                            { value: "peers", label: "Node view" },
                            { value: "table", label: "Table of nodes" },
                        ]}
                    ></Select>
                </Navbar>
            }
            header={
                <Header height={"60px"} p="xs" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: "28px", fontWeight: "bold" }}>Dash node explorer</Text>
                    <Box style={{ display: "flex" }}>
                        <Switch
                            mr={"xl"}
                            color={"orange"}
                            label={"Auto update every 10 seconds."}
                            checked={autoUpdate}
                            onChange={(event) => setAutoUpdate(event.currentTarget.checked)}
                        />
                        <Button variant={"outline"} color="orange" mr={"xl"} onClick={() => fetchApi(true)}>
                            Manually update
                        </Button>
                    </Box>
                </Header>
            }
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
            style={{
                maxWidth: "100vw",
                maxHeight: "100vh",
                overflow: "hidden",
            }}
        >
            <Box
                style={{
                    display: "flex",
                    height: "calc(100vh - 60px - 32px)",
                    alignItems: "center",
                    flexDirection: "column",
                    overflowY: "auto",
                    overflowX: "hidden",
                }}
            >
                {view === "peers" && (
                    <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Box style={{ display: "flex", width: "310px", justifyContent: "space-between" }}>
                            <Text size="lg">Total nodes discovered:</Text>
                            <Text size="lg" ml={"md"} color={"orange"}>
                                {peers.length}
                            </Text>
                        </Box>
                        <Box style={{ display: "flex", width: "310px", justifyContent: "space-between" }}>
                            <Text size="lg">Total masternodes discovered:</Text>
                            <Text size="lg" ml={"md"} color={"orange"}>
                                {peers.filter((item) => item.masternode === true).length}
                            </Text>
                        </Box>
                        <Box style={{ display: "flex", width: "310px", justifyContent: "space-between" }}>
                            <Text size="lg">Total adresses checked:</Text>
                            <Text size="lg" ml={"md"} color={"green"}>
                                {done.length}
                            </Text>
                        </Box>
                        <Box style={{ display: "flex", width: "310px", justifyContent: "space-between" }}>
                            <Text size="lg">Addresses to go:</Text>
                            <Text size="lg" ml={"md"} color={"indigo"}>
                                {addrs.length}
                            </Text>
                        </Box>
                        <Text size="xl" mt={"lg"}>
                            Number of peers split by user agent:
                        </Text>

                        <Box mt={"lg"} width={"600px"} height={"600px"} style={{ position: "relative" }}>
                            {peersDataset?.datasets?.length >= 0 && (
                                <Doughnut
                                    data={peersDataset}
                                    height={600}
                                    width={600}
                                    options={{ responsive: true, aspectRatio: false, borderColor: "grey", color: "white" }}
                                />
                            )}
                        </Box>
                    </Box>
                )}
                {view === "table" && (
                    <Box style={{ display: "flex", width: "calc(100vw - 350px)", height: "800px", justifyContent: "center" }}>
                        <MUIDataTable
                            title={"Node list"}
                            data={peers}
                            columns={[
                                {
                                    label: "IP address",
                                    name: "addr",
                                    options: {
                                        filter: false,
                                        sort: false,
                                        customBodyRender: (item) => item.slice(0, -5),
                                    },
                                },
                                {
                                    label: "Port",
                                    name: "addr",
                                    options: {
                                        filter: false,
                                        sort: false,
                                        customBodyRender: (item) => item.slice(-4),
                                    },
                                },
                                {
                                    label: "User agent",
                                    name: "subver",
                                    options: {
                                        filter: true,
                                        sort: true,
                                        customBodyRender: (item) => item.slice(1, -1),
                                    },
                                },
                                {
                                    label: "Protocol version",
                                    name: "version",
                                    options: {
                                        filter: true,
                                        sort: true,
                                    },
                                },
                                {
                                    label: "Connection time",
                                    name: "conntime",
                                    options: {
                                        filter: false,
                                        sort: true,
                                        customBodyRender: (item) => {
                                            const date = new Date(0);
                                            date.setUTCSeconds(parseInt(item));
                                            return date.toLocaleString();
                                        },
                                    },
                                },
                                {
                                    label: "Ping time (ms)",
                                    name: "pingtime",
                                    options: {
                                        filter: false,
                                        sort: true,
                                        customBodyRender: (item) => Math.floor(parseFloat(item) * 1000),
                                    },
                                },
                                {
                                    label: "Masternode",
                                    name: "masternode",
                                    options: {
                                        filter: true,
                                        sort: false,
                                        customBodyRender: (value) => (value ? "yes" : "no"),
                                    },
                                },
                            ]}
                            options={{
                                print: "false",
                            }}
                        />
                    </Box>
                )}
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
