import { createClient } from 'newt-client-js';
import dotenv from 'dotenv';

dotenv.config();

export function load({ params }) {
    function dateTime(dt){
        const resDt = new Date(dt);
        return `${resDt.getFullYear()}/${resDt.getMonth() + 1}/${resDt.getDate()} ${resDt.getHours()}:${("0" + resDt.getMinutes()).slice(0,2)}:${("0" + resDt.getSeconds()).slice(0,2)}`
    }

    async function getdata() {    
        const client = createClient({
            spaceUid: process.env['NEWT_SPACE_ID'],
            token: process.env['NEWT_TOKEN'],
            apiType: 'cdn'
        });
    
        const res = await client.getContents({
            appUid: process.env['NEWT_APP_ID'],
            modelUid: 'blog-post',
            query: {
                'tags': params.tag
            }
        });

        let newsContents = {
            "tagName" : params.tag,
            "contents" : []
        };

        for (let i=0; i<res.total; i++){
            if (!res.items[i].closed_page && new Date(res.items[i].uploadDate) < new Date()){
                newsContents["contents"].push({
                    "blogUrl": res.items[i].blogUrl,
                    "blogTitle": res.items[i].blogTitle,
                    "blogTag": res.items[i].tags[0],
                    "uploadDate": dateTime(res.items[i].uploadDate).slice(0,-9),
                })
            }
        }

        return newsContents;
    }

    return getdata();
}