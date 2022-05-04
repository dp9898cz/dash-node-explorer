export const getPeersDataset = (peers) => {
    const unique = [...new Set(peers.map((peer) => peer.subver))];
    const data = {
        datasets: [
            {
                data: unique.map((item) => peers.filter((peer) => peer.subver === item).length),
                backgroundColor: [
                    "blue",
                    "red",
                    "green",
                    "yellow",
                    "orange",
                    "purple",
                    "deeppink",
                    "cyan",
                    "white",
                    "aqua",
                    "cadetblue",
                    "chocolate",
                    "",
                ],
            },
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: unique.map((item) => item.slice(1, -1)),
    };
    return data;
};
