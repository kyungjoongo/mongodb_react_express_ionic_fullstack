import ytpl from 'ytpl'

async function test001(){
    const playlist = await ytpl('PLPffvF30sR1-80EIC1HXyzY9RF5l_xlQm', { pages: 1 });
    console.log("temp-===>",playlist.items);
    const r2 =await ytpl.continueReq(playlist.continuation);
    console.log("temp-===>",r2.items);
    const r3 =await ytpl.continueReq(playlist.continuation);
    console.log("temp-===>",r3.items);
}

test001();



