const router = require('express').Router()
const path = require("path");
const rootDir = process.cwd();

// Make a create user API
router.get("/public/uploads/:fileName", (req, res) => {
    const filename = req.params.fileName;
    const filePath = path.join(rootDir, 'public/uploads', filename);
    // Send the file as a response
    res.sendFile(filePath, (err) => {
      if (err) {
        // If an error occurs while sending the file, handle it here
        console.error(err);
        res.status(err.status).end();
      } else {
        console.log(`File ${filename} sent successfully.`);
      }
    });
  });

module.exports = router