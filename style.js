// ==UserScript==
// @name            PlumFont - Replace Roboto, Segoe UI, Arial, and other fonts
// @name:en         PlumFont - Replace Roboto, Segoe UI, Arial, and other fonts
// @name:zh-Hans    梅花 - 替换掉 Roboto、Segoe UI 等字体
// @name:zh-Hant    梅花 - 替換掉 Roboto、Segoe UI 等字體
// @name:ja         梅花 - Roboto、Segoe UI などのフォントを置き換える
// @name:ko         PlumFont - Roboto, Segoe UI, Arial 및 기타 글꼴 교체
// @name:ru         PlumFont - заменить Roboto, Segoe UI, Arial и другие шрифты
// @name:de         PlumFont - Ersetzen Sie Roboto, Segoe UI, Arial und andere Schriftarten
// @name:fr         PlumFont - Remplacez Roboto, Segoe UI, Arial et autres polices
// @name:es         PlumFont - Reemplace Roboto, Segoe UI, Arial y otras fuentes
// @name:it         PlumFont - Sostituisci Roboto, Segoe UI, Arial e altri font
// @name:pt         PlumFont - Substitua Roboto, Segoe UI, Arial e outras fontes
// @name:vi         PlumFont - Thay thế Roboto, Segoe UI, Arial và các phông chữ khác
// @name:tr         PlumFont - Roboto, Segoe UI, Arial ve diğer yazı tiplerini değiştirin
// @name:ar         PlumFont - استبدل Roboto و Segoe UI و Arial والخطوط الأخرى
// @name:uk         PlumFont - замінити Roboto, Segoe UI, Arial та інші шрифти
// @name:hi         PlumFont - Roboto, Segoe UI, Arial और अन्य फ़ॉन्ट बदलें
// @name:bn         PlumFont - Roboto, Segoe UI, Arial এবং অন্যান্য ফন্ট পরিবর্তন করুন
// @name:ms         PlumFont - Ganti Roboto, Segoe UI, Arial dan fon lain
// @name:id         PlumFont - Ganti Roboto, Segoe UI, Arial, dan font lainnya
// @name:th         PlumFont - เปลี่ยน Roboto, Segoe UI, Arial และฟอนต์อื่น ๆ
// @name:fil        PlumFont - Palitan ang Roboto, Segoe UI, Arial, at iba pang mga font

// @version         1.1.6
// @description     将网页的字体替换为你更喜欢的字体。停止使用 Segoe UI、Arial 与微软雅黑。将英文数字使用苹方的字体替换为 SF Pro 与 Inter。
// @author          Fibert Loyee
// @run-at          document-start
// @match           https://*.zhihu.com/*
// @match           https://*github.com/*
// @match           https://www.notion.so/*
// @match           https://*.bilibili.com/*
// @match           https://*.googlesource.com/*
// @match           https://*.google.com/*
// @match           https://*.google.com.*/*
// @match           https://*.python.org/*
// @match           https://*.youtube.com/*
// @match           https://docs.flutter.dev/*
// @match           https://*.chaoxing.com/*
// @match           https://dev.to/*
// @match           https://medium.com/*
// @match           https://www.reddit.com/*
// @match           https://juejin.cn/*
// @match           https://tauri.app/*
// @match           https://www.quora.com/*
// @match           https://vuejs.org/*
// @match           https://mybatis.org/*
// @match           https://grpc.io/*
// @match           https://*.chrome.com/*
// @match           https://web.dev/*
// @match           https://developer.android.com/*
// @match           https://huggingface.co/*
// @match           https://www.ithome.com/*
// @match           https://google.github.io/*
// @match           https://doc.rust-lang.org/*
// @match           https://www.infoq.cn/*
// @match           https://www.pixiv.net/*
// @match           https://gin-gonic.com/*
// @match           https://v2ex.com/*
// @match           https://*.vuejs.org/*
// @match           https://*.d2l.ai/*
// @match           https://course.rs/*
// @match           https://*.typescriptlang.org/*
// @match           https://*.authing.cn/*
// @match           https://gopl-zh.github.io/*
// @match           https://go.dev/*
// @match           https://typeorm.io/*
// @match           https://gorm.io/*
// @match           http://fxshu.top/*
// @match           http://fxshw.cc/*
// @match           https://*.cloudflare.com/*
// @match           https://*.loro.dev/*
// @match           https://www.upwork.com/*
// @match           https://stackoverflow.com/*
// @match           https://*.gofiber.io/*
// @match           https://*newsminimalist.com/*
// @match           https://*.tauri.app/*
// @match           https://docs.rs/*
// @match           https://orm.drizzle.team/*

// @namespace    PlumFont
// @license      MIT
// @downloadURL  https://raw.githubusercontent.com/bamboo512/PlumFont/main/style.js

// ==/UserScript==

const globalMonoFont = `ui-monospace, "SF Mono", "Google Sans Mono", "JetBrains Mono","Roboto Mono", "Noto Color Emoji", monospace`;
const globalSansFont = `ui-sans-serif, -apple-system, BlinkMacSystemFont, "Inter", "Inter Variable",'Segoe UI Variable Display','Google Sans Text', 'PingFang SC', "思源黑体", "Noto Sans CJK SC", "Noto Color Emoji", sans-serif`;
const googleSansFont = `'Google Sans Text', "Inter", "Inter Variable", ui-sans-serif, -apple-system, BlinkMacSystemFont,'Segoe UI Variable Display', "PingFang SC", "Source Han Sans SC", "Noto Sans CJK SC", "Noto Color Emoji", sans-serif`;
const googleSansDisplayFont = `'Google Sans', 'Google Sans Display', "Inter", "Inter Variable", ui-sans-serif, -apple-system, BlinkMacSystemFont,'Segoe UI Variable Display', "PingFang SC", "Source Han Sans SC", "Noto Sans CJK SC", "Noto Color Emoji", sans-serif`;
const googleMonoFont = `"Google Sans Mono", "SF Mono", "JetBrains Mono", "Roboto Mono", ui-monospace, "Noto Color Emoji", monospace`;
const globalSerifFont = `ui-serif, "New York","Noto Serif", "思源宋体 VF", "思源宋体", "思源宋体 CN VF", "思源宋体 CN", "Noto Color Emoji", serif`;

const domain = window.location.host;
console.log(domain);

/** Judge which language is used */
let lang = "zh-CN";
function judgeLanguage() {
  lang = document.documentElement.lang;
  if (lang === undefined) {
    lang = window.navigator.language;
  }
}
function judgePlatform() {
  let platform = "Not known";
  if (navigator.appVersion.indexOf("Win") !== -1) platform = "Windows";
  if (navigator.appVersion.indexOf("Mac") !== -1) platform = "macOS";
  if (navigator.appVersion.indexOf("X11") !== -1) platform = "UNIX";
  if (navigator.appVersion.indexOf("Linux") !== -1) platform = "Linux";
  return platform;
}

judgeLanguage();

const styleList = {
  general: `
        html,body, input, textarea, select, button,h1,h2,h3,h4,h5,h6,b, strong{
            font-family: ${globalSansFont} !important;
        }

        code,pre{
            font-family: ${globalMonoFont} !important;
        } `,
  github: `
        body {
            font-family:${googleSansFont} !important;
        }

        .markdown-body, .f0-mktg, .f1-mktg, .f2-mktg, .f3-mktg, .f4-mktg, .f5-mktg, .f6-mktg {
            font-family:${googleSansFont} !important;
        } `,

  notion: `
        .notion-app-inner,.notion-selectable, .notion-page-block, div[placeholder*='Heading'] {
            font-family:  ${globalSansFont} !important;
        }

        span[spellcheck='false'], div[spellcheck='false']{
            font-family: ${globalMonoFont} !important;
        }`,
  bilibili: `
        /* 用户详情页中，"主页、动态、投稿、合计和列表" 后的数字 字体 */
        .n .n-num{
            font-family:${googleSansFont}
        }
        .user-info .info-content .info-value[data-v-32ccf620]{   /* 用户详情页中，右下角 "个人资料 UID" 部分的字体 */
            font-family:${googleSansFont};
        }
        div {
            font-family:  ${googleSansFont} !important;
        }

        /* 首页 - 视频标题 */
        .bili-video-card .bili-video-card__info--tit>a {
            font-family:  ${googleSansFont} !important;
        }

        /*  视频标题  */
        .video-info-v1 .video-title{
            font-family:  ${googleSansFont} !important;
        }

        /* ‘评论’ 标题 */
        .reply-header .reply-navigation .nav-bar .nav-title .nav-title-text[data-v-4ccb5ad5]{
            font-family:  ${googleSansFont} !important;
        }

        /*  评论数字计数和评论内容  */
        .bili-comment.browser-pc *{
            font-family:  ${googleSansFont} !important;
        }

        /* 视频详情页 - 右侧推荐视频标题 */
        .video-page-card-small .card-box .info .title{
            font-family:  ${googleSansFont} !important;
        }

        /* 视频字幕 */
        .bpx-player-subtitle-panel-text{
            font-family: ${googleSansFont} !important;
        }

        `,
  googleSource: `
        .u-monospace {
            font-family: ${globalMonoFont} !important;
        }

        .Site {
            font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Google Sans Text","Inter", "Segoe UI Variable Display","Apple Color Emoji", sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"!important;
        } `,
  google: `
        .gsfi, .lst,.gb_2a:not(.gb_Xd),.YrbPuc, .qHx7jd,.wHYlTd, h1, h2, h3, h4, h5, h6, body, .gb_ne, .ynRric, .wwUB2c, .lh87ke:link, .lh87ke:visited, .sbdb, .kpbb, .kpgrb, .ksb, .OouJcb, .rzG2be, .gb_oe,.gb_gd,.gb_ld, .kno-ecr-pt,.ynRric,.mus_tt8,.g,body,html,input,.std{
            font-family: ${googleSansFont} !important;
        }

        /* Pop-over - Personal Info After Clicking Avatar */
        .ZnExKf, .zpoCob{
            font: 400 12px/16px ${googleSansFont} !important;
        }


        /* Video Search Result */
        .WU6Mge {
            font-family: ${googleSansDisplayFont} !important;
        }
        .Z1UVNe, .N2M7ie, .ZkkK1e.ZkkK1e, .NJU16b{
            font-family: ${googleSansFont} !important;
        }


        /* Shopping */
        .aULzUe, .bONr3b, .sh-sp__pswtr, .iXEZD{
            font-family: ${googleSansFont} !important;
        }


        /* search result Counts */
        #result-stats{
        font-family: ${googleSansFont} !important;
        }

        /* Search Bar */
        textarea {
            font-family: ${googleSansFont} !important;
        }

        .gb_Ed{
            font-family: ${googleSansFont} !important;
        }

        /* Search ToolBar */
        .GLcBOb{
            font-family: ${googleSansFont} !important;
        }


        /* Related Search Item */
        .e9EfHf{
            font-family: ${googleSansFont} !important;
        }

        /* Settings */
        .q0yked{
            font-family: ${googleSansFont} !important;
        }

        body{
            font-family: ${googleSansFont} !important;
        }
        pre, code, kbd, samp{
            font-family: ${globalMonoFont} !important;
        }

        .chr-copy {
            font-family: ${googleSansFont} !important;
        }

        .ApHyTb, .iAIpCb, .ZFiwCf, .HJSKzf, .gb_M, .o6OF0 .HrUlUc, .o6OF0 .PnfqLc, .Vlt3wb, .vk_h, .vk_sh, .Uekwlc, .IFvyDb.hb8SAc, .IVvPP .zloOqf, #rhs .ss6qqb .zloOqf, .C0mf1d, .HmPpvd, .eUOBKb, .tNxQIb, .gb_Da, .gb_Fd, .gb_0d:not(.gb_ne), .gb_L, .VwiC3b {
            font-family: ${googleSansFont} !important;
        }

        .IFnjPb, .pb3iw, .EyiEYb {
            font-family: ${googleSansDisplayFont} !important;
        }

        `,

  youtube: `
        html,body,
        .ytd-rich-grid-media,
        .ytd-video-meta-block,
        .ytd-active-account-header-renderer,
        .ytd-compact-link-renderer,
        tp-yt-paper-item,
        .ytd-video-renderer,
        .ytd-compact-video-renderer,
        .html5-video-player,
        .ytd-video-secondary-info-renderer,
        .ytp-caption-segment {
            font-family:${googleSansFont} !important;
        }

        /*  aria-label  */
        button[aria-label]:focus:after,
        button[aria-label]:hover:after{
            font-family:${googleSansFont} !important;
        }

        /*  Channel - Text Above Banner */
        #primary-links.ytd-c4-tabbed-header-renderer yt-formatted-string.ytd-c4-tabbed-header-renderer{
            font-family:${googleSansFont} !important;

        }
        /*  Channel - Section Title  */
        tp-yt-paper-tab{
            font-family:${googleSansFont} !important;
        }


        /* Logo - Country Short Name */
        .ytd-topbar-logo-renderer{
            font-family:${googleSansFont} !important;
        }

        /*  Short Video Title */
        #video-title.ytd-rich-grid-slim-media{
            font-family:${googleSansFont} !important;
        }


        /*  Sidebar - Title  */
        .title.ytd-guide-entry-renderer{
            font-family:${googleSansFont} !important;
        }


        /*  Copyright  */
        #copyright{
            font-family:${googleSansFont} !important;
        }


        /* Explore - Title */
        .ytd-destination-button-renderer{
            font-family:${googleSansFont} !important;
        }

        /* Explore - New Creator - 创作者新秀 */
        .ytd-shelf-renderer{
            font-family:${googleSansFont} !important;
        }

        /* Explorer - New Creator - Video Title */
        .ytd-grid-video-renderer{
            font-family:${googleSansFont} !important;
        }


        /* Shorts - Title */
        .title.ytd-reel-player-header-renderer{
            font-family:${googleSansFont} !important;
        }
        /* Shorts - Author/Channel Name */
        #channel-name.ytd-reel-player-header-renderer{
            font-family:${googleSansFont} !important;
        }

        /* Shorts - Subscribe Button  */
        tp-yt-paper-button{
            font-family:${googleSansFont} !important;
        }

        /* Shorts - Comment Title & Comments Number */
        .ytd-engagement-panel-title-header-renderer{
            font-family:${googleSansFont} !important;
        }

        /* Shorts - Comment Input Box */
        .ytd-comment-simplebox-renderer{
            font-family:${googleSansFont} !important;
        }

        /* Shorts - Comment Author Name */
        tp-yt-paper-dialog{
            font-family:${googleSansFont} !important;
        }


        /*  Comment - Pinned Comment Badge  */
        ytd-pinned-comment-badge-renderer{
            font-family:${googleSansFont} !important;
        }

        /*  Comment - Comment Time  */
        .published-time-text.ytd-comment-renderer{
            font-family:${googleSansFont} !important;
        }

        /*  Comment Content  */
        #content-text.ytd-comment-renderer{
            font-family:${googleSansFont} !important;
        }

        /*  Comment - Upvote Number  */
        #vote-count-middle.ytd-comment-action-buttons-renderer{
            font-family: ${googleSansFont} !important;
        }

        /*  Comment - Reply Button  */
        ytd-comment-action-buttons-renderer:not([use-comment-icon]) #reply-button.ytd-comment-action-buttons-renderer ytd-button-renderer.ytd-comment-action-buttons-renderer:not([is-icon-button]).ytd-comment-action-buttons-renderer, ytd-comment-action-buttons-renderer:not([use-comment-icon]) #reply-button-end.ytd-comment-action-buttons-renderer ytd-button-renderer.ytd-comment-action-buttons-renderer:not([is-icon-button]).ytd-comment-action-buttons-renderer{
            font-family: ${googleSansFont} !important;
        }

        /* Comment - Reply Number  */
        #expander.ytd-comment-replies-renderer{
            font-family: ${googleSansFont} !important;
        }


        /*  Channel - Featured Channel  */
        .ytd-grid-channel-renderer{
            font-family:${googleSansFont} !important;
        }

        /* Channel - About  */
        .ytd-channel-about-metadata-renderer{
            font-family:${googleSansFont} !important;
        }


        /* Notification - Title  */
        .message.ytd-notification-renderer{
            font-family: ${googleSansFont} !important;
        }

        /* Notification - Time  */
        .metadata.ytd-notification-renderer{
            font-family: ${googleSansFont} !important;
        }


        /* Settings - Page Introduction - H1: Name & Title & Text  */
        .ytd-page-introduction-renderer{
            font-family: ${googleSansFont} !important;
        }

        /* Settings - H2: Settings Section Title & Description  */
        .ytd-item-section-header-renderer {
            font-family: ${googleSansFont} !important;
        }

        /* Setting - H3: Options Title & Text */
        .ytd-settings-options-renderer{
            font-family: ${googleSansFont} !important;
        }

        /* Settings - H4: Settings Item Title & Description  */
        .ytd-settings-switch-renderer {
            font-family: ${googleSansFont} !important;
        }

        /* Settings - Channel  */
        .ytd-channel-options-renderer{
            font-family: ${googleSansFont} !important;
        }

        /* Settings - Connected App  */
        .ytd-connected-app-renderer{
            font-family: ${googleSansFont} !important;
        }

        /* Settings - Advanced Settings - YouTube ID  */
        .yt-copy-link-renderer{
            font-family: ${googleMonoFont} !important;
        }


        /*  Others
            Dropdown Menu,
            Radio Option,
            Right Click Menu
            Input Box,
            Alert with Button,
            Message,
            Icon Button,
         */
        .ytd-dropdown-item-renderer,
        .ytd-settings-radio-option-renderer,
        .ytd-menu-service-item-renderer,
        input,
        .ytd-alert-with-button-renderer,
        .ytd-message-renderer,
        .yt-icon-button,
         {
            font-family: ${googleSansFont} !important;
        }


        /* Visit History - History Filter Title */
        .ytd-sub-feed-selector-renderer{
            font-family: ${googleSansFont} !important;
        }

        /* Visit History - Community History Title & Timestamp */
        .ytd-comment-history-entry-renderer{
            font-family: ${googleSansFont} !important;
        }


        /* Your Films - Page Introduction */
        #subscriber-count.ytd-c4-tabbed-header-renderer{
            font-family: ${googleSansFont} !important;
        }

        /* Your Films - Video Title & Category & Timestamp */
        .ytd-grid-movie-renderer{
            font-family: ${googleSansFont} !important;
        }


        /* Media Library - Page Title & Playlist Owner */
        .ytd-playlist-sidebar-primary-info-renderer,
        .ytd-video-owner-renderer {
            font-family: ${googleSansFont} !important;
        }

        /* Playlist - Video Title & Timestamp */
        .ytd-playlist-video-renderer,
        .ytd-grid-playlist-renderer {
            font-family: ${googleSansFont} !important;
        }

        /* Voice Search */
        .ytd-voice-search-dialog-renderer{
            font-family: ${googleSansFont} !important;
        }

            `,

  "dev.to": `

        :root{
            --ff-sans-serif: ${globalSansFont} !important;
            --ff-monospace: ${globalMonoFont} !important;
            --ff-serif: ${globalSerifFont} !important;
        }

        `,
  medium: `
        .a,.bv,.bc {
            font-family:${globalSansFont} !important;
        } `,
  reddit: `
        body,
        ._292iotee39Lmt0MkQZ2hPV,
        ._2ucWAzao-GLL6qRJ4USwVJ,
        ._1zPvgKHteTOub9dKkvrOl4,
        ._3Eyh3vRo5o4IfzVZXhaWAG,
        ._2baJGEALPiEMZpWB2iWQs7 .public-DraftEditor-content,
        ._1ra1vBLrjtHjhYDZ_gOy8F,
        ._2tU8R9NTqhvBrhoNAXWWcP,
        ._10BQ7pjWbeYP63SAPNS8Ts,
        ._6_44iTtZoeY6_XChKt5b0,
        ._3zbhtNO0bdck0oYbYRhjMC,
        ._10BQ7pjWbeYP63SAPNS8Ts,
        ._1sDtEhccxFpHDn2RUhxmSq,
        ._34dh2eyzMvJfjCBLeoWiDD {
            font-family: ${globalSansFont} !important;
        } `,
  juejin: `
        body, html, .markdown-body{
        font-family: ${globalSansFont} !important;
        }
        .markdown-body pre, .markdown-body code, code, pre {
        font-family: ${globalMonoFont} !important;
        } `,
  "grpc.io": `
        .td-search-input{
        font-family: "Font Awesome 5 Free", ${globalSansFont} !important;
        } `,
  "developer.chrome.com": `
        .banner, .material-button, .skip-link, .toc__wrapper a, .type, .type ol:not([class])>li::before, .type--caption, .type--label, .type--small, :root{
            font-family: ${googleSansFont} !important;
        }
        .type code, .type pre{
            font-family: ${googleMonoFont} !important;
        }
    `,
  "web.dev": `
        body{
            font-family: ${googleSansFont} !important;
        }
        code {
            font-family: ${googleMonoFont} !important;
        }
    `,
  "developer.android.com": `
        :root{
            --devsite-primary-font-family: ${googleSansFont} !important;
            --devsite-code-font-family: ${googleMonoFont} !important;
        }
    `,
  "infoq.cn": `
        html, body, button, input, select, textarea{
            font-family: ${googleSansFont} !important;
        }

        .article-preview[data-type=doc]{
            font-family: ${googleSansFont} !important;
        }

        code, pre, pre tt, .article-preview [data-type=codeline], [data-type=doc] code, .article-preview code {
            font-family: ${globalMonoFont} !important;
        }
    `,
  mdBook: `
        .fa {
            font-family: FontAwesome !important;
        }
        html, body, input, textarea, select, h1, h2, h3, h4, h5, h6, b, strong {
            font-family: ${googleSansFont} !important;
        }

        code, pre, .ace_editor {
            font-family: ${globalMonoFont} !important;
        }

        .menu-title {
            font-weight: 400;
        }
    `,
  "gin-gonic.com": `
        html, body {
            font-family: ${globalSansFont} !important;
        }

        pre, code, kbd, samp{
            font-family: ${globalMonoFont} !important;
        }
    `,
  "vuejs.org": `
    pre, code, kbd, samp{
        font-family: ${globalMonoFont} !important;
    }

    .line-number, code, kbd{
        font-family: ${globalMonoFont} !important;
    }
    `,
  "typescriptlang.org": `
    html{
        --body-font: ${globalSansFont} !important;
    }
    `,
  "authing.cn": `
    body{
        font-family: ${globalSansFont} !important;
    }

    .styles_equityContainer__12r1u .styles_contextContainer__24onK .styles_contextText__3_t3U{
        font-family: ${globalSansFont} !important;
    }
    `,
  "go.dev": `
    body,html{
        font-family: ${globalSansFont} !important;
    }
    pre,code{
        font-family: ${globalMonoFont} !important;
    }
    `,
  "typeorm.io": `
        h1, h2, h3{
            font-family: ${globalSansFont} !important;
        }
        code[class*="language-"], pre[class*="language-"]{
            font-family: ${globalMonoFont} !important;
    }
    `,
  "gorm.io": `
        .article-title{
            font-family: ${globalSansFont} !important;
        }
        body{
            font-family: ${globalSansFont} !important;
        }

        pre,code{
            font-family: ${globalMonoFont} !important;
        }

        .sidebar-title, .sidebar-link, .toc-link{
            font-family: ${globalSansFont} !important;
        }

        .main-nav-link{
            font-family: ${googleSansFont} !important;
        }
    `,
  "cloudflare.com": `
        body, button{
            font-family: ${globalSansFont} !important;
        }

        code, pre {
            font-family: ${globalMonoFont} !important;
        }


        .c_ei, .c_eo {
            font-family: ${globalSansFont} !important;
        }

        .c_oi {
            font-family: ${globalMonoFont} !important;
        }

        /* workers editor window - bottom bar */
        .windows {
            font-family: ${globalSansFont} !important;
        }


        /* Workders Editor: 下面修改的字体并未生效 */

        /* workders editor window - left bar (code line number) */
        .margin-view-overlays{
            font-family: ${globalMonoFont} !important;
        }

        /* workers editor window - code */
        .view-lines.monaco-mouse-cursor-text {
            font-family: ${globalMonoFont} !important;
        }
        .editor-instance{
            --testMessageDecorationFontFamily: ${globalMonoFont} !important;
            --code-editorInlayHintsFontFamily: ${globalMonoFont} !important;

        }
    `,
  "upwork.com": `
        :root {
            --font-family-base: ${globalSansFont} !important;
            --font-family-monospace: ${globalMonoFont} !important;
        }
    `,
  stackoverflow: `

    html, body{
        --ff-sans: ${globalSansFont} !important;
        --ff-mono: ${globalMonoFont} !important;
        --ff-serif: ${globalSerifFont} !important;
    }
    `,
  "gofiber.io": `
        :root {
                --ifm-font-family-base: ${globalSansFont} !important;
                --ifm-font-family-monospace: ${globalMonoFont} !important;
        }
        body {
            font: 16px/1.6 ${globalSansFont} !important;
        }
        input {
            font-family: ${globalSansFont} !important;
        }
  `,
  "tauri.app": `{
        :root {
            --__sl-font-system: ${globalSansFont} !important;
            --__sl-font-system-mono: ${globalMonoFont} !important;
        }
  }`,

  "docs.rs": `
        code, pre, .code-header {
            font-family: ${globalMonoFont} !important;
        }
  `,
  "orm.drizzle.team": `
        code {
            font-family: ${globalMonoFont} !important;
        }
  `,
};

const rulesList = [
  {
    domains: "github.com",
    style: ["github"],
  },
  {
    domains: "zhihu.com",
    style: ["general"],
  },
  {
    domains: "notion.so",
    style: ["notion"],
  },
  {
    domains: "bilibili.com",
    style: ["bilibili"],
  },
  {
    domains: "googlesource.com",
    style: ["googleSource"],
  },
  {
    domains: [
      "google.com",
      "google.com.hk",
      "google.com.jp",
      "google.com.tw",
      "google.com.sg",
      "google.com.kr",
      "google.com.au",
    ],
    style: ["google"],
  },
  {
    domains: "youtube.com",
    style: ["youtube"],
  },
  {
    domains: "flutter.dev",
    style: ["general"],
  },
  {
    domains: "chaoxing.com",
    style: ["general"],
  },
  {
    domains: "dev.to",
    style: ["dev.to"],
  },
  {
    domains: "medium.com",
    style: ["medium"],
  },
  {
    domains: "reddit.com",
    style: ["reddit"],
  },
  {
    domains: "juejin.cn",
    style: ["juejin"],
  },
  {
    domains: "tauri.app",
    style: ["general"],
  },
  {
    domains: "quora.com",
    style: ["general"],
  },
  {
    domains: "vuejs.org",
    style: ["vuejs.org"],
  },
  {
    domains: "mybatis.org",
    style: ["general"],
  },
  {
    domains: "grpc.io",
    style: ["general", "grpc.io"],
  },
  {
    domains: "python.org",
    style: ["general"],
  },
  {
    domains: "developer.chrome.com",
    style: ["developer.chrome.com"],
  },
  {
    domains: "web.dev",
    style: ["web.dev"],
  },
  {
    domains: "developer.android.com",
    style: ["developer.android.com"],
  },
  {
    domains: "huggingface.co",
    style: ["general"],
  },
  {
    domains: "ithome.com",
    style: ["general"],
  },
  {
    domains: "google.github.io",
    style: ["mdBook"],
  },
  {
    domains: "doc.rust-lang.org",
    style: ["mdBook"],
  },
  {
    domains: "www.infoq.cn",
    style: ["infoq.cn"],
  },
  {
    domains: "www.pixiv.net",
    style: ["general"],
    lang: ["zh-CN"],
  },
  {
    domains: "gin-gonic.com",
    style: ["gin-gonic.com"],
  },
  {
    domains: "v2ex.com",
    style: ["general"],
  },
  {
    domains: "vuejs.org",
    style: ["vuejs.org"],
  },
  {
    domains: ["d2l.ai"],
    style: ["general"],
  },
  {
    domains: ["course.rs"],
    style: ["mdBook"],
  },
  {
    domains: ["www.typescriptlang.org"],
    style: ["typescriptlang.org"],
  },
  {
    domains: ["authing.cn"],
    style: ["authing.cn"],
  },
  {
    domains: ["gopl-zh.github.io"],
    style: ["mdBook"],
  },
  {
    domains: ["go.dev"],
    style: ["go.dev"],
  },
  {
    domains: ["typeorm.io"],
    style: ["typeorm.io"],
  },
  {
    domains: ["gorm.io"],
    style: ["gorm.io"],
  },
  {
    domains: ["fxshu.top", "fuxsw.cc"],
    style: ["general"],
  },
  {
    domains: ["cloudflare.com"],
    style: ["cloudflare.com"],
  },
  {
    domains: ["loro.dev"],
    style: ["general"],
  },
  {
    domains: ["upwork.com"],
    style: ["upwork.com"],
  },
  {
    domains: ["stackoverflow.com"],
    style: ["stackoverflow"],
  },
  {
    domains: ["gofiber.io"],
    style: ["gofiber.io"],
  },
  {
    domains: ["newsminimalist.com"],
    style: ["general"],
  },
  {
    domains: ["tauri.app"],
    style: ["tauri.app"],
  },
  {
    domains: ["docs.rs"],
    style: ["docs.rs"],
  },
  {
    domains: ["orm.drizzle.team"],
    style: ["orm.drizzle.team"],
  },
];

// using filter to find the matched rule
const filteredList = rulesList.filter(({ domains, lang }) => {
  let isMatch = true;

  if (domains instanceof RegExp) {
    isMatch = domains.test(domain);
  } else if (typeof domains === "string") {
    isMatch = domain.endsWith(domains);
  } else if (Array.isArray(domains)) {
    isMatch = domains.some((item) => domain.endsWith(item));
  } else {
    isMatch = false;
  }

  // if the rule has a "lang" property
  // and the "lang" property doesn't contain current language => skip
  if (isMatch === true && lang !== undefined && !lang.includes(lang)) {
    console.log("language not match, skip this rule");
    isMatch = false;
  }
  return isMatch;
});

const style = filteredList
  .flatMap(({ style: keyIndices }) => keyIndices.map((key) => styleList[key]))
  .join("\n");

const css = document.createElement("style");
const text = document.createTextNode(style);
css.appendChild(text);
const head = document.getElementsByTagName("head")[0];
head.appendChild(css);
