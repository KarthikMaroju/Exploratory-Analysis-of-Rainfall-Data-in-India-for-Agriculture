const authMiddleware = require("../middleware/authMiddleware");

router.get("/protected", authMiddleware, async (req, res) => {
    res.json({ message: "This is protected data" });
});
