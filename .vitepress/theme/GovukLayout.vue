<script setup>
import { Content, useData, useRoute, withBase } from 'vitepress';
import { VPNavBarSearch } from 'vitepress/theme';
import { computed } from 'vue';
import { flatDocs, sections, serviceNav } from './navigation';

const route = useRoute();
const { page, site } = useData();

const normalise = value => {
  const withoutHtml = value.replace(/\.html$/, '');
  const withoutTrailingSlash = withoutHtml.replace(/\/$/, '');
  return withoutTrailingSlash || '/';
};

const stripBase = value => {
  const base = (site.value.base || '/').replace(/\/$/, '');
  if (!base) {
    return value;
  }
  if (value === base) {
    return '/';
  }
  return value.startsWith(`${base}/`) ? value.slice(base.length) : value;
};

const currentPath = computed(() => normalise(stripBase(route.path)));
const isHome = computed(() => currentPath.value === '/');
const isNotFound = computed(() => currentPath.value === '/404' || page.value.isNotFound);

const currentPageIndex = computed(() =>
  flatDocs.findIndex(item => normalise(item.href) === currentPath.value)
);

const currentPage = computed(() =>
  currentPageIndex.value >= 0 ? flatDocs[currentPageIndex.value] : null
);

const previousPage = computed(() =>
  currentPageIndex.value > 0 ? flatDocs[currentPageIndex.value - 1] : null
);

const nextPage = computed(() =>
  currentPageIndex.value >= 0 && currentPageIndex.value < flatDocs.length - 1
    ? flatDocs[currentPageIndex.value + 1]
    : null
);

const breadcrumbs = computed(() => {
  if (isHome.value || !currentPage.value) {
    return [];
  }

  return [
    { text: 'Home', href: '/' },
    { text: currentPage.value.section, href: sections.find(section => section.text === currentPage.value.section)?.items[0].href },
    { text: currentPage.value.text }
  ];
});

const pageHeaders = computed(() =>
  (page.value.headers || []).filter(header => header.level === 2)
);

const isActive = href => normalise(href) === currentPath.value;

const isServiceNavActive = href => {
  const target = normalise(href);
  if (target === '/') {
    return currentPath.value === '/';
  }
  return currentPath.value === target || currentPath.value.startsWith(`${target}/`);
};
</script>

<template>
  <a href="#main-content" class="govuk-skip-link" data-module="govuk-skip-link">Skip to main content</a>

  <header class="govuk-header">
    <div class="govuk-header__container govuk-width-container">
      <div class="govuk-header__logo">
        <a :href="withBase('/')" class="govuk-header__homepage-link">
          <svg
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 324 60"
            height="30"
            width="162"
            fill="currentcolor"
            class="govuk-header__logotype"
            aria-label="GOV.UK"
          >
            <title>GOV.UK</title>
            <g>
              <circle cx="20" cy="17.6" r="3.7" />
              <circle cx="10.2" cy="23.5" r="3.7" />
              <circle cx="3.7" cy="33.2" r="3.7" />
              <circle cx="31.7" cy="30.6" r="3.7" />
              <circle cx="43.3" cy="17.6" r="3.7" />
              <circle cx="53.2" cy="23.5" r="3.7" />
              <circle cx="59.7" cy="33.2" r="3.7" />
              <circle cx="31.7" cy="30.6" r="3.7" />
              <path
                d="M33.1 9.8c.2-.1.3-.3.5-.5l4.6 2.4V4.9l-4.6 1.5c-.1-.2-.3-.3-.5-.5L35 0h-6.7l1.9 5.9c-.2.1-.3.3-.5.5l-4.6-1.5v6.8l4.6-2.4c.1.2.3.3.5.5l-2.6 8c-.9 2.8 1.2 5.7 4.1 5.7 3 0 5.1-2.9 4.1-5.7l-2.7-8ZM37 37.9s-3.4 3.8-4.1 6.1c2.2 0 4.2-.5 6.4-2.8l-.7 8.5c-2-2.8-4.4-4.1-5.7-3.8.1 3.1.5 6.7 5.8 7.2 3.7.3 6.7-1.5 7-3.8.4-2.6-2-4.3-3.7-1.6-1.4-4.5 2.4-6.1 4.9-3.2-1.9-4.5-1.8-7.7 2.4-10.9 3 4 2.6 7.3-1.2 11.1 2.4-1.3 6.2 0 4 4.6-1.2-2.8-3.7-2.2-4.2.2-.3 1.7.7 3.7 3 4.2 1.9.3 4.7-.9 7-5.9-1.3 0-2.4.7-3.9 1.7l2.4-8c.6 2.3 1.4 3.7 2.2 4.5.6-1.6.5-2.8 0-5.3l5 1.8c-2.6 3.6-5.2 8.7-7.3 17.5-7.4-1.1-15.7-1.7-24.5-1.7-8.8 0-17.1.6-24.5 1.7-2.1-8.9-4.7-13.9-7.3-17.5l5-1.8c-.5 2.5-.6 3.7 0 5.3.8-.8 1.6-2.3 2.2-4.5l2.4 8c-1.5-1-2.6-1.7-3.9-1.7 2.3 5 5.2 6.2 7 5.9 2.3-.4 3.3-2.4 3-4.2-.5-2.4-3-3.1-4.2-.2-2.2-4.6 1.6-6 4-4.6-3.7-3.7-4.2-7.1-1.2-11.1 4.2 3.2 4.3 6.4 2.4 10.9 2.5-2.8 6.3-1.3 4.9 3.2-1.8-2.7-4.1-1-3.7 1.6.3 2.3 3.3 4.1 7 3.8 5.4-.5 5.7-4.2 5.8-7.2-1.3-.2-3.7 1-5.7 3.8l-.7-8.5c2.2 2.3 4.2 2.7 6.4 2.8-.7-2.3-4.1-6.1-4.1-6.1H37Z"
              />
            </g>
            <circle class="govuk-logo-dot" cx="226" cy="36" r="7.3" />
            <path d="M93.94 41.25c.4 1.81 1.2 3.21 2.21 4.62 1 1.4 2.21 2.41 3.61 3.21s3.21 1.2 5.22 1.2 3.61-.4 4.82-1c1.4-.6 2.41-1.4 3.21-2.41.8-1 1.4-2.01 1.61-3.01s.4-2.01.4-3.01v.14h-10.86v-7.02h20.07v24.08h-8.03v-5.56c-.6.8-1.38 1.61-2.19 2.41-.8.8-1.81 1.2-2.81 1.81-1 .4-2.21.8-3.41 1.2s-2.41.4-3.81.4a18.56 18.56 0 0 1-14.65-6.63c-1.6-2.01-3.01-4.41-3.81-7.02s-1.4-5.62-1.4-8.83.4-6.02 1.4-8.83a20.45 20.45 0 0 1 19.46-13.65c3.21 0 4.01.2 5.82.8 1.81.4 3.61 1.2 5.02 2.01 1.61.8 2.81 2.01 4.01 3.21s2.21 2.61 2.81 4.21l-7.63 4.41c-.4-1-1-1.81-1.61-2.61-.6-.8-1.4-1.4-2.21-2.01-.8-.6-1.81-1-2.81-1.4-1-.4-2.21-.4-3.61-.4-2.01 0-3.81.4-5.22 1.2-1.4.8-2.61 1.81-3.61 3.21s-1.61 2.81-2.21 4.62c-.4 1.81-.6 3.71-.6 5.42s.8 5.22.8 5.22Zm57.8-27.9c3.21 0 6.22.6 8.63 1.81 2.41 1.2 4.82 2.81 6.62 4.82S170.2 24.39 171 27s1.4 5.62 1.4 8.83-.4 6.02-1.4 8.83-2.41 5.02-4.01 7.02-4.01 3.61-6.62 4.82-5.42 1.81-8.63 1.81-6.22-.6-8.63-1.81-4.82-2.81-6.42-4.82-3.21-4.41-4.01-7.02-1.4-5.62-1.4-8.83.4-6.02 1.4-8.83 2.41-5.02 4.01-7.02 4.01-3.61 6.42-4.82 5.42-1.81 8.63-1.81Zm0 36.73c1.81 0 3.61-.4 5.02-1s2.61-1.81 3.61-3.01 1.81-2.81 2.21-4.41c.4-1.81.8-3.61.8-5.62 0-2.21-.2-4.21-.8-6.02s-1.2-3.21-2.21-4.62c-1-1.2-2.21-2.21-3.61-3.01s-3.21-1-5.02-1-3.61.4-5.02 1c-1.4.8-2.61 1.81-3.61 3.01s-1.81 2.81-2.21 4.62c-.4 1.81-.8 3.61-.8 5.62 0 2.41.2 4.21.8 6.02.4 1.81 1.2 3.21 2.21 4.41s2.21 2.21 3.61 3.01c1.4.8 3.21 1 5.02 1Zm36.32 7.96-12.24-44.15h9.83l8.43 32.77h.4l8.23-32.77h9.83L200.3 58.04h-12.24Zm74.14-7.96c2.18 0 3.51-.6 3.51-.6 1.2-.6 2.01-1 2.81-1.81s1.4-1.81 1.81-2.81a13 13 0 0 0 .8-4.01V13.9h8.63v28.15c0 2.41-.4 4.62-1.4 6.62-.8 2.01-2.21 3.61-3.61 5.02s-3.41 2.41-5.62 3.21-4.62 1.2-7.02 1.2-5.02-.4-7.02-1.2c-2.21-.8-4.01-1.81-5.62-3.21s-2.81-3.01-3.61-5.02-1.4-4.21-1.4-6.62V13.9h8.63v26.95c0 1.61.2 3.01.8 4.01.4 1.2 1.2 2.21 2.01 2.81.8.8 1.81 1.4 2.81 1.81 0 0 1.34.6 3.51.6Zm34.22-36.18v18.92l15.65-18.92h10.82l-15.03 17.32 16.03 26.83h-10.21l-11.44-20.21-5.62 6.22v13.99h-8.83V13.9" />
          </svg>
          <span class="govuk-header__product-name">Home Office Forms Guide</span>
        </a>
      </div>
      <div class="govuk-header__content app-header-search">
        <VPNavBarSearch />
      </div>
    </div>
  </header>

  <section class="govuk-service-navigation" data-module="govuk-service-navigation" aria-label="Service information">
    <div class="govuk-width-container">
      <div class="govuk-service-navigation__container">
        <nav aria-label="Menu" class="govuk-service-navigation__wrapper">
          <button
            type="button"
            class="govuk-service-navigation__toggle govuk-js-service-navigation-toggle"
            aria-controls="navigation"
            hidden
            aria-hidden="true"
          >
            Menu
          </button>
          <ul id="navigation" class="govuk-service-navigation__list">
            <li
              v-for="item in serviceNav"
              :key="item.href"
              class="govuk-service-navigation__item"
              :class="{ 'govuk-service-navigation__item--active': isServiceNavActive(item.href) }"
            >
              <a
                class="govuk-service-navigation__link"
                :href="withBase(item.href)"
                :aria-current="isServiceNavActive(item.href) ? 'true' : undefined"
              >
                <strong v-if="isServiceNavActive(item.href)" class="govuk-service-navigation__active-fallback">
                  {{ item.text }}
                </strong>
                <template v-else>{{ item.text }}</template>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>

  <div class="govuk-width-container">
    <div class="govuk-phase-banner">
      <p class="govuk-phase-banner__content">
        <strong class="govuk-tag govuk-phase-banner__content__tag">Beta</strong>
        <span class="govuk-phase-banner__text">
          This guide is being redesigned against the current HOF framework implementation.
        </span>
      </p>
    </div>

    <nav v-if="breadcrumbs.length" class="govuk-breadcrumbs" aria-label="Breadcrumb">
      <ol class="govuk-breadcrumbs__list">
        <li v-for="crumb in breadcrumbs" :key="crumb.text" class="govuk-breadcrumbs__list-item">
          <a v-if="crumb.href" class="govuk-breadcrumbs__link" :href="withBase(crumb.href)">{{ crumb.text }}</a>
          <span v-else>{{ crumb.text }}</span>
        </li>
      </ol>
    </nav>
  </div>

  <main id="main-content" class="govuk-main-wrapper">
    <div class="govuk-width-container">
      <Content v-if="isHome" class="app-prose app-prose--home" />

      <div v-else-if="isNotFound" class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
          <h1 class="govuk-heading-xl">Page not found</h1>
          <p class="govuk-body">If you typed the web address, check it is correct.</p>
          <p class="govuk-body">If you pasted the web address, check you copied the entire address.</p>
          <p class="govuk-body">
            If the web address is correct or you selected a link or button,
            <a class="govuk-link" :href="withBase('/')">return to the HOF Guide home page</a>.
          </p>
        </div>
      </div>

      <div v-else class="govuk-grid-row">
        <aside class="govuk-grid-column-one-quarter app-doc-nav" aria-label="Documentation navigation">
          <nav>
            <h2 class="govuk-heading-s">Documentation</h2>
            <div v-for="section in sections" :key="section.text" class="app-doc-nav__section">
              <h3 class="govuk-heading-s app-doc-nav__heading">{{ section.text }}</h3>
              <ul class="govuk-list app-doc-nav__list">
                <li v-for="item in section.items" :key="item.href" class="app-doc-nav__item">
                  <a
                    class="govuk-link app-doc-nav__link"
                    :class="{ 'app-doc-nav__link--active': isActive(item.href) }"
                    :href="withBase(item.href)"
                  >
                    {{ item.text }}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        <div class="govuk-grid-column-three-quarters">
          <Content class="app-prose" />

          <nav
            v-if="previousPage || nextPage"
            class="govuk-pagination govuk-pagination--block"
            role="navigation"
            aria-label="Pagination"
          >
            <div v-if="previousPage" class="govuk-pagination__prev">
              <a class="govuk-link govuk-pagination__link" :href="withBase(previousPage.href)" rel="prev">
                <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                  <path d="m6.55 0 1.4 1.4-4.05 4.05H15v2H3.9l4.05 4.05-1.4 1.4L0 6.45z" />
                </svg>
                <span class="govuk-pagination__link-title">
                  Previous<span class="govuk-visually-hidden"> page</span>
                </span>
                <span class="govuk-pagination__link-label">{{ previousPage.text }}</span>
              </a>
            </div>
            <div v-if="nextPage" class="govuk-pagination__next">
              <a class="govuk-link govuk-pagination__link" :href="withBase(nextPage.href)" rel="next">
                <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                  <path d="m8.45 0-1.4 1.4 4.05 4.05H0v2h11.1l-4.05 4.05 1.4 1.4L15 6.45z" />
                </svg>
                <span class="govuk-pagination__link-title">
                  Next<span class="govuk-visually-hidden"> page</span>
                </span>
                <span class="govuk-pagination__link-label">{{ nextPage.text }}</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </main>

  <footer class="govuk-footer">
    <div class="govuk-width-container">
      <div class="govuk-footer__meta">
        <div class="govuk-footer__meta-item govuk-footer__meta-item--grow">
          <h2 class="govuk-visually-hidden">Support links</h2>
          <ul class="govuk-footer__inline-list">
            <li class="govuk-footer__inline-list-item">
              <a class="govuk-footer__link" :href="withBase('/contributing/documentation-standards')">
                Documentation standards
              </a>
            </li>
            <li class="govuk-footer__inline-list-item">
              <a class="govuk-footer__link" :href="withBase('/operations/troubleshooting')">
                Troubleshooting
              </a>
            </li>
          </ul>
          <span class="govuk-footer__licence-description">
            Documentation aligned to the HOF framework source code. Content is available under the
            <a class="govuk-footer__link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license">
              Open Government Licence v3.0
            </a>, except where otherwise stated.
          </span>
        </div>
        <div class="govuk-footer__meta-item">
          <a
            class="govuk-footer__link govuk-footer__copyright-logo"
            href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
          >
            © Crown copyright
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
