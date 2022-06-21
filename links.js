const replaceWrongHiperlinks = () => {
    const macroID = 'p_p_id_smilesmembershipclubjoinmacro_WAR_smilesmembershipsportlet_';
    const optinID = 'p_p_id_promotionoptinportlet_WAR_smilesaccountportlet'
    
    const macro = document.getElementById(macroID)
    const KV = document.querySelector('#atomoKV');
    const tituloApoio = KV?.parentElement.querySelector('.atomoTituloLP .row p');

    function startObserver() {
        const settings = {childList:true, subtree:true}

        const observer = new MutationObserver((mutations) => {
            const found = mutations.filter(mutation => mutation.addedNodes[0]?.id?.includes(optinID))
            found.length && fixLink(found[0].addedNodes[0].id)
        })

        observer.observe(document.documentElement, settings)

        function fixLink(portletID) {
            const searchWrongLink = portletID.includes(macroID) ? 'clube' : portletID;

            const links = tituloApoio?.querySelectorAll('a');
            links.forEach(link => {
                if(link.href.includes(searchWrongLink)) {
                    link.setAttribute('href', `#${portletID}`)
                    link.removeAttribute('target')
                }
            })
        }

        macro && fixLink(macroID)
        
        setTimeout(() => observer.disconnect(), 5000);
    }

    startObserver()
}

replaceWrongHiperlinks();
