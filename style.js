// ==UserScript==
// @name         梅花 - 更改网页默认显示字体
// @version      1.0.4
// @description  将网页的字体替换为你更喜欢的字体。停止使用 Segoe UI、Arial 与微软雅黑。将英文数字使用苹方的字体替换为 SF Pro 与 Inter。
// @author       Fibert Loyee
// @run-at       document-start
// @match        https://*.zhihu.com/*
// @match        https://*github.com/*
// @match        https://www.notion.so/*
// @match        https://*.bilibili.com/*
// @match        https://*.googlesource.com/*
// @match        https://*.google.com/*
// @match        https://*.google.com.hk/*
// @match        https://*.python.org/*
// @match        https://*.youtube.com/*
// @match        https://docs.flutter.dev/*
// @match        https://*.chaoxing.com/*
// @match        https://dev.to/*
// @match        https://medium.com/*
// @match        https://www.reddit.com/*
// @match        https://juejin.cn/*
// @match        https://tauri.app/*
// @match        https://www.quora.com/*
// @match        https://vuejs.org/*
// @match        https://mybatis.org/*
// @match        https://grpc.io/*
// @match        https://*.chrome.com/*
// @match        https://web.dev/*
// @match        https://developer.android.com/*
// @match        https://huggingface.co/*
// @match        https://www.ithome.com/*
// @match        https://google.github.io/*
// @match        https://doc.rust-lang.org/*
// @match        https://www.infoq.cn/*
// @match        https://www.pixiv.net/*
// @match        https://gin-gonic.com/*
// @match        https://v2ex.com/*
// @namespace    PlumFont
// @license      MIT
// @downloadURL  https://raw.githubusercontent.com/bamboo512/PlumFont/main/style.js
// ==/UserScript==

let globalMonoFont = `ui-monospace, "SF Mono", "Google Sans Mono", "JetBrains Mono","Roboto Mono", monospace`;
let globalSansFont = `ui-sans-serif, -apple-system, BlinkMacSystemFont, "Inter",'Segoe UI Variable Display','Google Sans Text','MiSans', 'PingFang SC', "思源黑体", "Noto Sans CJK SC", "Noto Color Emoji", sans-serif`;
let googleSansFont = `'Google Sans Text',"Inter", ui-sans-serif, -apple-system, BlinkMacSystemFont,'Segoe UI Variable Display','MiSans', "PingFang SC", "Source Han Sans SC", "Noto Sans CJK SC", "Noto Color Emoji", sans-serif`;
let googleSansDisplayFont = `'Google Sans','Google Sans Display',"Inter", ui-sans-serif, -apple-system, BlinkMacSystemFont,'Segoe UI Variable Display','MiSans', "PingFang SC", "Source Han Sans SC", "Noto Sans CJK SC", "Noto Color Emoji", sans-serif`;
let googleMonoFont = `"Google Sans Mono", "SF Mono", "JetBrains Mono","Roboto Mono",ui-monospace, monospace`;

let domain = window.location.host
console.log(domain)


/* Judge which language is used */
let lang = "zh-CN"
function judgeLanguage() {
    lang = document.documentElement.lang
    if (lang === undefined) {
        lang = window.navigator.language;
    }
}
judgeLanguage()


let styleList = {
    'general': `
        html,body, input, textarea, select, button,h1,h2,h3,h4,h5,h6,b, strong{
            font-family: ${globalSansFont} !important;
        }

        code,pre{
            font-family: ${globalMonoFont} !important;
        } `,
    'github': `
        body {
            font-family:${googleSansFont} !important;
        }

        .markdown-body, .f0-mktg, .f1-mktg, .f2-mktg, .f3-mktg, .f4-mktg, .f5-mktg, .f6-mktg {
            font-family:${googleSansFont} !important;
        } `,

    'notion': `
        .notion-app-inner,.notion-selectable, .notion-page-block, div[placeholder*='Heading'] {
            font-family:  ${globalSansFont} !important;
        }

        span[spellcheck='false'], div[spellcheck='false']{
            font-family: ${globalMonoFont} !important;
        }`,
    'bilibili': `
        /* 用户详情页中，"主页、动态、投稿、合计和列表" 后的数字 字体 */
        .n .n-num{
            font-family:${googleSansFont}
        }
        .user-info .info-content .info-value[data-v-32ccf620]{   /* 用户详情页中，右下角 "个人资料 UID" 部分的字体 */
            font-family:${googleSansFont};
        }
        div {
            font-family:  ${googleSansFont} !important
        }

        /* 首页 - 视频标题 */
        .bili-video-card .bili-video-card__info--tit>a {
            font-family:  ${googleSansFont} !important
        }

        /*  视频标题  */
        .video-info-v1 .video-title{
            font-family:  ${googleSansFont} !important
        }

        /* ‘评论’ 标题 */
        .reply-header .reply-navigation .nav-bar .nav-title .nav-title-text[data-v-4ccb5ad5]{
            font-family:  ${googleSansFont} !important
        }

        /*  评论数字计数和评论内容  */
        .bili-comment.browser-pc *{
            font-family:  ${googleSansFont} !important
        }

        /* 视频详情页 - 右侧推荐视频标题 */
        .video-page-card-small .card-box .info .title{
            font-family:  ${googleSansFont} !important
        }

        `,
    'googleSource': `
        .u-monospace {
            font-family: ${globalMonoFont};
        }

        .Site {
            font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Google Sans Text","Inter", "Segoe UI Variable Display","Apple Color Emoji", sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"!important
        } `,
    'google': `
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
        
        `,


    'youtube': `
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

    'dev.to': `
        html,body,dev{

            font-family:  ${globalSansFont} !important;

        }
        .text-styles{
            font-family: ${globalSansFont} !important;
        } `,
    'medium': `
        .a,.bv,.bc {
            font-family:${globalSansFont} !important;
        } `,
    'reddit': `
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
    'juejin': `
        body, html, .markdown-body{
        font-family: ${globalSansFont} !important;
        }

        .markdown-body pre, .markdown-body code, code, pre {
        font-family: ${globalMonoFont} !important;
        } `,

    'vuejs.org': `
        .line-number, code, kbd{
            font-family: ${globalMonoFont} !important;
        } `,

    'grpc.io': `
        .td-search-input{
        font-family: "Font Awesome 5 Free", ${globalSansFont} !important;
        } `,

    'developer.chrome.com': `
        .banner, .material-button, .skip-link, .toc__wrapper a, .type, .type ol:not([class])>li::before, .type--caption, .type--label, .type--small, :root{
            font-family: ${googleSansFont} !important;
        }
        .type code, .type pre{
            font-family: ${googleMonoFont} !important;
        }

    `,

    'web.dev': `
        body{
            font-family: ${googleSansFont} !important;
        }
        code {
            font-family: ${googleMonoFont} !important;
        }
    `,
    'developer.android.com': `
        :root{
            --devsite-primary-font-family: ${googleSansFont} !important;
            --devsite-code-font-family: ${googleMonoFont} !important;
        }
    `,
    'infoq.cn': `
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
    'Comprehensive Rust': `

        html, body, input, textarea, select, h1, h2, h3, h4, h5, h6, b, strong{
            font-family: ${googleSansFont} !important;
        }    

        code, pre, .ace_editor{
            font-family: ${globalMonoFont} !important;
        }
    `,
    'gin-gonic.com': `
        html, body {
            font-family: ${globalSansFont} !important;
        }

        pre, code, kbd, samp{
            font-family: ${globalMonoFont} !important;
        }
    `


}

let rulesList = [{
    "mode": "HOST-SUFFIX",
    "domains": "github.com",
    "style": ["github"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /zhihu.com/,
    "style": ["general"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /notion.so/,
    "style": ["notion"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /bilibili.com/,
    "style": ["bilibili"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /googlesource.com/,
    "style": ["googleSource"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /google.com/,
    "style": ["google"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /youtube.com/,
    "style": ["youtube"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /flutter.dev/,
    "style": ["general"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /chaoxing.com/,
    "style": ["general"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /dev.to/,
    "style": ["dev.to"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /medium.com/,
    "style": ["medium"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /reddit.com/,
    "style": ["reddit"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /juejin.cn/,
    "style": ["juejin"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /tauri.app/,
    "style": ["general"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /quora.com/,
    "style": ["general"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /vuejs.org/,
    "style": ["vuejs.org"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /mybatis.org/,
    "style": ["general"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /grpc.io/,
    "style": ["general", "grpc.io"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /python.org/,
    "style": ["general"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /developer.chrome.com/,
    "style": ["developer.chrome.com"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /web.dev/,
    "style": ["web.dev"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /developer.android.com/,
    "style": ["developer.android.com"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": "huggingface.co",
    "style": ["general"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /ithome.com/,
    "style": ["general"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /google.github.io/,
    "style": ["Comprehensive Rust"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /doc.rust-lang.org/,
    "style": ["general"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /www.infoq.cn/,
    "style": ["infoq.cn"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /www.pixiv.net/,
    "style": ["general"],
    "lang": ['zh-CN']
}, {
    "mode": "HOST-SUFFIX",
    "domains": /gin-gonic.com/,
    "style": ["gin-gonic.com"]
}, {
    "mode": "HOST-SUFFIX",
    "domains": /v2ex.com/,
    "style": ["general"]
}


]


let style = "";

// using filter
// filter the correspondent rule list
let filteredList = rulesList.filter(item => {

    // if the rule has a "lang" property
    // and the "lang" property doesn't contain current language => skip

    if (item?.lang !== undefined && !item.lang.includes(lang)) {
        console.log("language not match, skip this rule")
        return false
    }

    if (item.mode === "HOST-SUFFIX") {
        if (item.domains instanceof RegExp) {
            return item.domains.test(domain)
        } else {
            return domain.endsWith(item.domains)
        }
    }
})

filteredList.forEach(({ style: keyIndeces }) => {
    keyIndeces.forEach(key => {
        style += styleList[key]
    })
})


let css = document.createElement("style");
let text = document.createTextNode(style);
css.appendChild(text);
let head = document.getElementsByTagName("head")[0];
head.appendChild(css);