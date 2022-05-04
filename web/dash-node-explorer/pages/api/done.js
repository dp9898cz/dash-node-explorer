// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    const resp = await fetch("http://localhost:5000/getDone");
    const json = await resp.json();
    res.status(200).json(json);
}
