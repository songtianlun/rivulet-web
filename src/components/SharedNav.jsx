import { useState, useEffect } from 'react';

const LIGHT_THEME = {
    bg: '#ffffff',
    bgAlt: '#faf9ff',
    border: '#ede9fe',
    text: '#1e1b2e',
    muted: '#6d6a84',
    accent: '#8B5CF6',
    accentDark: '#7C3AED',
};

const DARK_THEME = {
    bg: '#0f0d1a',
    bgAlt: '#13111f',
    border: '#2e2558',
    text: '#ede9fe',
    muted: '#9b93c4',
    accent: '#a78bfa',
    accentDark: '#c4b5fd',
};

const T = {
    zh: {
        nav_quickstart: '快速部署',
        nav_features: '功能',
        nav_faq: 'FAQ',
        nav_guestbook: '留言板',
        nav_changelog: '更新日志',
        nav_demo: '立即体验',
        brand: '溪流记账',
        lang_switch: 'EN',
        light: '白天',
        auto: '跟随系统',
        dark: '夜晚',
    },
    en: {
        nav_quickstart: 'Quick Deploy',
        nav_features: 'Features',
        nav_faq: 'FAQ',
        nav_guestbook: 'Guestbook',
        nav_changelog: 'Changelog',
        nav_demo: 'Try Demo',
        brand: 'Rivulet',
        lang_switch: '中文',
        light: 'Light',
        auto: 'Auto',
        dark: 'Dark',
    },
};

function Icon({ name, size = 14, color = 'currentColor' }) {
    if (name === 'sun') return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
    );
    if (name === 'moon') return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    );
    if (name === 'monitor') return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
        </svg>
    );
    return null;
}

/**
 * SharedNav — shared navigation bar for sub-pages (changelog, guestbook).
 * @param {string} lang - 'zh' | 'en'
 * @param {string|null} activePage - 'changelog' | 'guestbook' | null
 */
export default function SharedNav({ lang = 'zh', activePage = null }) {
    const [colorMode, setColorMode] = useState('system');
    const [systemDark, setSystemDark] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Restore saved color mode from localStorage (same key as App.jsx)
    useEffect(() => {
        const saved = typeof localStorage !== 'undefined'
            ? localStorage.getItem('rivulet-color-mode')
            : null;
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

    // Track mobile breakpoint
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const isDark = colorMode === 'dark' || (colorMode === 'system' && systemDark);
    const theme = isDark ? DARK_THEME : LIGHT_THEME;
    const t = T[lang];

    const homeBase = `/${lang}/`;
    const langOpposite = lang === 'zh' ? 'en' : 'zh';
    const langSwitchHref = activePage ? `/${langOpposite}/${activePage}` : `/${langOpposite}/`;

    const handleColorMode = (mode) => {
        setColorMode(mode);
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('rivulet-color-mode', mode);
        }
    };

    const navLinks = [
        { href: `${homeBase}#quickstart`, label: t.nav_quickstart, key: null },
        { href: `${homeBase}#features`, label: t.nav_features, key: null },
        { href: `${homeBase}#faq`, label: t.nav_faq, key: null },
        { href: `/${lang}/guestbook`, label: t.nav_guestbook, key: 'guestbook' },
        { href: `/${lang}/changelog`, label: t.nav_changelog, key: 'changelog' },
    ];

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            background: theme.bg + 'f5',
            backdropFilter: 'blur(16px)',
            borderBottom: `1px solid ${theme.border}`,
            transition: 'background 0.3s ease, border-color 0.3s ease',
            fontFamily: "'Noto Sans SC', 'Plus Jakarta Sans', sans-serif",
        }}>
            {/* Top bar */}
            <div style={{
                padding: '0 clamp(20px, 5vw, 80px)', height: 64,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                    <img src="/logo.png" alt="Rivulet logo" style={{ width: 28, height: 28, borderRadius: 8 }} />
                    <span style={{ fontSize: 16, fontWeight: 700, color: theme.text, letterSpacing: -0.3 }}>
                        {t.brand}
                    </span>
                </a>

                {/* Desktop right side */}
                {!isMobile && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        {/* Nav links */}
                        <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
                            {navLinks.map(link => {
                                const isActive = activePage !== null && activePage === link.key;
                                return (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        style={{
                                            color: isActive ? theme.accent : theme.muted,
                                            textDecoration: 'none',
                                            fontWeight: isActive ? 600 : 400,
                                            transition: 'color 0.2s',
                                            borderBottom: isActive ? `2px solid ${theme.accent}` : '2px solid transparent',
                                            paddingBottom: 2,
                                        }}
                                        onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = theme.text; }}
                                        onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = theme.muted; }}
                                    >
                                        {link.label}
                                    </a>
                                );
                            })}
                        </div>

                        {/* Color mode toggle */}
                        <div style={{
                            display: 'flex', alignItems: 'center',
                            background: theme.bgAlt, borderRadius: 24,
                            border: `1px solid ${theme.border}`, padding: '3px', gap: 2,
                        }}>
                            {[
                                { mode: 'light', icon: 'sun', label: t.light },
                                { mode: 'system', icon: 'monitor', label: t.auto },
                                { mode: 'dark', icon: 'moon', label: t.dark },
                            ].map(({ mode, icon, label }) => (
                                <button key={mode} onClick={() => handleColorMode(mode)} title={label}
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

                        {/* Language switcher */}
                        <a
                            href={langSwitchHref}
                            style={{
                                padding: '5px 12px', borderRadius: 20, border: `1px solid ${theme.border}`,
                                textDecoration: 'none', fontSize: 12, color: theme.muted,
                                transition: 'all 0.2s', display: 'inline-block',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = theme.accent; e.currentTarget.style.color = theme.accent; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.muted; }}
                        >
                            {t.lang_switch}
                        </a>

                        {/* Demo button */}
                        <a
                            href="https://demo.rivulet.app/"
                            target="_blank"
                            rel="noopener noreferrer"
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
                )}

                {/* Mobile hamburger */}
                {isMobile && (
                    <button
                        onClick={() => setMenuOpen(o => !o)}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            padding: 8, color: theme.text, display: 'flex', alignItems: 'center',
                        }}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            {menuOpen
                                ? <path d="M18 6 6 18M6 6l12 12" />
                                : <path d="M3 12h18M3 6h18M3 18h18" />
                            }
                        </svg>
                    </button>
                )}
            </div>

            {/* Mobile dropdown menu */}
            {isMobile && menuOpen && (
                <div style={{
                    padding: '16px clamp(20px, 5vw, 80px) 24px',
                    borderTop: `1px solid ${theme.border}`,
                    background: theme.bg + 'f8',
                    display: 'flex', flexDirection: 'column', gap: 16,
                }}>
                    {navLinks.map(link => {
                        const isActive = activePage !== null && activePage === link.key;
                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                style={{
                                    color: isActive ? theme.accent : theme.text,
                                    textDecoration: 'none', fontSize: 15,
                                    fontWeight: isActive ? 600 : 400,
                                }}
                            >
                                {link.label}
                            </a>
                        );
                    })}
                    <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                        <a
                            href={langSwitchHref}
                            style={{
                                padding: '6px 14px', borderRadius: 20, border: `1px solid ${theme.border}`,
                                textDecoration: 'none', fontSize: 13, color: theme.muted,
                            }}
                        >
                            {t.lang_switch}
                        </a>
                        <a
                            href="https://demo.rivulet.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: '6px 16px', borderRadius: 24, background: theme.accent, color: '#fff',
                                textDecoration: 'none', fontSize: 13, fontWeight: 500,
                            }}
                        >
                            {t.nav_demo}
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
