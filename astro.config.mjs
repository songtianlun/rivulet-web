import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
    integrations: [react()],
    site: 'https://rivulet.app',
    i18n: {
        defaultLocale: 'zh',
        locales: ['zh', 'en'],
        routing: {
            prefixDefaultLocale: true,
        },
    },
});
