const fs = require('fs')

const removeFile = async (filePath) => {
    fs.unlink(filePath, function () {
        console.log('File has been successfully deleted.') 
    })
}
module.exports = {
    removeFile
}