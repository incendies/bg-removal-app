export default function handler(req, res) {
    // Example logging logic
    console.log(req.body);
    res.status(200).json({ message: "Log received" });
}
