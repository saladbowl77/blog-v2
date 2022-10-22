<script>
    import { head } from "$lib/site-config.js";
    import Profile from '$lib/assets/Profile.svelte';
    import Ads from './Ads.svelte';

    import './blog_style.css';
    import hljs from 'highlight.js';

    export let data;

    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    if (browser) {
        onMount(() => {
            hljs.highlightAll();
        });
    }
</script>

<svelte:head>
    <title>{ data.blogTitle } | { head.SiteTitleShort }</title>
    <meta property="og:url" content="https://{ head.SiteDomain }/{data.blogUrl}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="{ data.title }" />
    <meta property="og:description" content="{data.description}" />
    <meta property="og:site_name" content="{ head.SiteTitle }" />
    <!--<meta property="og:image" content=" {data.thumbnail.src}" />-->

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/dark.min.css">
    {#if data.older || data.closed}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20,700,1,-25" />
    {/if}
    {#if data.closed }
        <meta name="robots" content="noindex"> 
    {/if}
</svelte:head>

<main>
    <section id="blog_header">
        <h1>{ data.blogTitle }</h1>
        <p>投稿日 : { data.date.uploadDate }</p>
        <p id="tags">
            タグ :
            {#each data.tags as tag}
                <a class="tag" href="/tags/{ tag }">#{ tag }</a>
            {/each}
        </p>
        {#if data.closed}
            <div class="noteBox closed">
                <p class="attention"><span class="material-symbols-rounded">lock</span>この記事は限定公開記事です</p>
                <p>記事一覧やタグ一覧からは閲覧することができません。</p>
            </div>
        {/if}
        {#if data.older}
            <div class="noteBox older">
                <p class="attention"><span class="material-symbols-rounded">warning</span>この記事は作成から一年以上が経過しています</p>
                <p>最新のコードやバージョンに対応していない場合があります。ご了承ください。</p>
            </div>
        {/if}
    </section>
    <section id="content">
        {@html data.content}
        <Ads />
    </section>

    <Profile />
</main>