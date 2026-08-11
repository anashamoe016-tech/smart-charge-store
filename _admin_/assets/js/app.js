
const API = window.API_BASE_URL || "http://localhost:5000/api";

const app = document.getElementById("app");
const pageTitle = document.getElementById("pageTitle");

async function request(path, options = {}) {
    const res = await fetch(API + path, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options
    });

    return await res.json();
}

function fmtMoney(value, currency = "USD") {
    const n = Number(value || 0);
    return `${n.toFixed(2)} ${currency}`;
}

function esc(text) {
    return String(text ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function statusBadge(status) {
    const s = String(status || "").toLowerCase();

    if (["completed", "approved", "online", "active", "success"].includes(s)) {
        return `<span style="padding:6px 10px;border-radius:999px;background:#173b22;color:#7CFF9B;font-size:12px">✔ ${esc(status)}</span>`;
    }

    if (["pending", "processing", "review"].includes(s)) {
        return `<span style="padding:6px 10px;border-radius:999px;background:#3a2b10;color:#ffd166;font-size:12px">⏳ ${esc(status)}</span>`;
    }

    if (["rejected", "failed", "offline", "inactive", "cancelled"].includes(s)) {
        return `<span style="padding:6px 10px;border-radius:999px;background:#3a1212;color:#ff8b8b;font-size:12px">✖ ${esc(status)}</span>`;
    }

    return `<span style="padding:6px 10px;border-radius:999px;background:#232323;color:#fff;font-size:12px">${esc(status || "-")}</span>`;
}

function card(title, value, accent = "#ff3030", subtitle = "") {
    return `
    <div class="card" style="border:1px solid rgba(255,48,48,.15);box-shadow:0 0 0 1px rgba(255,48,48,.03) inset;">
        <h3 style="margin-bottom:10px">${title}</h3>
        <div class="value" style="color:${accent};font-size:38px;font-weight:800;line-height:1">${value}</div>
        ${subtitle ? `<div style="opacity:.75;margin-top:8px">${subtitle}</div>` : ""}
    </div>
    `;
}

function tableCard(title, columns, rowsHtml, extra = "") {
    return `
    <div class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px">
            <h2 style="margin:0">${title}</h2>
            ${extra}
        </div>

        <div style="overflow:auto;border-radius:16px">
            <table width="100%" style="border-collapse:collapse">
                <thead>
                    <tr>
                        ${columns.map(c => `<th style="text-align:right;padding:12px 10px;border-bottom:1px solid #2a2a2a;color:#fff;white-space:nowrap">${c}</th>`).join("")}
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml || `<tr><td colspan="${columns.length}" style="padding:18px;color:#aaa">لا توجد بيانات</td></tr>`}
                </tbody>
            </table>
        </div>
    </div>
    `;
}

function setTitle(text) {
    pageTitle.textContent = text;
}

async function dashboard() {
    setTitle("لوحة التحكم");

    const [dash, ordersRes, depositsRes, providersRes] = await Promise.all([
        request("/admin/dashboard").catch(() => ({ dashboard: {} })),
        request("/admin/orders").catch(() => ({ orders: [] })),
        request("/admin/deposits").catch(() => ({ deposits: [] })),
        request("/providers").catch(() => ({ providers: [] }))
    ]);

    const users = dash.dashboard?.users || 0;
    const orders = dash.dashboard?.orders || 0;
    const deposits = dash.dashboard?.deposits || 0;
    const providers = providersRes.providers?.length || 0;

    const recentOrders = (ordersRes.orders || []).slice(0, 5);
    const recentDeposits = (depositsRes.deposits || []).slice(0, 5);

    app.innerHTML = `
        <div class="cards">
            ${card("👥 المستخدمون", users, "#ff3030", "إجمالي الحسابات")}
            ${card("📦 الطلبات", orders, "#00d084", "كل الطلبات")}
            ${card("💰 الإيداعات", deposits, "#00bfff", "الإيداعات المسجلة")}
            ${card("🌐 المزودون", providers, "#ffd166", "المزودون المتصلون")}
        </div>

        <br>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:18px">
            <div class="card">
                <h2 style="margin-top:0">آخر الطلبات</h2>
                <div style="display:grid;gap:10px">
                    ${
                        recentOrders.length
                            ? recentOrders.map(o => `
                                <div style="background:#171717;border:1px solid #242424;padding:12px 14px;border-radius:14px">
                                    <div style="display:flex;justify-content:space-between;gap:10px;align-items:center">
                                        <div>
                                            <div style="font-weight:700">${esc(o.game?.name || "-")}</div>
                                            <div style="opacity:.7;font-size:13px">${esc(o.playerName || o.playerId || "-")}</div>
                                        </div>
                                        <div style="text-align:left">
                                            <div style="font-weight:700">${fmtMoney(o.amount, o.currency || "USD")}</div>
                                            <div style="margin-top:6px">${statusBadge(o.status)}</div>
                                        </div>
                                    </div>
                                </div>
                            `).join("")
                            : `<div style="opacity:.75">لا توجد طلبات</div>`
                    }
                </div>
            </div>

            <div class="card">
                <h2 style="margin-top:0">آخر الإيداعات</h2>
                <div style="display:grid;gap:10px">
                    ${
                        recentDeposits.length
                            ? recentDeposits.map(d => `
                                <div style="background:#171717;border:1px solid #242424;padding:12px 14px;border-radius:14px">
                                    <div style="display:flex;justify-content:space-between;gap:10px;align-items:center">
                                        <div>
                                            <div style="font-weight:700">${esc(d.user?.username || d.user?.fullName || "-")}</div>
                                            <div style="opacity:.7;font-size:13px">${esc(d.paymentMethod || "-")} • ${esc(d.transactionNumber || "-")}</div>
                                        </div>
                                        <div style="text-align:left">
                                            <div style="font-weight:700">${fmtMoney(d.amount, d.currency || "USD")}</div>
                                            <div style="margin-top:6px">${statusBadge(d.status)}</div>
                                        </div>
                                    </div>
                                </div>
                            `).join("")
                            : `<div style="opacity:.75">لا توجد إيداعات</div>`
                    }
                </div>
            </div>
        </div>

        <br>

        <div class="card">
            <h2>آخر النشاط</h2>
            <p>مرحباً بك في لوحة تحكم Smart Charge Store</p>
        </div>
    `;
}

async function loadOrders() {
    setTitle("الطلبات");

    const r = await request("/admin/orders").catch(() => ({ orders: [] }));
    const orders = r.orders || [];

    const rows = orders.map((o, i) => `
        <tr>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${i + 1}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(o.game?.name || "-")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">
                <div>${esc(o.playerName || "-")}</div>
                <div style="opacity:.65;font-size:12px">${esc(o.playerId || "-")}</div>
            </td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${fmtMoney(o.amount, o.currency || "USD")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${statusBadge(o.status)}</td>
        </tr>
    `).join("");

    app.innerHTML = tableCard(
        "📦 الطلبات",
        ["#", "اللعبة", "اللاعب", "المبلغ", "الحالة"],
        rows
    );
}

async function loadDeposits() {
    setTitle("الإيداعات");

    const r = await request("/admin/deposits").catch(() => ({ deposits: [] }));
    const deposits = r.deposits || [];

    const rows = deposits.map((d, i) => `
        <tr>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${i + 1}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(d.user?.username || d.user?.fullName || "-")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${fmtMoney(d.amount, d.currency || "USD")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(d.paymentMethod || "-")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(d.transactionNumber || "-")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${statusBadge(d.status)}</td>
        </tr>
    `).join("");

    app.innerHTML = tableCard(
        "💰 الإيداعات",
        ["#", "المستخدم", "المبلغ", "طريقة الدفع", "رقم العملية", "الحالة"],
        rows
    );
}

async function loadGames() {
    setTitle("الألعاب");

    const r = await request("/admin/games").catch(() => ({ games: [] }));
    const games = r.games || [];

    const rows = games.map((g, i) => `
        <tr>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${i + 1}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(g.name || "-")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(g.slug || "-")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(g.category || "-")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${g.active ? "🟢 مفعلة" : "🔴 معطلة"}</td>
        </tr>
    `).join("");

    app.innerHTML = tableCard(
        "🎮 الألعاب",
        ["#", "الاسم", "Slug", "القسم", "الحالة"],
        rows,
        `<button style="padding:10px 14px;background:#ff3030;border:none;border-radius:12px;color:#fff">➕ إضافة لعبة</button>`
    );
}

async function loadPackages() {
    setTitle("الباقات");

    const r = await request("/admin/packages").catch(() => ({ packages: [] }));
    const packages = r.packages || [];

    const rows = packages.map((p, i) => `
        <tr>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${i + 1}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(p.game?.name || "-")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(p.name || "-")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(String(p.amount ?? "-"))}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${fmtMoney(p.price, p.currency || "USD")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${fmtMoney(p.cost, p.currency || "USD")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${statusBadge(p.active ? "active" : "inactive")}</td>
        </tr>
    `).join("");

    app.innerHTML = tableCard(
        "🏷 الباقات",
        ["#", "اللعبة", "اسم الباقة", "الكمية", "السعر", "التكلفة", "الحالة"],
        rows,
        `<button style="padding:10px 14px;background:#ff3030;border:none;border-radius:12px;color:#fff">➕ إضافة باقة</button>`
    );
}

async function loadProviders() {
    setTitle("المزودون");

    const r = await request("/providers").catch(() => ({ providers: [] }));
    const providers = r.providers || [];

    const rows = providers.map((p, i) => `
        <tr>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${i + 1}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(p.name || "-")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(p.code || "-")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${p.status === "online" ? "🟢 متصل" : "🔴 غير متصل"}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${p.priority ?? 1}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${p.autoOrders ? "نعم" : "لا"}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${p.autoSync ? "نعم" : "لا"}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(p.apiUrl || "-")}</td>
        </tr>
    `).join("");

    app.innerHTML = tableCard(
        "🌐 المزودون",
        ["#", "الاسم", "Code", "الحالة", "الأولوية", "طلبات تلقائية", "مزامنة", "API"],
        rows,
        `<button style="padding:10px 14px;background:#ff3030;border:none;border-radius:12px;color:#fff">➕ إضافة مزود</button>`
    );
}

async function loadUsers() {
    setTitle("المستخدمون");

    const [dash, ordersRes, depositsRes] = await Promise.all([
        request("/admin/dashboard").catch(() => ({ dashboard: {} })),
        request("/admin/orders").catch(() => ({ orders: [] })),
        request("/admin/deposits").catch(() => ({ deposits: [] }))
    ]);

    const map = new Map();

    (ordersRes.orders || []).forEach(item => {
        const u = item.user;
        if (u && u._id && !map.has(u._id)) map.set(u._id, u);
    });

    (depositsRes.deposits || []).forEach(item => {
        const u = item.user;
        if (u && u._id && !map.has(u._id)) map.set(u._id, u);
    });

    const users = Array.from(map.values());

    const rows = users.map((u, i) => `
        <tr>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${i + 1}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(u.username || "-")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(u.fullName || "-")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(u.email || "-")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(u.phone || "-")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(u.role || "-")}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${u.status === "active" ? "🟢 active" : "🔴 inactive"}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #222">${fmtMoney(u.balance, u.currency || "USD")}</td>
        </tr>
    `).join("");

    app.innerHTML = `
        <div class="cards">
            ${card("👥 المستخدمون", dash.dashboard?.users || users.length, "#ff3030", "إجمالي الحسابات")}
            ${card("💵 الرصيد", "—", "#00d084", "سيتم ربطه لاحقاً")}
            ${card("🛡 الحماية", "ON", "#ffd166", "كشف الاحتيال")}
        </div>
        <br>
        ${tableCard(
            "👥 المستخدمون",
            ["#", "اسم المستخدم", "الاسم", "البريد", "الهاتف", "الدور", "الحالة", "الرصيد"],
            rows
        )}
    `;
}

async function loadPayments() {
    setTitle("وسائل الدفع");

    const r = await request("/payment").catch(() => ({ payments: [] }));
    const items = r.payments || r.methods || [];

    const rows = items.length
        ? items.map((p, i) => `
            <tr>
                <td style="padding:12px 10px;border-bottom:1px solid #222">${i + 1}</td>
                <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(p.name || p.method || "-")}</td>
                <td style="padding:12px 10px;border-bottom:1px solid #222">${p.active === false ? "🔴 معطلة" : "🟢 مفعلة"}</td>
                <td style="padding:12px 10px;border-bottom:1px solid #222">${esc(p.currency || "-")}</td>
            </tr>
        `).join("")
        : `
            <tr>
                <td colspan="4" style="padding:18px;color:#aaa">لا توجد بيانات جاهزة من الـ API، لكن الصفحة تعمل</td>
            </tr>
        `;

    app.innerHTML = tableCard(
        "💳 وسائل الدفع",
        ["#", "الوسيلة", "الحالة", "العملة"],
        rows,
        `<button style="padding:10px 14px;background:#ff3030;border:none;border-radius:12px;color:#fff">➕ إضافة وسيلة دفع</button>`
    );
}

async function loadSettings() {
    setTitle("الإعدادات");

    app.innerHTML = `
        <div class="card">
            <h2>⚙️ إعدادات المتجر</h2>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px">
                <input placeholder="اسم المتجر" style="padding:12px;border-radius:12px;border:1px solid #333;background:#111;color:#fff">
                <input placeholder="واتساب الدعم" style="padding:12px;border-radius:12px;border:1px solid #333;background:#111;color:#fff">
                <input placeholder="تيليجرام الدعم" style="padding:12px;border-radius:12px;border:1px solid #333;background:#111;color:#fff">
                <input placeholder="البريد الإلكتروني" style="padding:12px;border-radius:12px;border:1px solid #333;background:#111;color:#fff">
            </div>

            <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
                <button style="padding:12px 16px;background:#ff3030;border:none;border-radius:12px;color:#fff">حفظ</button>
                <button style="padding:12px 16px;background:#1c1c1c;border:1px solid #333;border-radius:12px;color:#fff">وضع الصيانة</button>
            </div>
        </div>
    `;
}

async function loadStatistics() {
    setTitle("الإحصائيات");

    const d = await request("/admin/dashboard").catch(() => ({ dashboard: {} }));

    app.innerHTML = `
        <div class="cards">
            ${card("👥 المستخدمون", d.dashboard?.users || 0, "#ff3030")}
            ${card("📦 الطلبات", d.dashboard?.orders || 0, "#00d084")}
            ${card("💰 الإيداعات", d.dashboard?.deposits || 0, "#00bfff")}
            ${card("🟢 النظام", "Online", "#ffd166")}
        </div>

        <br>

        <div class="card">
            <h2>📊 ملخص سريع</h2>
            <ul style="line-height:2.1">
                <li>عدد المستخدمين: ${d.dashboard?.users || 0}</li>
                <li>عدد الطلبات: ${d.dashboard?.orders || 0}</li>
                <li>عدد الإيداعات: ${d.dashboard?.deposits || 0}</li>
            </ul>
        </div>
    `;
}

async function loadPage(page) {
    try {
        switch (page) {
            case "dashboard":
                return await dashboard();
            case "orders":
                return await loadOrders();
            case "deposits":
                return await loadDeposits();
            case "games":
                return await loadGames();
            case "packages":
                return await loadPackages();
            case "providers":
                return await loadProviders();
            case "users":
                return await loadUsers();
            case "payments":
                return await loadPayments();
            case "settings":
                return await loadSettings();
            case "statistics":
                return await loadStatistics();
            default:
                setTitle(page);
                app.innerHTML = `
                    <div class="card">
                        <h2>${esc(page)}</h2>
                        <p>هذا القسم غير مبرمج بعد.</p>
                    </div>
                `;
        }
    } catch (err) {
        app.innerHTML = `
            <div class="card">
                <h2 style="color:#ff8080">حدث خطأ</h2>
                <p>${esc(err.message || err)}</p>
            </div>
        `;
    }
}

window.loadPage = loadPage;
window.dashboard = dashboard;
window.loadOrders = loadOrders;
window.loadDeposits = loadDeposits;
window.loadGames = loadGames;
window.loadPackages = loadPackages;
window.loadProviders = loadProviders;
window.loadUsers = loadUsers;
window.loadPayments = loadPayments;
window.loadSettings = loadSettings;
window.loadStatistics = loadStatistics;

document.addEventListener("DOMContentLoaded", () => {
    loadPage("dashboard");
});
