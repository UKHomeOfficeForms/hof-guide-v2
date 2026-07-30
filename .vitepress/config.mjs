const normaliseBase = value => {
  if (!value || value === '/') {
    return '/';
  }
  return `/${value.replace(/^\/+|\/+$/g, '')}/`;
};

const base = normaliseBase(process.env.VITEPRESS_BASE);
const withBasePath = path => `${base}${path.replace(/^\/+/, '')}`;

const addClass = (token, className) => {
  const existing = token.attrGet('class');
  token.attrSet('class', existing ? `${existing} ${className}` : className);
};

export default {
  title: 'HOF Guide',
  base,
  description: 'Documentation for the Home Office Forms framework',
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['README.md', 'SUMMARY.md'],
  markdown: {
    lineNumbers: true,
    config(md) {
      const defaultRender = rule =>
        md.renderer.rules[rule] || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

      const headingOpen = defaultRender('heading_open');
      md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
        const level = tokens[idx].tag;
        const className = {
          h1: 'govuk-heading-xl',
          h2: 'govuk-heading-l',
          h3: 'govuk-heading-m',
          h4: 'govuk-heading-s',
          h5: 'govuk-heading-s',
          h6: 'govuk-heading-s'
        }[level];
        addClass(tokens[idx], className);
        return headingOpen(tokens, idx, options, env, self);
      };

      const paragraphOpen = defaultRender('paragraph_open');
      md.renderer.rules.paragraph_open = (tokens, idx, options, env, self) => {
        addClass(tokens[idx], 'govuk-body');
        return paragraphOpen(tokens, idx, options, env, self);
      };

      const linkOpen = defaultRender('link_open');
      md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        addClass(tokens[idx], 'govuk-link');
        return linkOpen(tokens, idx, options, env, self);
      };

      const bulletListOpen = defaultRender('bullet_list_open');
      md.renderer.rules.bullet_list_open = (tokens, idx, options, env, self) => {
        addClass(tokens[idx], 'govuk-list govuk-list--bullet');
        return bulletListOpen(tokens, idx, options, env, self);
      };

      const orderedListOpen = defaultRender('ordered_list_open');
      md.renderer.rules.ordered_list_open = (tokens, idx, options, env, self) => {
        addClass(tokens[idx], 'govuk-list govuk-list--number');
        return orderedListOpen(tokens, idx, options, env, self);
      };

      const tableOpen = defaultRender('table_open');
      md.renderer.rules.table_open = (tokens, idx, options, env, self) => {
        addClass(tokens[idx], 'govuk-table');
        return tableOpen(tokens, idx, options, env, self);
      };

      const thOpen = defaultRender('th_open');
      md.renderer.rules.th_open = (tokens, idx, options, env, self) => {
        addClass(tokens[idx], 'govuk-table__header');
        return thOpen(tokens, idx, options, env, self);
      };

      const tdOpen = defaultRender('td_open');
      md.renderer.rules.td_open = (tokens, idx, options, env, self) => {
        addClass(tokens[idx], 'govuk-table__cell');
        return tdOpen(tokens, idx, options, env, self);
      };

      const trOpen = defaultRender('tr_open');
      md.renderer.rules.tr_open = (tokens, idx, options, env, self) => {
        addClass(tokens[idx], 'govuk-table__row');
        return trOpen(tokens, idx, options, env, self);
      };

      const blockquoteOpen = defaultRender('blockquote_open');
      md.renderer.rules.blockquote_open = (tokens, idx, options, env, self) => {
        addClass(tokens[idx], 'govuk-inset-text');
        return blockquoteOpen(tokens, idx, options, env, self);
      };
    }
  },
  vite: {
    build: {
      cssMinify: false
    }
  },
  themeConfig: {
    appearance: false,
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        translations: {
          button: {
            buttonText: 'Search Guide',
            buttonAriaLabel: 'Search guide'
          }
        }
      }
    }
  },
  head: [
    ['meta', { name: 'theme-color', content: '#1d70b8' }],
    ['link', { rel: 'icon', href: withBasePath('/assets/images/favicon.svg'), type: 'image/svg+xml' }],
    ['link', { rel: 'shortcut icon', href: withBasePath('/assets/images/favicon.ico'), type: 'image/x-icon' }],
    ['link', { rel: 'apple-touch-icon', href: withBasePath('/assets/images/govuk-icon-180.png') }],
    ['link', { rel: 'mask-icon', href: withBasePath('/assets/images/govuk-icon-mask.svg'), color: '#1d70b8' }]
  ]
};
