<script>
    import { page } from '$app/stores';
    const status = $page.status;
</script>

<main>
    <h1>{$page.status}: {$page.error.message}</h1>
    {#if status == 404}
        <p>ページが見つかりませんでした。</p>
        <p>今一度URLを確認してください。</p>
        <a href="/">ブログトップへ戻る</a>
        <a href="https://twitter.com/saladbowl_dev" target="_blank" rel="noopener noreferrer">さらだぼぉるTwitter</a>
    {:else if status == 500}
    500
    {/if}
</main>

<style>
    main a{
        color: #2b931a;
    }
</style>