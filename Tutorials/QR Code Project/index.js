
import inquirer from "inquirer"
import qr from "qr-image"
import fs from "fs"

const url = inquirer.prompt([
    {
        message: "Type in your URL: ",
        name: "URL",
    },
]).then((answer) => {
    const url = answer.URL;
    var qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('url.png'));
    fs.writeFile('userInput.txt', url, (err) => {
        if (err) throw err;
        console.log('File created successfully')
    })
}).catch((error) => {
    if (error) throw error;
})




