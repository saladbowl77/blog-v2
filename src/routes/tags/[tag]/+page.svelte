<script>
    import { head } from "$lib/site-config.js";
    import "$lib/styles/blog_list.css";

    export let data;
</script>

<svelte:head>
	<title>「{ data.tagName }」タグの一覧 | { head.SiteTitleShort }</title>
    <meta property="og:url" content="https://{ head.SiteDomain }/{data.blogUrl}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="{ data.title }" />
    <meta property="og:description" content="{data.description}" />
    <meta property="og:site_name" content="{ head.SiteTitle }" />
    <!--<meta property="og:image" content=" {data.thumbnail.src}" />-->
</svelte:head>

<main>
    <h1>「{ data.tagName }」タグの一覧</h1>
    
    <section id="blog_links">
        {#each data.contents as content}
            <a href="/blog/{ content.blogUrl }" class="bl">
                <span class="bl_tag">{ content.blogTag }</span>
                <span class="bl_title">{ content.blogTitle }</span>
                <span class="bl_date">{ content.uploadDate }</span>
            </a>
        {/each}
    </section>
</main>