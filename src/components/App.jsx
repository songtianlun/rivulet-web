import { useState, useEffect, useRef } from 'react';

// ── THEME TOKENS ──────────────────────────────────────────────
const LIGHT_THEME = {
    bg: '#ffffff',
    bgAlt: '#faf9ff',
    bgCard: '#ffffff',
    border: '#ede9fe',
    text: '#1e1b2e',
    muted: '#6d6a84',
    accent: '#8B5CF6',
    accentDark: '#7C3AED',
    accentLight: '#f5f3ff',
};

const DARK_THEME = {
    bg: '#0f0d1a',
    bgAlt: '#13111f',
    bgCard: '#1c1830',
    border: '#2e2558',
    text: '#ede9fe',
    muted: '#9b93c4',
    accent: '#a78bfa',
    accentDark: '#c4b5fd',
    accentLight: '#2d1f6e',
};

// ── I18N ──────────────────────────────────────────────────────
const T = {
    zh: {
        nav_demo: '立即体验',
        nav_github: 'GitHub',
        nav_features: '功能',
        nav_faq: 'FAQ',
        hero_eyebrow: '个人财务管理',
        hero_h1_a: '让你的钱',
        hero_h1_b: '流向清晰可控',
        hero_sub: '极简但强大的记账应用。快速记录收支，管理多账户账本，掌握预算与投资，财务分析一目了然。',
        hero_cta: '立即体验 Demo',
        hero_cta2: '了解功能',
        hero_badge: '免费开源 · 自部署',
        features_title: '功能全面，操作简单',
        features_sub: '从日常记账到投资管理，溪流记账覆盖你所有的财务需求',
        f1_t: '流水记录', f1_d: '快速记录收入与支出，支持类型、备注、时间与账户关联，轻松掌握每日资金流向。',
        f2_t: '账户管理', f2_d: '对应银行卡与网络账户，每个账户独立统计，随时查看各渠道余额与收支历史。',
        f3_t: '多账本共享', f3_d: '默认个人账本，可创建多个账本分类管理，支持与家人朋友共享，协作记录家庭财务。',
        f4_t: '预算规划', f4_d: '按月制定预算，支持总体预算或分类别精细设定，直观了解预算执行情况。',
        f5_t: '投资管理', f5_d: '记录基金买入与卖出，自动计算持仓与收益，卖出后实时更新账户与总资产。',
        f6_t: '财务分析', f6_d: '可视化图表展示收支趋势与分类占比，让每一分钱的去向清晰透明。',
        demo_title: '简洁的界面，清晰的数据',
        demo_sub: '精心设计的交互体验，让记账不再是负担',
        faq_title: '常见问题',
        faq_sub: '有其他问题？欢迎通过 GitHub Issues 提问',
        q1: '溪流记账完全免费吗？',
        a1: '是的，溪流记账是完全免费的开源软件，基于 MIT 协议发布。你可以免费使用、修改和部署。',
        q2: '我的数据安全吗？',
        a2: '数据存储在你自己部署的服务器上（或官方 Demo 服务器），我们不会出售或分析你的个人财务数据。强烈建议自部署以获得完整数据控制权。',
        q3: '支持哪些平台？',
        a3: '溪流记账是 Web 应用，支持任何现代浏览器访问，包括桌面端与移动端。无需安装，打开即用。',
        q4: '如何共享账本给家人？',
        a4: '在账本管理中，将账本分享给系统内的其他用户即可。被分享者可以查看账本的所有记录与统计数据。',
        q5: '可以自己部署吗？',
        a5: '当然可以，自部署是我们首要推荐的方式。GitHub 仓库中提供了完整的部署文档（开发中，即将开放）。',
        footer_tagline: '让财务流动清晰可见',
        footer_copy: '© 2025 Rivulet · 溪流记账',
        footer_links: ['GitHub', 'Demo', '问题反馈'],
        footer_open: '开源免费',
    },
    en: {
        nav_demo: 'Try Demo',
        nav_github: 'GitHub',
        nav_features: 'Features',
        nav_faq: 'FAQ',
        hero_eyebrow: 'Personal Finance',
        hero_h1_a: 'See exactly',
        hero_h1_b: 'where your money flows',
        hero_sub: 'A minimalist yet powerful finance app. Track income and expenses fast, manage multiple accounts and ledgers, and unlock clear analytics to understand where your money goes.',
        hero_cta: 'Try Demo',
        hero_cta2: 'See Features',
        hero_badge: 'Free & Open Source · Self-hostable',
        features_title: "Everything you need, nothing you don't",
        features_sub: 'From daily tracking to investment management, Rivulet covers all your financial needs',
        f1_t: 'Transaction Log',
        f1_d: 'Quickly record income and expenses with category, note, time, and account — always know your daily cash flow.',
        f2_t: 'Account Management',
        f2_d: 'Link your bank cards and digital wallets. Each account tracks independently so you always know your balances.',
        f3_t: 'Shared Ledgers',
        f3_d: 'Create multiple ledgers for different purposes. Share with family or friends to collaborate on household finances.',
        f4_t: 'Budget Planning',
        f4_d: "Set monthly budgets overall or by category. See at a glance how you're tracking against your spending goals.",
        f5_t: 'Investment Tracking',
        f5_d: 'Record fund purchases and sales. Automatically updates your account balance and total assets on every trade.',
        f6_t: 'Financial Analytics',
        f6_d: 'Visual charts show spending trends and breakdowns. Understand where every yuan goes, at a glance.',
        demo_title: 'Clean interface, clear data',
        demo_sub: 'Thoughtfully designed interactions that make bookkeeping feel effortless',
        faq_title: 'Frequently Asked Questions',
        faq_sub: 'More questions? Ask via GitHub Issues',
        q1: 'Is Rivulet completely free?',
        a1: 'Yes. Rivulet is free and open-source software released under the MIT license. You can use, modify, and deploy it freely.',
        q2: 'Is my data safe?',
        a2: 'Data is stored on your own self-hosted server (or the official demo server). We never sell or analyze your financial data. We strongly recommend self-hosting for full control.',
        q3: 'What platforms are supported?',
        a3: 'Rivulet is a web app that works in any modern browser — desktop and mobile. No installation required.',
        q4: 'How do I share a ledger?',
        a4: 'In ledger settings, share the ledger with any registered user. They can then view all records and analytics for that ledger.',
        q5: 'Can I self-host it?',
        a5: 'Absolutely. Self-hosting is our first recommendation. Full deployment docs are included in the GitHub repository (coming soon).',
        footer_tagline: 'Making money flows visible',
        footer_copy: '© 2025 Rivulet',
        footer_links: ['GitHub', 'Demo', 'Feedback'],
        footer_open: 'Free & Open Source',
    },
};

// ── ICONS (inline SVG) ────────────────────────────────────────
function Icon({ name, size = 20, color = 'currentColor' }) {
    const icons = {
        flow: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 12c3-4 6-4 9 0s6 4 9 0" />
                <path d="M3 6c3-4 6-4 9 0s6 4 9 0" opacity="0.4" />
                <path d="M3 18c3-4 6-4 9 0s6 4 9 0" opacity="0.4" />
            </svg>
        ),
        wallet: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M16 13a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />
                <path d="M2 10h20" />
            </svg>
        ),
        ledger: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 4h16v16H4z" rx="1" />
                <path d="M8 2v4M16 2v4M4 10h16" />
                <circle cx="16" cy="17" r="3" />
                <path d="M18 15.5 16 17l-1-1" />
            </svg>
        ),
        budget: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
        invest: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
            </svg>
        ),
        chart: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
                <rect x="3" y="12" width="4" height="9" />
                <rect x="10" y="7" width="4" height="14" />
                <rect x="17" y="4" width="4" height="17" />
            </svg>
        ),
        arrow: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
        ),
        check: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        ),
        chevron: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
                <path d="m6 9 6 6 6-6" />
            </svg>
        ),
        sun: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
        ),
        moon: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
        ),
        monitor: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
            </svg>
        ),
        github: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
        ),
    };
    return icons[name] ?? null;
}

// ── STREAM DECORATION ─────────────────────────────────────────
function StreamDecor({ color }) {
    return (
        <svg
            viewBox="0 0 400 200"
            fill="none"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }}
        >
            <path
                d="M0 100 Q50 60 100 100 Q150 140 200 100 Q250 60 300 100 Q350 140 400 100"
                stroke={color} strokeWidth="1.5" fill="none" strokeDasharray="800"
                style={{ animation: 'streamFlow 4s ease forwards' }}
            />
            <path
                d="M0 130 Q60 90 120 130 Q180 170 240 130 Q300 90 360 130 Q380 110 400 130"
                stroke={color} strokeWidth="1" fill="none" opacity="0.7" strokeDasharray="800"
                style={{ animation: 'streamFlow 4.5s ease 0.5s forwards' }}
            />
            <path
                d="M0 70 Q70 30 140 70 Q210 110 280 70 Q340 30 400 70"
                stroke={color} strokeWidth="0.8" fill="none" opacity="0.5" strokeDasharray="800"
                style={{ animation: 'streamFlow 5s ease 1s forwards' }}
            />
        </svg>
    );
}

// ── MOCK DASHBOARD ────────────────────────────────────────────
function MockDashboard({ theme, lang }) {
    const txZh = [
        { label: '早餐', cat: '餐饮', amt: '-¥18', color: '#ef4444', time: '08:30' },
        { label: '工资', cat: '收入', amt: '+¥12,000', color: theme.accent, time: '09:00' },
        { label: '地铁', cat: '交通', amt: '-¥4', color: '#ef4444', time: '09:15' },
        { label: '午餐', cat: '餐饮', amt: '-¥35', color: '#ef4444', time: '12:10' },
        { label: '基金买入', cat: '投资', amt: '-¥2,000', color: '#f59e0b', time: '14:00' },
    ];
    const txEn = [
        { label: 'Breakfast', cat: 'Dining', amt: '-¥18', color: '#ef4444', time: '08:30' },
        { label: 'Salary', cat: 'Income', amt: '+¥12,000', color: theme.accent, time: '09:00' },
        { label: 'Metro', cat: 'Transport', amt: '-¥4', color: '#ef4444', time: '09:15' },
        { label: 'Lunch', cat: 'Dining', amt: '-¥35', color: '#ef4444', time: '12:10' },
        { label: 'Fund Buy', cat: 'Investment', amt: '-¥2,000', color: '#f59e0b', time: '14:00' },
    ];
    const txList = lang === 'zh' ? txZh : txEn;

    const catEmoji = (cat) => {
        if (cat === '餐饮' || cat === 'Dining') return '🍜';
        if (cat === '收入' || cat === 'Income') return '💰';
        if (cat === '交通' || cat === 'Transport') return '🚇';
        if (cat === '投资' || cat === 'Investment') return '📈';
        return '💳';
    };

    return (
        <div style={{
            background: theme.bgCard, borderRadius: 20,
            boxShadow: '0 24px 80px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.08)',
            width: '100%', maxWidth: 560, overflow: 'hidden',
            fontFamily: "'Noto Sans SC', sans-serif", userSelect: 'none',
        }}>
            {/* Header */}
            <div style={{ background: theme.accent, padding: '20px 24px 16px', color: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <span style={{ fontSize: 13, opacity: 0.85 }}>{lang === 'zh' ? '个人账本' : 'Personal Ledger'}</span>
                    <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: 20 }}>
                        {lang === 'zh' ? '4月' : 'April'}
                    </span>
                </div>
                <div style={{ fontSize: 11, opacity: 0.75, marginBottom: 4 }}>{lang === 'zh' ? '本月结余' : 'Monthly Balance'}</div>
                <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>¥9,943</div>
                <div style={{ display: 'flex', gap: 24, marginTop: 12 }}>
                    {[
                        [lang === 'zh' ? '收入' : 'Income', '¥12,000', null],
                        [lang === 'zh' ? '支出' : 'Expense', '¥2,057', null],
                        [lang === 'zh' ? '预算' : 'Budget', '82%', '#ddd6fe'],
                    ].map(([label, val, clr]) => (
                        <div key={label}>
                            <div style={{ fontSize: 10, opacity: 0.7 }}>{label}</div>
                            <div style={{ fontSize: 15, fontWeight: 600, ...(clr ? { color: clr } : {}) }}>{val}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Budget bar */}
            <div style={{ padding: '12px 24px', borderBottom: `1px solid ${theme.border}`, background: theme.accentLight }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: theme.muted, marginBottom: 5 }}>
                    <span>{lang === 'zh' ? '月度预算' : 'Monthly Budget'}</span>
                    <span>¥2,057 / ¥2,500</span>
                </div>
                <div style={{ height: 5, background: theme.border, borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: '82%', height: '100%', background: theme.accent, borderRadius: 3, transition: 'width 1s ease' }} />
                </div>
            </div>

            {/* Transactions */}
            <div style={{ padding: '12px 0' }}>
                {txList.map((tx, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '9px 24px', gap: 12 }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: 10,
                            background: tx.color + '18',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 14, flexShrink: 0,
                        }}>
                            {catEmoji(tx.cat)}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 500, color: theme.text }}>{tx.label}</div>
                            <div style={{ fontSize: 11, color: theme.muted }}>{tx.cat} · {tx.time}</div>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: tx.color }}>{tx.amt}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── FEATURE CARD ──────────────────────────────────────────────
function FeatureCard({ icon, title, desc, theme, delay = 0 }) {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
            { threshold: 0.1 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{
                opacity: vis ? 1 : 0,
                transform: vis ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
                padding: 32, borderRadius: 16, border: `1px solid ${theme.border}`,
                background: theme.bg,
            }}
        >
            <div style={{
                width: 48, height: 48, borderRadius: 12, background: theme.accentLight,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20, color: theme.accent,
            }}>
                <Icon name={icon} size={22} color={theme.accent} />
            </div>
            <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 10, color: theme.text }}>{title}</div>
            <div style={{ fontSize: 14, lineHeight: 1.75, color: theme.muted }}>{desc}</div>
        </div>
    );
}

// ── FAQ ITEM ──────────────────────────────────────────────────
function FaqItem({ q, a, theme }) {
    const [open, setOpen] = useState(false);

    return (
        <div style={{ borderBottom: `1px solid ${theme.border}` }}>
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%', textAlign: 'left', padding: '20px 0',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'none', border: 'none', cursor: 'pointer', gap: 16,
                }}
            >
                <span style={{ fontSize: 16, fontWeight: 500, color: theme.text }}>{q}</span>
                <span style={{
                    transform: open ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.25s ease', flexShrink: 0, color: theme.muted,
                }}>
                    <Icon name="chevron" size={18} color={theme.muted} />
                </span>
            </button>
            <div style={{ maxHeight: open ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                <div style={{ paddingBottom: 20, fontSize: 15, lineHeight: 1.8, color: theme.muted }}>{a}</div>
            </div>
        </div>
    );
}

// ── detect browser language ─────────────────────────────────
function detectLang() {
    if (typeof navigator === 'undefined') return 'en';
    const nav = navigator.language || navigator.userLanguage || 'en';
    return nav.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

// ── MAIN APP ──────────────────────────────────────────────────
export default function App({ initialLang = 'auto' }) {
    const [lang, setLang] = useState(initialLang === 'auto' ? 'en' : initialLang);
    const [scrolled, setScrolled] = useState(false);
    const [colorMode, setColorMode] = useState('system'); // 'light' | 'dark' | 'system'
    const [systemDark, setSystemDark] = useState(false);

    useEffect(() => {
        if (initialLang === 'auto') {
            setLang(detectLang());
        }
    }, [initialLang]);

    // Restore saved color mode
    useEffect(() => {
        const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('rivulet-color-mode') : null;
        if (saved === 'light' || saved === 'dark' || saved === 'system') {
            setColorMode(saved);
        }
    }, []);

    // Track system dark preference
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        setSystemDark(mq.matches);
        const handler = (e) => setSystemDark(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const isDark = colorMode === 'dark' || (colorMode === 'system' && systemDark);
    const theme = isDark ? DARK_THEME : LIGHT_THEME;

    const handleColorMode = (mode) => {
        setColorMode(mode);
        if (typeof localStorage !== 'undefined') localStorage.setItem('rivulet-color-mode', mode);
    };

    const t = T[lang];

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    const features = [
        { icon: 'flow', title: t.f1_t, desc: t.f1_d },
        { icon: 'wallet', title: t.f2_t, desc: t.f2_d },
        { icon: 'ledger', title: t.f3_t, desc: t.f3_d },
        { icon: 'budget', title: t.f4_t, desc: t.f4_d },
        { icon: 'invest', title: t.f5_t, desc: t.f5_d },
        { icon: 'chart', title: t.f6_t, desc: t.f6_d },
    ];

    const faqs = [
        { q: t.q1, a: t.a1 },
        { q: t.q2, a: t.a2 },
        { q: t.q3, a: t.a3 },
        { q: t.q4, a: t.a4 },
        { q: t.q5, a: t.a5 },
    ];

    return (
        <div style={{ background: theme.bg, color: theme.text, minHeight: '100vh', transition: 'background 0.3s ease, color 0.3s ease' }}>

            {/* ── NAV ── */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                padding: '0 clamp(24px, 5vw, 80px)', height: 64,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: scrolled ? theme.bg + 'f2' : 'transparent',
                backdropFilter: scrolled ? 'blur(16px)' : 'none',
                borderBottom: scrolled ? `1px solid ${theme.border}` : '1px solid transparent',
                transition: 'all 0.3s ease',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img src="/logo.png" alt="Rivulet logo" style={{ width: 28, height: 28, borderRadius: 8 }} />
                    <span style={{ fontSize: 16, fontWeight: 700, color: theme.text, letterSpacing: -0.3 }}>
                        {lang === 'zh' ? '溪流记账' : 'Rivulet'}
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div style={{ display: 'flex', gap: 24, fontSize: 14, color: theme.muted }}>
                        {[['#features', t.nav_features], ['#faq', t.nav_faq]].map(([href, label]) => (
                            <a
                                key={href} href={href}
                                style={{ color: theme.muted, textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseEnter={e => (e.target.style.color = theme.text)}
                                onMouseLeave={e => (e.target.style.color = theme.muted)}
                            >
                                {label}
                            </a>
                        ))}
                    </div>

                    {/* Color mode toggle */}
                    <div style={{
                        display: 'flex', alignItems: 'center',
                        background: theme.bgAlt, borderRadius: 24,
                        border: `1px solid ${theme.border}`, padding: '3px',
                        gap: 2,
                    }}>
                        {[
                            { mode: 'light', icon: 'sun',     label: lang === 'zh' ? '白天' : 'Light' },
                            { mode: 'system', icon: 'monitor', label: lang === 'zh' ? '跟随系统' : 'Auto' },
                            { mode: 'dark',  icon: 'moon',    label: lang === 'zh' ? '夜晚' : 'Dark' },
                        ].map(({ mode, icon, label }) => (
                            <button
                                key={mode}
                                onClick={() => handleColorMode(mode)}
                                title={label}
                                style={{
                                    width: 28, height: 28, borderRadius: 20, border: 'none',
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: colorMode === mode ? theme.accent : 'transparent',
                                    color: colorMode === mode ? '#fff' : theme.muted,
                                    transition: 'background 0.2s ease, color 0.2s ease',
                                }}
                            >
                                <Icon name={icon} size={14} color={colorMode === mode ? '#fff' : theme.muted} />
                            </button>
                        ))}
                    </div>

                    {/* Language toggle */}
                    <a
                        href={lang === 'zh' ? '/en/' : '/zh/'}
                        style={{
                            padding: '5px 12px', borderRadius: 20, border: `1px solid ${theme.border}`,
                            textDecoration: 'none', fontSize: 12, color: theme.muted,
                            transition: 'all 0.2s', display: 'inline-block',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = theme.accent; e.currentTarget.style.color = theme.accent; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.muted; }}
                    >
                        {lang === 'zh' ? 'EN' : '中文'}
                    </a>

                    <a
                        href="https://demo.rivulet.app/" target="_blank" rel="noopener noreferrer"
                        style={{
                            padding: '7px 18px', borderRadius: 24, background: theme.accent, color: '#fff',
                            textDecoration: 'none', fontSize: 13, fontWeight: 500,
                            boxShadow: `0 2px 12px ${theme.accent}40`, transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = theme.accentDark; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = theme.accent; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        {t.nav_demo}
                    </a>
                </div>
            </nav>

            {/* ── HERO ── */}
            <section style={{
                minHeight: '100vh', display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                padding: 'clamp(120px, 15vh, 160px) clamp(24px, 8vw, 120px) 80px',
                position: 'relative', overflow: 'hidden',
            }}>
                {/* Background decor */}
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                    <div style={{
                        position: 'absolute', top: '20%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600, height: 600, borderRadius: '50%',
                        background: `radial-gradient(circle, ${theme.accent}18 0%, transparent 70%)`,
                    }} />
                    <StreamDecor color={theme.accent} />
                </div>

                <div style={{ position: 'relative', maxWidth: 760, animation: 'fadeUp 0.8s ease both' }}>
                    {/* Badge */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '5px 14px', borderRadius: 20, border: `1px solid ${theme.border}`,
                        background: theme.accentLight, marginBottom: 32,
                        fontSize: 12, color: theme.accent, fontWeight: 500,
                    }}>
                        <Icon name="check" size={12} color={theme.accent} />
                        {t.hero_badge}
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(42px, 7vw, 72px)',
                        fontWeight: 700, lineHeight: 1.15, letterSpacing: -2,
                        marginBottom: 24, color: theme.text,
                    }}>
                        {t.hero_h1_a}<br />
                        <span style={{ color: theme.accent }}>{t.hero_h1_b}</span>
                    </h1>

                    <p style={{
                        fontSize: 'clamp(16px, 2vw, 18px)', color: theme.muted,
                        lineHeight: 1.8, maxWidth: 560, margin: '0 auto 40px', fontWeight: 300,
                    }}>
                        {t.hero_sub}
                    </p>

                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a
                            href="https://demo.rivulet.app/" target="_blank" rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '14px 32px', borderRadius: 32, background: theme.accent, color: '#fff',
                                textDecoration: 'none', fontSize: 15, fontWeight: 600,
                                boxShadow: `0 4px 20px ${theme.accent}50`, transition: 'all 0.25s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 30px ${theme.accent}60`; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 20px ${theme.accent}50`; }}
                        >
                            {t.hero_cta} <Icon name="arrow" size={16} color="#fff" />
                        </a>
                        <a
                            href="#features"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '14px 28px', borderRadius: 32, border: `1.5px solid ${theme.border}`,
                                color: theme.text, textDecoration: 'none', fontSize: 15, fontWeight: 500,
                                background: theme.bg, transition: 'all 0.25s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = theme.accent; e.currentTarget.style.color = theme.accent; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.text; }}
                        >
                            {t.hero_cta2}
                        </a>
                    </div>
                </div>
            </section>

            {/* ── MOCK DEMO ── */}
            <section style={{
                padding: '80px clamp(24px, 8vw, 120px)',
                background: theme.bgAlt,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                textAlign: 'center', gap: 48,
            }}>
                <div>
                    <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, letterSpacing: -1, marginBottom: 12 }}>
                        {t.demo_title}
                    </h2>
                    <p style={{ fontSize: 16, color: theme.muted, fontWeight: 300 }}>{t.demo_sub}</p>
                </div>
                <div style={{ animation: 'float 4s ease-in-out infinite', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <MockDashboard theme={theme} lang={lang} />
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section id="features" style={{ padding: '100px clamp(24px, 8vw, 120px)' }}>
                <div style={{ textAlign: 'center', marginBottom: 64 }}>
                    <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, letterSpacing: -1, marginBottom: 12 }}>
                        {t.features_title}
                    </h2>
                    <p style={{ fontSize: 16, color: theme.muted, fontWeight: 300, maxWidth: 480, margin: '0 auto' }}>
                        {t.features_sub}
                    </p>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 20, maxWidth: 1100, margin: '0 auto',
                }}>
                    {features.map((f, i) => (
                        <FeatureCard key={i} icon={f.icon} title={f.title} desc={f.desc} theme={theme} delay={i * 80} />
                    ))}
                </div>
            </section>

            {/* ── FAQ ── */}
            <section id="faq" style={{ padding: '80px clamp(24px, 8vw, 120px)', background: theme.bgAlt }}>
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 700, letterSpacing: -1, marginBottom: 10 }}>
                            {t.faq_title}
                        </h2>
                        <p style={{ fontSize: 15, color: theme.muted }}>{t.faq_sub}</p>
                    </div>
                    {faqs.map((faq, i) => (
                        <FaqItem key={i} q={faq.q} a={faq.a} theme={theme} />
                    ))}
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{
                padding: '56px clamp(24px, 8vw, 120px)',
                borderTop: `1px solid ${theme.border}`,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                flexWrap: 'wrap', gap: 24,
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <img src="/logo.png" alt="Rivulet logo" style={{ width: 24, height: 24, borderRadius: 6 }} />
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{lang === 'zh' ? '溪流记账' : 'Rivulet'}</span>
                    </div>
                    <p style={{ fontSize: 13, color: theme.muted }}>{t.footer_tagline}</p>
                    <p style={{ fontSize: 12, color: theme.muted, marginTop: 4, opacity: 0.6 }}>{t.footer_copy}</p>
                </div>
                <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                    {[
                        ['https://github.com/songtianlun/rivulet', 'github', t.footer_links[0]],
                        ['https://demo.rivulet.app/', null, t.footer_links[1]],
                        ['https://github.com/songtianlun/rivulet/issues', null, t.footer_links[2]],
                    ].map(([href, icon, label], i) => (
                        <a
                            key={i} href={href} target="_blank" rel="noopener noreferrer"
                            style={{
                                display: 'flex', alignItems: 'center', gap: 5,
                                fontSize: 13, color: theme.muted, textDecoration: 'none', transition: 'color 0.2s',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.color = theme.accent)}
                            onMouseLeave={e => (e.currentTarget.style.color = theme.muted)}
                        >
                            {icon && <Icon name={icon} size={14} color="currentColor" />}
                            {label}
                        </a>
                    ))}
                </div>
            </footer>

        </div>
    );
}
