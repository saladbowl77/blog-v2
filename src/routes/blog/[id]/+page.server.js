import { createClient } from 'newt-client-js';
import dotenv from 'dotenv';
import { error } from '@sveltejs/kit';

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
                'blogUrl': params.id
            }
        });
        if (res.total == 0){
            throw error(404, 'not found');
        } else {
            return {
                "status": 200,
                "blogUrl": res.items[0].blogUrl,
                "blogTitle": res.items[0].blogTitle,
                "tags": res.items[0].tags,
                "closed": res.items[0].closed_page || new Date(res.items[0].uploadDate) > new Date(),
                "older" : new Date() - new Date(res.items[0].uploadDate) >= 1000 * 60 * 60 * 24 * 365 * 1,
                "date": {
                    "uploadDate": dateTime(res.items[0].uploadDate),
                    "lastUpdate": dateTime(res.items[0]._sys.updatedAt),
                },
                "description": res.items[0].description,
                "content": res.items[0].content
            };
        }
    }

    return getdata();
}