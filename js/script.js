let userData = JSON.parse(localStorage.getItem("user")); const socket = enableNotifications(), fragment = new URLSearchParams(window.location.hash.slice(1)), [access_token, token_type, expires_in, error] = [fragment.get("access_token"), fragment.get("token_type"), fragment.get("expires_in"), fragment.get("error")]; async function blacklisted(e, t) { let s = e || socket; if (s && (t || userData?.id)) { let a = await s.timeout(1500).emitWithAck("blacklist", t || userData?.id).catch(() => void 0); if (a) return location.href = "https://saphire.one/blacklist" } } function base() { window.location.href.includes("error") && (window.location.href = "https://saphire.one/unauthorized"); let e = document.querySelector(".menu-icon"), t = document.querySelector(".navbar"); userData && !userData?.loggedAt && home(), userData && userData.loggedAt && userData.loggedAt + 1e3 * Number(userData.expiresIn || "0") <= Date.now() && (notify("message", "Sess\xe3o Expirada", "J\xe1 se passou muito tempo, voc\xea precisa logar novamente, ok?"), logout()), e?.addEventListener("click", () => (t.classList.toggle("open-menu"), e.classList.contains("bx-x") ? e.classList.replace("bx-x", "bx-menu-alt-right") : e.classList.replace("bx-menu-alt-right", "bx-x"))); let s = document.querySelector(".bg"), a = document.querySelector("nav"); function i() { scrollY > 5 ? (s.classList.add("active"), a.classList.add("small")) : (s.classList.remove("active"), a.classList.remove("small")) } return i(), window.addEventListener("scroll", () => i()), storage() } function logout(e) { localStorage.clear(); let t = e || location.pathname?.replace(/\//g, "") || "home";["home", "servers", "transactions", "commands", "profile", "status", "bug"].includes(t) || (t = "home"); let s = document.getElementById("button"); s.classList.remove("profile"), s.classList.add("nav-button"), s.innerHTML = `<a href="https://discord.com/api/oauth2/authorize?client_id=912509487984812043&redirect_uri=https%3A%2F%2Fsaphire.one%2F${t}&response_type=token&scope=guilds%20email%20identify">Entrar</a>`, document.querySelector(".sub-profile-wrapper").classList.remove("active"), document.getElementById("dropName").innerHTML = "none", document.getElementById("dropAvatar").src = "assets/images/user.png" } function home() { return localStorage.clear(), location.href = "https://saphire.one/" } function enableNotifications() { let e = new io; return blacklisted(e), e.on("connect", () => console.log("[WS] Conectado.")), e.on("disconnect", () => console.log("[WS] Desconectado.")), userData?.id && e.on(`notification_${userData.id}`, ({ message: e, title: t }) => notify("message", t || "Notifica\xe7\xe3o", e)), e } function storage(e) { return error ? window.location.href = "https://saphire.one/unauthorized" : userData && e ? (setHeader(), e(userData)) : !userData && access_token && token_type ? fetch("https://discord.com/api/users/@me", { method: "GET", headers: { authorization: `${token_type} ${access_token}` } }).then(e => e.json()).then(t => (blacklisted(null, t.id), t.tokenType = token_type, t.accessToken = access_token, t.expiresIn = expires_in, t.loggedAt = Date.now(), localStorage.setItem("userData", JSON.stringify(t)), userData = t, save({ id: t.id, Tokens: { tokenType: t.tokenType, accessToken: t.accessToken, expiresIn: t.expiresIn } }), next(e))).catch(console.error) : next(e) } async function save(e) { return await fetch("https://api.saphire.one/save_login", { method: "POST", headers: { "Content-Type": "application/json" }, body: e }).then(() => console.log("Login complete successfully")).catch(() => console.log("fail to save data")) } function next(e) { if ((access_token || token_type || expires_in) && history.pushState(null, null, location.pathname || "/"), document.title = "Saphire Moon", !userData) { setHeader(), e && e(); return } let t = document.querySelector(".sub-profile-wrapper"); document.addEventListener("click", function (e) { let s = document.querySelector(".profile"); s && !s.contains(e.target) && t.classList.remove("active") }), document.addEventListener("scroll", () => t.classList.remove("active")), setHeader(), setProfileHeader(userData), e && e(userData) } function numberCount(e, t, s, a, i) { if (!e || 0 == t && 0 == s || isNaN(Number(t)) || isNaN(Number(s))) return; let n = t < s ? Math.min : Math.max, r = s - t, o = Math.min(100, Math.abs(r)) || 1, c = r / (o - 1 || 1); a && !e.classList.contains(a) && e.classList.add(a), i && e.classList.contains(i) && e.classList.remove(i); let l = 1, d = setInterval(() => { e.innerHTML = currency(parseInt(n(l * c, r) + t)), ++l >= o && clearInterval(d) }); return s } function currency(e) { let t = `${Intl.NumberFormat("pt-BR", { currency: "BRL", style: "currency" }).format(parseInt(e))}`; return t.substring(0, t.length - 3).replace(/R\$/g, "") } function setProfileHeader(e) {
    if (!e) return; let t = document.getElementById("button"), s = e?.avatar ? `<img src="https://cdn.discordapp.com/avatars/${e.id}/${e.avatar}.${e?.avatar?.includes("a_") ? "gif" : "png"}" alt="" id="avatar">` : '<img src="assets/images/user.png" alt="" id="avatar">'; t.classList.remove("nav-button"), t.classList.add("profile"), t.innerHTML = `
                ${s}
                <div class="details">
                    <span class="name" id="username">${e.global_name || e.username}</span>
                </div>
                <i class="bx bx-chevron-down"></i>
          `, document.getElementById("header-profile").innerHTML = `
          <hr>
          <div class="content">
              <span class="name">Saphire</span>
              <a href="https://saphire.one/chat" class="content-link">Bate Papo</a>
              <a href="#" class="content-link">Dados</a>
              <a href="https://saphire.one/linked-roles" class="content-link">Atualizar cargos vinculados</a>
          </div>
          <hr>
          <div class="content">
              <span class="name">Painel de controle</span>
              <a href="https://saphire.one/daily" class="content-link">Pr\xeamio di\xe1rio</a>
              <a href="https://saphire.one/servers" class="content-link">Servidores</a>
              <a href="https://saphire.one/perfil" class="content-link">Perfil</a>
              <a href="https://saphire.one/transactions" class="content-link">Transa\xe7\xf5es</a>
          </div>
          <hr>
          <div class="content">
              <a href="https://discord.gg/2EMVCbJxuC" class="content-link">Servidor de suporte</a>
              <a href="#" class="content-link">Registro de altera\xe7\xf5es</a>
              <a href="https://saphire.one/bug" class="content-link">Reportar bug</a>
              <span onclick="home()" class="content-link">Sair</span>
          </div>
      `, t.onclick = () => { document.getElementById("button").classList.contains("profile") && document.querySelector(".sub-profile-wrapper").classList.toggle("active") }
} async function setHeader() {
    let e = document.getElementById("button"); if (userData?.id || access_token || token_type || expires_in ? setProfileHeader(userData) : (e.classList.add("nav-button"), localStorage.setItem("redirect", location.href), e.innerHTML = '<a href="https://discord.com/api/oauth2/authorize?client_id=912509487984812043&redirect_uri=https%3A%2F%2Fsaphire.one%2Fredirect&response_type=token&scope=guilds%20email%20identify">Entrar</a>'), !document.getElementById("header-navbar") || !document.getElementById("footer")) return; let t = ['<li><a href="https://saphire.one/" class="nav-link">Home</a></li>', '<li><a href="https://saphire.one/commands" class="nav-link">Comandos</a></li>', '<li><a href="https://saphire.one/staff" class="nav-link">Equipe</a></li>', '<li><a href="https://saphire.one/support" class="nav-link">Suporte</a></li>', '<li><a href="https://saphire.one/status" class="nav-link">Status</a></li>']; document.getElementById("header-navbar").innerHTML = t.join(""), document.getElementById("footer").innerHTML = `
        <div class="socials">
           <abbr title="Desenvolvedores"><a href="https://saphire.one/staff"><i class="bx bx-cog"></i></a></abbr>
           <abbr title="GitHub"><a href="https://github.com/SaphireBot"><i class="bx bxl-github"></i></a></abbr>
           <abbr title="Discord"><a href="https://discord.gg/2EMVCbJxuC"><i class="bx bxl-discord-alt"></i></a></abbr>
           <abbr title="Termos de uso"><a href="https://saphire.one/termos"><i class="bx bxs-spreadsheet"></i></a></abbr>
           <abbr title="Parceiros"><a href="https://saphire.one/partners"><i class='bx bx-group'></i></a></abbr>
        </div>
        <p class="copyright">\xa9 Todos os direitos reservados, Saphire Moon - 2023</p>
        <p>Algumas partes do site n\xe3o est\xe3o completas</p>
    `, await socket.timeout(15e3)?.emitWithAck("isAdmin", userData?.id).then(e => !0 === e ? t.push('<li><a href="https://saphire.one/admin" class="nav-link">Administrativo</a></li>') : "").catch(() => null), document.getElementById("header-navbar").innerHTML = t.join("")
} function notify(e, t, s) { let a = document.getElementById("wrapper"); if (!a) { let i = document.createElement("div"); i.classList.add("wrapper"), i.id = "wrapper", i.style.display = "none", a = document.body.appendChild(i) } return a ? "block" == a?.style.display ? (a?.classList.add("hide"), setTimeout(() => show(a, e, t, s), 600)) : show(a, e, t, s) : console.log("Notification Wrapper Not Found") } function show(e, t, s, a) {
    e.style.display = "block", e.innerHTML = `
    <div class="toast${({ success: " success", fail: " error", message: " message" })[t] || " message"}">
        <div class="content">${({ success: '<i class="bx bx-check icon"></i>', fail: '<i class="bx bx-error error icon"></i>', message: '<i class="bx bxs-message-dots message icon"></i>' })[t] || '<i class="bx bx-error message icon"></i>'}
          <div class="details">
            <span>${s || "T\xedtulo n\xe3o definido"}</span>
            <p>${a || "Texto n\xe3o definido"}</p>
          </div>
        </div>
        <i class="bx bx-x close-icon"></i>
    </div>
    `, document.getElementById("wrapper")?.classList.remove("hide"), document.querySelector(".close-icon")?.addEventListener("click", hideNotification)
} function hideNotification() { document.getElementById("wrapper")?.classList.add("hide"), document.querySelector(".close-icon")?.removeEventListener("click", () => { }) } base();