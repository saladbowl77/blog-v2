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

        // Minano CMS SDK doesn't support query filters yet, so we fetch all and filter client-side
        const { items } = await client.getList({
            endpoint: process.env.MINANO_CONTENT_TYPE,
            queries: {
                limit: 100,
                order: "-publishedAt"
            }
        });

        let newsContents = {
            "tagName" : params.tag,
            "contents" : []
        };

        for (let i=0; i<items.length; i++){
            const item = items[i];
            // Filter by tag client-side and check for closed_page
            if (item.data.tags?.includes(params.tag) && !item.data.closed_page) {
                newsContents["contents"].push({
                    "blogUrl": item.slug,
                    "blogTitle": item.data.blogTitle,
                    "blogTag": item.data.tags?.[0],
                    "uploadDate": dateTime(item.data.uploadDate || item.publishedAt).slice(0,-9),
                })
            }
        }

        return newsContents;
    }

    return getdata();
}