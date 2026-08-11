import { createClient } from 'minano-cms-sdk';
import dotenv from 'dotenv';

dotenv.config();

export function load({ params }) {
    function dateTime(dt){
        const resDt = new Date(dt);
        return `${resDt.getFullYear()}/${resDt.getMonth() + 1}/${resDt.getDate()} ${resDt.getHours()}:${("0" + resDt.getMinutes()).slice(0,2)}:${("0" + resDt.getSeconds()).slice(0,2)}`
    }

    async function getdata() {
        const client = createClient({
            serviceDomain: process.env.MINANO_SERVICE_DOMAIN,
            apiKey: process.env.MINANO_API_KEY
        });

        const { items, total } = await client.getList({
            endpoint: process.env.MINANO_CONTENT_TYPE,
            queries: {
                limit: 100,
                order: "-publishedAt"
            }
        });

        let newsContents = {
            "page" : 0,
            "all" : 1,
            "contents" : []
        };

        for (let i=0; i<items.length; i++){
            const item = items[i];
            // Minano CMS API automatically filters by publishedAt, so no need to check closed_page or uploadDate
            newsContents["contents"].push({
                "blogUrl": item.slug,
                "blogTitle": item.data.blogTitle,
                "blogTag": item.data.tags?.[0],
                "uploadDate": dateTime(item.data.uploadDate || item.publishedAt).slice(0,-9),
            })
        }

        return newsContents;
    }

    return getdata();
}