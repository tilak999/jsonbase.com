const helper = require('./helper')
const jsonbase = require('./index')

async function helperTest(){
    const hash =  helper.randomHash()

    console.log('=> Writing to bucket:', hash)
    const path = hash + '/test'
    const resp = await helper.put(path, { message: hash })
    if(resp.status == 'success') {
        console.log('=> Reading from bucket:', hash)
        const resp = await helper.get(path)
        if(resp.data.message == hash){
            console.log('=> Test complete:', 'OK')
        } else {
            console.error('=> Reading from bucket:', 'Failed')
        }
    } else {
        console.error('=> Writing to bucket:', resp)
    }
}

async function indexTest(){
    const hash =  helper.randomHash()
    const store = jsonbase(hash)
    
    console.log('=> Bucket:', hash)
    
    let resp = await store.write('key', { message: 'sample' })
    if(resp.status == 'success' && resp.data.message == 'sample'){
        console.log('=> Write complete:', 'OK')
    } else {
        console.log('=> Write complete:', 'Failed')
    }

    resp = await store.read('key')
    if(resp.status == 'success' && resp.data.message == 'sample'){
        console.log('=> Read complete:', 'OK')
    } else {
        console.log('=> Read complete:', 'Failed')
    }
    
    resp = await store.delete('key')
    if(resp.status == 'success'){
        console.log('=> Delete complete:', 'OK')
    } else {
        console.log('=> Delete complete:', 'Failed')
    }

}

(async()=>{
    console.log('=> Testing helper.js')
    await helperTest()
    console.log()
    console.log('=> Testing index.js')
    await indexTest().catch(console.error)
})()
