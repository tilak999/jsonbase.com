const https = require("https");
const path = require("path")
const config = require("./config")

function get(urlPath){
    return new Promise((resolve, reject)=>{
        const url = path.join(config.url, urlPath)
        https.get(url, res => {
            let body = "";
            res.setEncoding("utf8");
            res.on("data", data => { body += data });
            res.on("end", () => { 
                if (res.statusCode != 200) reject({
                    status: 'failed',
                    reason: 'Service responded with status:' + res.statusCode
                }) 
                else resolve({
                    status: 'success',
                    data: JSON.parse(body)
                })
            })
        }).end()
    })
}

function put(urlPath, payload){
    return new Promise((resolve, reject)=>{
        
        const options = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            }
        }

        const url = path.join(config.url, urlPath)
        const req = https.request(url, options, (res) => {
            let body = ""
            res.setEncoding('utf8')
            res.on('data', (data) => { body += data})
            res.on("end", () => { 
                if (res.statusCode != 200) reject({
                    status: 'failed',
                    reason: 'Service responded with status:' + res.statusCode
                }) 
                else resolve({
                    status: 'success',
                    data: JSON.parse(body)
                })
            })
        })
        req.write(JSON.stringify(payload))
        req.end()
    })
}

function randomHash(length){
    const crypto = require("crypto");
    return crypto.randomBytes(length || 20).toString('hex');
}

module.exports = {get, put, randomHash}
