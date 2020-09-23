const helper = require('./helper')
const path = require('path')

const jsonbase = (bucket)=>{
    return {
        bucket: bucket,
        generateBucket: ()=>{
            return helper.randomHash()
        },
        setBucket: (bucket)=>{
            this.bucket = bucket
            return this
        },
        write: async(key, value)=>{
            return helper.put(path.join(bucket,key), value)
        },
        read: async(key)=>{
            return helper.get(path.join(bucket,key))
        },
        delete: async(key)=>{
            return helper.put(path.join(bucket,key), {})
        }
    }
}

module.exports = jsonbase