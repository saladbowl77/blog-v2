import { createClient, MinanoCmsApiError } from 'minano-cms-sdk';
import dotenv from 'dotenv';
import { error } from '@sveltejs/kit';
import { markdownToHtml } from '$lib/markdown.js';

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

        try {
            const entry = await client.getListDetail({
                endpoint: process.env.MINANO_CONTENT_TYPE,
                slug: params.id
            });

            const uploadDate = new Date(entry.data.uploadDate || entry.publishedAt);
            const lastUpdate = new Date(entry.data.lastUpdate || entry.publishedAt);

            return {
                "status": 200,
                "blogUrl": entry.data.blogUrl || entry.slug,
                "blogTitle": entry.data.blogTitle,
                "tags": entry.data.tags,
                "closed": entry.data.closed_page || false,
                "older" : new Date() - uploadDate >= 1000 * 60 * 60 * 24 * 365 * 1,
                "date": {
                    "uploadDate": dateTime(uploadDate),
                    "lastUpdate": dateTime(lastUpdate),
                },
                "description": entry.data.description,
                "content": markdownToHtml(entry.data.content)
            };
        } catch (e) {
            if (e instanceof MinanoCmsApiError && e.code === 'NOT_FOUND') {
                throw error(404, 'not found');
            }
            throw e;
        }
    }

    return getdata();
}