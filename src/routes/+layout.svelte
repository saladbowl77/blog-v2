<script>
    import Header from '$lib/assets/Header.svelte';
    import Footer from '$lib/assets/Footer.svelte';
    import "$lib/styles/reset_style.css";
</script>

<Header />

<slot />

<Footer />