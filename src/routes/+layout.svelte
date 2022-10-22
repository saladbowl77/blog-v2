<script>
    import Header from '$lib/assets/Header.svelte';
    import Footer from '$lib/assets/Footer.svelte';
    import Analytics from '$lib/assets/Analytics.svelte';
    import "$lib/styles/reset_style.css";
</script>

<Analytics />

<Header />

<slot />

<Footer />