const http = require("http")
const fs = require('fs')
const os = require('os')

const host = '127.0.0.1'
const port = 5000

const server = http.createServer((req, res) => {
    const urlPath = req.url
    
    if(urlPath === '/'){
        
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        fs.createReadStream('pages/index.html').pipe(res)
    }
    else if(urlPath === '/about'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        fs.createReadStream('pages/about.html').pipe(res)
    }
    else if(urlPath === '/sys'){
        
        const osInformation = JSON.stringify({
            hostname: os.hostname(),
            platform: os.platform(),
            architecture: os.arch(),
            numberOfCPUS: os.cpus().length,
            networkInterfaces: os.networkInterfaces(),
            uptime: os.uptime()
        })
        fs.appendFile('osinfo.json', osInformation, function (err, file){
            if(err) throw err;
            res.statusCode = 201
            res.setHeader('Content-Type', 'text/plain')
            res.end("Your OS info has been saved successfully!")
        })
    }
    else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        fs.createReadStream('pages/404.html').pipe(res)
    }
})

server.listen(port, host, () => {
    console.log(`server listening at ${host}:${port}`)
})