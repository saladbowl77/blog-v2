<script>
    import icon from "$lib/img/icon.png"
</script>

<section>
    <div id="prof">
        <div id="profWrap">
            <img src="{ icon }" alt="">
            <p id="name">さらだぼぉる</p>
            <p id="about">
                <span>[非公式]滋賀県コロナまとめサイトをはじめとした滋賀情報ネットプロジェクトといった地域情報を発信する取り組みをしている。</span>
                <span>2022年10月現在高校三年生で滋賀在住。</span>
                <span>PythonやSvelteKitが最近のお気に入り。</span>
            </p>
            <div id="snsLinks">
                <p> 
                    <a href="https://saladbowl.work" target="_blank" rel="noopener noreferrer">ポートフォリオ</a>
                    <a href="https://twitter.com/saladbowl_dev" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://www.youtube.com/channel/UCtqEHNBdT4JHNAk1n47ObIg" target="_blank" rel="noopener noreferrer">YouTube</a>
                </p>
            </div>
        </div>
    </div>
</section>

<style>
    div#prof {
        width: calc(100% - 8px - 10px);
        border: solid 4px #b75489;
        border-radius: 5px;
        padding: 10px 0;
        margin: 0 auto;
        max-width: 550px;
    }
    div#profWrap {
        width: 90%;
        max-width: 500px;
        display: block;
        margin: 0 auto;
    }
    div#profWrap img {
        width: 100%;
        max-width: 200px;
        margin: 0 auto;
        display: block;
    }
    p#name {
        font-size: 18px;
        font-weight:bold;
        text-align: center;
        padding: 5px;
    }

    div#snsLinks a {
        color: #2b931a;
        display: inline-block;
    }
</style>