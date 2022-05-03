import { AppShell, Box, Button, Header, Navbar, Text } from "@mantine/core";

export default function Home() {
    return (
        <AppShell
            padding="md"
            navbar={
                <Navbar width={{ base: 200 }} p="xs" style={{ display: "flex" }}>
                    {/* Navbar content */}
                    <Text>Started: 12/05/2022</Text>
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
