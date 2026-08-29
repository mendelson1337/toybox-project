import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router';

import wwPage from './views/wwPage.vue';

import {
    initializeData,
    initializePlugins,
    initializeIntegrationInstances,
    onPageUnload,
} from '@/_common/helpers/data';
import { convertPathToRouterFormat } from '@/_common/helpers/urlParametersParsing';
import { getRuntimeEnvironment } from '@/helpers/frontEnv.js';
import { useBackAuthStore } from '@/pinia/backAuth.js';
/* wwFront:start */
import { isStaticRenderingActive } from '@/_front/rendering/staticRenderingContext';
/* wwFront:end */

/**
 * @typedef {import('vue-router').Router} Router
 * @typedef {import('vue-router').RouteRecordRaw} RouteRecordRaw
 * @typedef {import('vue-router').RouterOptions} RouterOptions
 * @typedef {import('vue-router').RouterScrollBehavior} RouterScrollBehavior
 */

/**
 * @typedef {Object} Lang
 * @property {string} lang
 * @property {boolean} [default]
 * @property {boolean} [isDefaultPath]
 */

/**
 * @typedef {Object} PageSecurity
 * @property {'authenticated' | string} [accessRule]
 * @property {string[]} [accessRoles]
 * @property {'AND' | 'OR'} [accessRolesCondition]
 */

/**
 * @typedef {Object} Page
 * @property {string} id
 * @property {Record<string, string> & { default: string }} paths
 * @property {string[]} langs
 * @property {PageSecurity} [security]
 * @property {{ userGroup: string }[]} [pageUserGroups]
 */

/**
 * @typedef {Object} DesignInfo
 * @property {string} homePageId
 * @property {Page[]} pages
 * @property {Lang[]} langs
 * @property {unknown} [auth]
 * @property {{ href?: string }} [baseTag]
 */

/** @type {Router} */
let router;
/** @type {RouteRecordRaw[]} */
const routes = [];

/** @type {RouterScrollBehavior} */
const scrollBehavior = to => {
    if (to.hash) {
        return {
            el: to.hash,
            behavior: 'smooth',
        };
    } else {
        return { top: 0 };
    }
};

 
/* wwFront:start */
import pluginsSettings from '../../plugins-settings.json';

window.wwg_designInfo = {"id":"32dabcb3-c4db-49e4-a11d-3965a2f7defb","homePageId":"db3ec1ab-f3db-4358-a6fe-2aa214c0554b","authPluginId":"1fa0dd68-5069-436c-9a7d-3b54c340f1fa","baseTag":{},"defaultTheme":"dark","langs":[{"lang":"en","default":false,"isDefaultPath":false},{"lang":"ru","default":true,"isDefaultPath":false}],"background":{"backgroundColor":"#191919"},"workflows":[{"id":"fa26989a-05a1-4d71-8302-b2be0bdf575f","actions":{"20554fc7-a471-492a-8225-0be000f7d51d":{"id":"20554fc7-a471-492a-8225-0be000f7d51d","next":"3b009c44-aa51-4d41-b8c6-470598b3300b","type":"open-popup","disabled":true,"libraryComponentBaseId":"1a6d807a-9b55-4575-af1c-66247b1f31b8"},"2424b666-f590-4eaf-b775-3847733ca762":{"id":"2424b666-f590-4eaf-b775-3847733ca762","lang":"en","type":"change-lang"},"3b009c44-aa51-4d41-b8c6-470598b3300b":{"id":"3b009c44-aa51-4d41-b8c6-470598b3300b","type":"if","value":{"code":"pluginVariables['1fa0dd68-5069-436c-9a7d-3b54c340f1fa']['isAuthenticated']","__wwtype":"f"},"branches":[{"id":"f0d17c4d-4158-4e1b-8edd-e33397020bf8","value":true},{"id":"d820b1a2-fdc6-4db1-8283-389d7bad904e","value":false}]},"4aab53ed-4611-434b-9f90-f184f0acaa7d":{"id":"4aab53ed-4611-434b-9f90-f184f0acaa7d","type":"change-theme"},"713ab4e7-77f1-416b-a75f-6e6bce5bc9ed":{"id":"713ab4e7-77f1-416b-a75f-6e6bce5bc9ed","type":"close-all-popup","disabled":true,"libraryComponentBaseId":"1a6d807a-9b55-4575-af1c-66247b1f31b8"},"7fa9cc07-9bb1-4753-abf6-4e57e5dd55dd":{"id":"7fa9cc07-9bb1-4753-abf6-4e57e5dd55dd","type":"fetch-collections","collectionsId":["09a81a55-f69c-49b7-a805-5e0fe623f06d"]},"850f7bdc-3494-47ee-8299-422bf267511a":{"id":"850f7bdc-3494-47ee-8299-422bf267511a","next":"b4991563-3b74-4947-83d3-b175ca7d0071","type":"if","value":{"code":"collections['b86943a0-1547-457a-9dd5-e2f8b07a8944']?.['data']?.[0]?.['language']==\"ru\"","__wwtype":"f"},"branches":[{"id":"f015ffa8-0c53-4d54-9e46-f431b88931b7","value":true},{"id":"2424b666-f590-4eaf-b775-3847733ca762","value":false}],"disabled":false},"8c8ab61d-46e8-4328-80b0-9e9b59e1b0ab":{"id":"8c8ab61d-46e8-4328-80b0-9e9b59e1b0ab","next":"7fa9cc07-9bb1-4753-abf6-4e57e5dd55dd","type":"fetch-collection","collectionId":"1f967746-5680-40ee-8a14-68e58e0949c6"},"b4991563-3b74-4947-83d3-b175ca7d0071":{"id":"b4991563-3b74-4947-83d3-b175ca7d0071","next":"fdfe634b-34cf-433b-8d3a-eca7bb0e4bc3","type":"if","value":{"code":"collections['b86943a0-1547-457a-9dd5-e2f8b07a8944']?.['data']?.[0]?.['theme']","__wwtype":"f"},"branches":[{"id":"de26c5ca-cf2f-46d0-9606-0fc62d0b3849","value":true},{"id":"4aab53ed-4611-434b-9f90-f184f0acaa7d","value":false}],"disabled":false},"d820b1a2-fdc6-4db1-8283-389d7bad904e":{"id":"d820b1a2-fdc6-4db1-8283-389d7bad904e","next":"713ab4e7-77f1-416b-a75f-6e6bce5bc9ed","type":"wait","value":3000,"disabled":true},"de26c5ca-cf2f-46d0-9606-0fc62d0b3849":{"id":"de26c5ca-cf2f-46d0-9606-0fc62d0b3849","type":"change-theme","theme":"dark"},"f015ffa8-0c53-4d54-9e46-f431b88931b7":{"id":"f015ffa8-0c53-4d54-9e46-f431b88931b7","lang":"ru","type":"change-lang"},"f0d17c4d-4158-4e1b-8edd-e33397020bf8":{"id":"f0d17c4d-4158-4e1b-8edd-e33397020bf8","next":"850f7bdc-3494-47ee-8299-422bf267511a","type":"fetch-collection","collectionId":"b86943a0-1547-457a-9dd5-e2f8b07a8944"},"fdfe634b-34cf-433b-8d3a-eca7bb0e4bc3":{"id":"fdfe634b-34cf-433b-8d3a-eca7bb0e4bc3","next":"8c8ab61d-46e8-4328-80b0-9e9b59e1b0ab","type":"close-all-popup","disabled":true,"libraryComponentBaseId":"1a6d807a-9b55-4575-af1c-66247b1f31b8"}},"trigger":"onload","firstAction":"20554fc7-a471-492a-8225-0be000f7d51d","triggerConditions":null}],"back":{"isServerSetup":{"staging":false,"production":false}},"auth":null,"pages":[{"id":"0a4d6fc2-6431-4a87-86a2-c5e8986dae12","linkId":"0a4d6fc2-6431-4a87-86a2-c5e8986dae12","name":"About Us","folder":null,"paths":{"ru":"about-us","default":"about-us"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"2b0dde82-4b85-4ca7-9115-8ac59f6341a4","sectionTitle":"Mobile Header","linkId":"85916922-ddcd-4eba-b28a-235b1b94bbc8"},{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"ea9e68e0-8d37-4d1b-bac6-6d5971348b4d","sectionTitle":"About Section","linkId":"d891996e-b9a0-4254-aebd-b7a389b52369"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"}],"pageUserGroups":[],"title":{"en":"Toybox About","ru":"Toybox о нас"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"54522050-2c7d-4888-b554-469ebea2eb1b","linkId":"54522050-2c7d-4888-b554-469ebea2eb1b","name":"Reset Password","folder":null,"paths":{"ru":"reset-password/{{token|}}","default":"reset-password/{{token|}}"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"a90b2139-18c8-486c-9363-cb9d147ed3f2","sectionTitle":"Section","linkId":"d69a6748-def2-43c7-b052-3774f0cf6ec6"}],"pageUserGroups":[],"title":{"en":"Reset password","ru":"Смена пароля"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"f4d6da9c-e049-4288-ab98-a6e34983b7b5","linkId":"f4d6da9c-e049-4288-ab98-a6e34983b7b5","name":"Privacy Policy","folder":null,"paths":{"ru":"privacy-policy/{{Policy|}}","default":"privacy-policy/{{Policy|}}"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"215d079d-3e7f-4eab-b0d9-625f738b657e","sectionTitle":"PP Section","linkId":"920c2eea-97e3-4bc2-9e45-cbdee201acb0"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"}],"pageUserGroups":[],"title":{"en":"Toybox Privacy Policy","ru":"Toybox политика конфиденциальности"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"89742f00-12bf-4648-9817-c5b866c22d37","linkId":"89742f00-12bf-4648-9817-c5b866c22d37","name":"Deep Search","folder":null,"paths":{"ru":"deep-search","default":"deep-search"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"03956507-c046-43b3-8034-0e4b04f9188a","sectionTitle":"Section","linkId":"495ed7f2-3735-47c1-839b-c6d18bc20dc3"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"}],"pageUserGroups":[],"title":{"ru":"Расширенный поиск"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"8590f6e0-ca1d-4ada-aca1-522c6a651b8c","linkId":"8590f6e0-ca1d-4ada-aca1-522c6a651b8c","name":"Custom Games","folder":null,"paths":{"ru":"custom-games/{{id|}}","default":"custom-games/{{id|}}"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"eb882020-e78a-43fa-af73-b623ee123ade","sectionTitle":"Section","linkId":"0ab4e936-de56-439f-be59-211bf953e192"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{"ru":"Игры вне каталога"},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"e8275705-229a-463a-a4c3-0dc2d7a8b923","linkId":"e8275705-229a-463a-a4c3-0dc2d7a8b923","name":"Games Series","folder":null,"paths":{"ru":"games-series/{{slug|}}","default":"games-series/{{slug|}}"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"a7346d2f-7137-4098-a01c-80f76d719950","sectionTitle":"Section","linkId":"b2307282-2dbc-4c2a-9d06-db0464d885db"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[],"title":{"en":"Game Series","ru":"Серия игр"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"c7b5a89f-5650-424a-840d-8870fdee28ba","linkId":"c7b5a89f-5650-424a-840d-8870fdee28ba","name":"Playlists","folder":null,"paths":{"ru":"playlists/{{id|}}","default":"playlists/{{id|}}"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"d45c6b97-11c7-48dc-ab6b-936bd74231ac","sectionTitle":"Main Content Section","linkId":"670f0f30-1b02-4271-9a70-ab4695e51e32"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[],"title":{"en":"Playlists","ru":"Плейлисты"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"7e1b203d-1cb0-4de6-a55e-82bb21030ae9","linkId":"7e1b203d-1cb0-4de6-a55e-82bb21030ae9","name":"Playlist Games","folder":null,"paths":{"ru":"playlist-games/{{id|}}","default":"playlist-games/{{id|}}"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"bba0c20d-90cd-41e7-a709-7ee6c2d91ee9","sectionTitle":"Main Content Section","linkId":"48d9dce2-27fa-411d-a4ea-5b60dd34dedd"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[],"title":{"en":"Playlist","ru":"Плейлист"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{"ru":"Плейлист"},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"75b395b5-cf71-463e-97c7-ae348fdb3cf4","linkId":"75b395b5-cf71-463e-97c7-ae348fdb3cf4","name":"DLC","folder":null,"paths":{"ru":"dlc/{{slug|}}","default":"dlc/{{slug|}}"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"e29e808b-9107-44d9-8790-de74ca98b323","sectionTitle":"Game Hero Section","linkId":"f0a6253b-38e7-4cb6-abf0-be4877d529e5"},{"uid":"addde2fa-cc0f-48c9-a7ab-50cc356ad577","sectionTitle":"Game Info Section","linkId":"55900da7-e2f9-4420-99ed-ddba9dc422fe"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[],"title":{"en":"DLC","ru":"DLC"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"bd36dc11-b8d0-4cf7-a72b-140b923120ed","linkId":"bd36dc11-b8d0-4cf7-a72b-140b923120ed","name":"Unrecommended","folder":null,"paths":{"ru":"unrecommended/{{id|}}","default":"unrecommended/{{id|}}"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"340625f6-369b-4af6-9b68-7e1840c1d706","sectionTitle":"Section","linkId":"28822478-c91e-47bc-a5f7-cb0737de803d"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[],"title":{"en":"Unrecommended"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{"ru":"Антирекомендации"},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"078aa331-ca71-4a30-b789-84ed49b2d630","linkId":"078aa331-ca71-4a30-b789-84ed49b2d630","name":"Games","folder":null,"paths":{"en":"","ru":"games/{{slug|}}","default":"games/{{slug|}}"},"langs":["ru","en"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"a5a5c68a-3c3c-4832-ac03-0c6db70de674","sectionTitle":"Game Hero Section","linkId":"a83fdb48-6013-46c4-af58-70d08df3d831"},{"uid":"10b6a435-21c4-4606-b59d-1ca1ecda9890","sectionTitle":"Game Info Section","linkId":"0617ac36-3a66-4a62-952f-e05b05dbc417"},{"uid":"caf9f9e0-235c-472c-9415-a61ee704c76a","sectionTitle":"Screenshots Section","linkId":"58aca701-fcc7-49af-a1df-d1c4d09432b4"},{"uid":"07453ceb-823d-4b35-801b-0b230bd6e8ec","sectionTitle":"System Requirements Section","linkId":"db715029-41ab-4224-a9aa-31791bcfdd23"},{"uid":"599734ab-cf91-4110-a933-9eb5eb6e6b7c","sectionTitle":"Similar Games Section","linkId":"08ef4e86-b8f5-4ba7-85e1-e85b4306e072"},{"uid":"c7a441a4-6214-48a3-8bfd-c2d301fcd03c","sectionTitle":"Reviews Section","linkId":"92ae877d-922e-40de-b4ca-87c6425f0854"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[],"title":{"en":"Toybox","ru":"Toybox"},"meta":{"desc":{"ru":""},"keywords":{"en":"toybox, toybox сервис, toyboxgames, toybox games, toybox game, toyboxgames.net, games, gamesdb, games db, games data base, игры, база игр, toybox сайт, toybox игры","ru":"toybox, toybox сервис, toybox сайт, toyboxgames, toybox games, toybox game, toyboxgames.net, games, gamesdb, games db, games data base, игры, база игр, toybox сайт, toybox игры, tier list, tierl-list, tierlist, тир лист, тир-лист, тирлист, игровой дневник, дневник игр, бэклог, backlog, оценка игры"},"socialDesc":{},"socialTitle":{},"structuredData":{"en":"","ru":"{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"VideoGame\",\n  \"name\": \"{{ CurrentGame.title }}\",\n  \"image\": \"{{ CurrentGame.image }}\",\n  \"url\": \"https://toyboxgames.net/games/{{ CurrentGame.slug }}\"\n}"}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"e30af3b3-ad94-457d-99c1-a08fefba5473","linkId":"e30af3b3-ad94-457d-99c1-a08fefba5473","name":"Profile","folder":null,"paths":{"en":"","ru":"profile/{{id|}}","default":"profile/{{id|}}"},"langs":["ru","en"],"cmsDataSetPath":null,"sections":[{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"},{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"882dbbf0-91ee-40a3-9e6e-5103cd185e08","sectionTitle":"Mobile Header","linkId":"db2edfb7-1d7b-4dd7-b97d-6f2d4278a83a"},{"uid":"48f83c3f-0eb5-4eb6-9cc7-aaaa107a48df","sectionTitle":"Profile Main Container","linkId":"76f18caa-c8eb-4567-8996-8a2b856706d1"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"}],"pageUserGroups":[{}],"title":{"en":"Profile","ru":"Профиль"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"4849745b-d356-4bfa-ba66-4c3f520987fb","linkId":"4849745b-d356-4bfa-ba66-4c3f520987fb","name":"Tier List","folder":null,"paths":{"ru":"tier-list/{{id|}}","default":"tier-list/{{id|}}"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"f4d3905f-09ff-47ef-8a85-c2f382a5e73d","sectionTitle":"Main Content Section","linkId":"7da0d222-f53d-4858-9b21-d2e9c6ffa644"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[],"title":{"en":"Tier-List","ru":"Тир-лист"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"db3ec1ab-f3db-4358-a6fe-2aa214c0554b","linkId":"db3ec1ab-f3db-4358-a6fe-2aa214c0554b","name":"Home","folder":null,"paths":{"en":"home","ru":"home","default":"home"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"2b0dde82-4b85-4ca7-9115-8ac59f6341a4","sectionTitle":"Mobile Header","linkId":"85916922-ddcd-4eba-b28a-235b1b94bbc8"},{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"},{"uid":"3d645f6d-53b5-4d63-b06e-558221966656","sectionTitle":"Section","linkId":"89c37e89-05e5-41ad-b393-d5add2fd0214"},{"uid":"cc04af6c-3995-4cc7-8a5b-ab6ec27d0d7e","sectionTitle":"About","linkId":"c4a42e96-0c99-4ca4-b994-4344ee4b2884"},{"uid":"2b6dd9f5-e3b7-4408-8236-908b76e74480","sectionTitle":"Stories","linkId":"29a29344-9f4d-4c80-a01e-80ee7d15415b"},{"uid":"a2f9f1d2-13e6-46b2-a014-8e5f415b99fe","sectionTitle":"Main Content Section","linkId":"24962cb2-8d83-486f-8184-c8bd431b8d42"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"}],"pageUserGroups":[],"title":{"en":"Toybox - discover your games","fr":"Vide | Commencer à partir de zéro","ru":"Toybox - найди свои игры"},"meta":{"desc":{"en":"Toybox - when you don't know what to play. Discover new games, rate them, build your collection, and create your own tier lists.","ru":"Toybox - когда не знаешь, во что поиграть. Находи новые игры, оценивай их, собирай свою коллекцию и составляй собственные тир-листы."},"keywords":{"en":"toybox, toybox service, toyboxgames, toybox games, toybox game, toyboxgames.net, games, gamesdb, games db, games database, games, game database, toybox website, toybox games, tier list, tier-list, tierlist, tier list, tier-list, tierlist","ru":"toybox, toybox сервис, toybox сайт, toyboxgames, toybox games, toybox game, toyboxgames.net, games, gamesdb, games db, games data base, игры, база игр, toybox сайт, toybox игры, tier list, tierl-list, tierlist, тир лист, тир-лист, тирлист, игровой дневник, дневник игр, бэклог, backlog, оценка игры"},"socialDesc":{},"socialTitle":{},"structuredData":{"ru":""}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"cd84b441-b350-4a28-8e97-c58e8d731cb7","linkId":"cd84b441-b350-4a28-8e97-c58e8d731cb7","name":"Add a Game","folder":null,"paths":{"ru":"add-a-game","default":"add-a-game"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"03b9968e-904e-4a85-8899-a76170734834","sectionTitle":"Section","linkId":"b11d1c74-e34e-4d3f-a2d0-e900fa535513"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"}],"pageUserGroups":[{}],"title":{"en":"Toybox add a game","ru":"Toybox добавить игру"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"c65729d0-8f8c-4c4e-8825-5af67d3ba1be","linkId":"c65729d0-8f8c-4c4e-8825-5af67d3ba1be","name":"Similar Games","folder":null,"paths":{"ru":"similargames/{{slug|}}","default":"similargames/{{slug|}}"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"19022c3d-6e90-468b-9275-41f1df7c640c","sectionTitle":"Section","linkId":"2ed76fc2-7db9-4112-ad5a-c2e263e08fef"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[],"title":{"en":"Similar","ru":"Похожие"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"d602db72-f294-44cd-878d-93316f5b98a8","linkId":"d602db72-f294-44cd-878d-93316f5b98a8","name":"Admin Dashboard","folder":null,"paths":{"ru":"admin-dashboard","default":"admin-dashboard"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"fee4285f-086a-4ab9-9b6f-aa2161978701","sectionTitle":"Section","linkId":"f3cf0d0a-e752-42f3-b46c-455ed3274d06"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"}],"pageUserGroups":[],"title":{"ru":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"6d579b66-db65-4618-b6c5-17e91b5df768","linkId":"6d579b66-db65-4618-b6c5-17e91b5df768","name":"Tag Search","folder":null,"paths":{"ru":"tagsearch","default":"tagsearch"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"911f86f7-7c99-4bef-a4e4-8c34fd92dae2","sectionTitle":"Search Section","linkId":"a6579d0a-5a8c-452a-92ca-9ac66f44d8dc"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[],"title":{"en":"Deep search","ru":"Расширенный поиск"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"becf7961-01a9-4c63-a972-1242dbae9ffd","linkId":"becf7961-01a9-4c63-a972-1242dbae9ffd","name":"Tier-List","folder":null,"paths":{"ru":"tier-list","default":"tier-list"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"5b366130-3760-42fa-8356-be5e7bccebd2","sectionTitle":"Main Content Section","linkId":"2ec8be0c-5eef-4018-a58b-545700ae6bd8"},{"uid":"db79623c-6320-4293-a121-c5e0b814e8f9","sectionTitle":"Alert","linkId":"14b2aafd-aaaa-4a5a-88aa-7bc6f19ff5cf"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[],"title":{"en":"Community Tier-List","ru":"Общественный Тир-Лист"},"meta":{"desc":{"en":"Build a games tier list with the community! Vote, rank, and see what others have chosen.","ru":"Собери тир-лист игр вместе с сообществом! Голосуй, расставляй по рангам и смотри что выбрали другие."},"keywords":{"en":"tier list, tier-list","ru":"тир лист, тир-лист, игровой тир-лист"},"socialDesc":{},"socialTitle":{"ru":"Общественный Тир-Лист"},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"13629ce8-22c2-4ff8-b2b4-d73262d45e59","linkId":"13629ce8-22c2-4ff8-b2b4-d73262d45e59","name":"Folders","folder":null,"paths":{"en":"","ru":"folders/{{id|}}","default":"folders/{{id|}}"},"langs":["ru","en"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"2f2d7de9-4b4f-4b61-9a22-4d5f78ca2755","sectionTitle":"Sidebar Section","linkId":"ca97cf43-2460-4ad7-bc86-3ece2565e4b8"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"6a7648b6-1909-4810-b7b7-d44f1e1f6b20","sectionTitle":"Main Content Section","linkId":"76c9be18-e9d5-4534-89be-585651ec76cc"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[{}],"title":{"en":"Collection","ru":"Коллекция"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"0c61551b-10ea-4ed5-98d0-db20719e750b","linkId":"0c61551b-10ea-4ed5-98d0-db20719e750b","name":"User Ratings","folder":null,"paths":{"ru":"user-ratings/{{id|}}","default":"user-ratings/{{id|}}"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"fe90a05e-2636-47ba-b1d1-1e4df2953331","sectionTitle":"Section","linkId":"e24064aa-4a40-435f-972e-b204fa5e4cae"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[{}],"title":{"en":"Ratings","ru":"Оценки"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"90ebfbed-3b7e-4af1-83b0-11cea85319cc","linkId":"90ebfbed-3b7e-4af1-83b0-11cea85319cc","name":"User Tier-Lists","folder":null,"paths":{"ru":"user-tier-lists/{{id|}}","default":"user-tier-lists/{{id|}}"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"2b4f9109-157f-4cd3-a7a1-1b35efc86722","sectionTitle":"Main Content Section","linkId":"a32550ae-e5ed-4ca7-a9d5-3fd2ec4f58d5"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[],"title":{"en":"Tier-Lists"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{"ru":"Тир-листы"},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"6c413b8a-1d66-475a-8107-f8978e5fc25b","linkId":"6c413b8a-1d66-475a-8107-f8978e5fc25b","name":"Games List","folder":null,"paths":{"ru":"gameslist","default":"gameslist"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"a92eec22-a3f1-4a93-8253-6666bb162602","sectionTitle":"Main Content Section","linkId":"8e1bb753-5a89-407d-9572-d7757c46dd23"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[],"title":{"en":"Toybox","ru":"Toybox"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"cf5e77ba-29bd-4bd8-b327-df0eb01ed115","linkId":"cf5e77ba-29bd-4bd8-b327-df0eb01ed115","name":"Search","folder":null,"paths":{"ru":"search","default":"search"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"e2dc6d5c-ed8c-4562-9412-993332a933c2","sectionTitle":"Search Section","linkId":"729361dd-1f1d-4208-9f9b-3053992016bc"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[],"title":{"en":"Toybox Search","ru":"Toybox поиск"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"62a20cef-65a8-4904-933d-e8b6432fd48d","linkId":"62a20cef-65a8-4904-933d-e8b6432fd48d","name":"Screenshots","folder":null,"paths":{"ru":"{{id|}}/{{slug|}}","default":"{{id|}}/{{slug|}}"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"62427dfc-990d-49b6-8a01-9661bca22f4c","sectionTitle":"Section","linkId":"c1a1eff8-3a0c-499f-bd25-4879350254f9"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[],"title":{"en":"Screenshots","ru":"Скриншоты"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"7f9ebb65-ee85-4280-986b-6edde55161de","linkId":"7f9ebb65-ee85-4280-986b-6edde55161de","name":"Diary","folder":null,"paths":{"ru":"feed/{{id|}}","default":"feed/{{id|}}"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"fbda3e84-2739-48d1-b08a-32dad3897bc6","sectionTitle":"Section","linkId":"0ec5721a-ec3d-479c-b31c-7b00e5c9e225"},{"uid":"559df6da-7419-427f-973f-1150de190cbc","sectionTitle":"Alert","linkId":"26055eaf-a1b3-4918-b338-b7e814839eea"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[],"title":{"en":"Diary","ru":"Мой дневник"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"4224561e-bbc7-4f34-a0a2-d68ae9d09219","linkId":"4224561e-bbc7-4f34-a0a2-d68ae9d09219","name":"Recommended","folder":null,"paths":{"ru":"recommended/{{id|}}","default":"recommended/{{id|}}"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"c2580ce4-3bf3-4af8-bb34-19a57ef2711b","sectionTitle":"Section","linkId":"87ca37de-9d03-4032-90e2-163a015874f1"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[],"title":{"en":"Recommended","ru":"Рекомендованные"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}},{"id":"b31e139b-4ea2-4ad2-9ac2-85fa86fa0faa","linkId":"b31e139b-4ea2-4ad2-9ac2-85fa86fa0faa","name":"Picker","folder":null,"paths":{"ru":"picker","default":"picker"},"langs":["en","ru"],"cmsDataSetPath":null,"sections":[{"uid":"84db250d-02af-4ac6-835b-493c6cc72b9b","sectionTitle":"Header Section","linkId":"af0ff312-42a3-471e-914e-3ed0f11fa96b"},{"uid":"f41d00bb-44de-45ba-a565-fcd45248ac0b","sectionTitle":"Section","linkId":"864fd864-66b3-41df-a1c5-f3b7bb606741"},{"uid":"1f9616f8-a709-4d5f-b4a1-3134bb231761","sectionTitle":"Down Section","linkId":"ac5854b1-573d-4eea-b1fd-a5f7ad66aa39"},{"uid":"f2e8c4f2-28d8-418b-9d38-f469054fd9c4","sectionTitle":"Mobile navigation","linkId":"0df341ec-d7b0-479a-9633-79240d951877"},{"uid":"57217801-ee34-40e3-9bde-4e9574c8633f","sectionTitle":"LVL","linkId":"1d3cae43-b768-4e16-9be6-da7c1b30ec46"}],"pageUserGroups":[],"title":{"en":"Toybox Picker","ru":"Toybox Picker"},"meta":{"desc":{"en":"Not sure what to play? Fire up Picker, rate a few games, and discover your next favorite.","ru":"Не знаешь, во что поиграть? Запусти Picker, оцени несколько игр и найди свою следующую игру."},"keywords":{"en":"games, game selection, game picks, game recommendations, which game to choose, what to play, find a game, game choice, gaming recommendations, new games, games for you, personalized recommendations, game picker, game picker","ru":"игры, подбор игр, рекомендации игр, какую игру выбрать, во что поиграть, найти игру, выбор игры, игровые рекомендации, новые игры, игры для себя, персональные рекомендации, подборщик игр, игровой подборщик"},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/tblogo.svg?_wwcv=343","security":{}}],"plugins":[{"id":"f9ef41c3-1c53-4857-855b-f2f6a40b7186","name":"Supabase","namespace":"supabase"},{"id":"1fa0dd68-5069-436c-9a7d-3b54c340f1fa","name":"Supabase Auth","namespace":"supabaseAuth"},{"id":"66a79c98-70e7-4bc4-8859-20776b024ec2","name":"PWA","namespace":"pwa"},{"id":"9c40819b-4a8f-468f-9ba5-4b9699f3361f","name":"Charts","namespace":"chartjs"}]};
window.wwg_cacheVersion = 343;
window.wwg_pluginsSettings = pluginsSettings;
window.wwg_disableManifest = false;

/** @type {Lang} */
const defaultLang = window.wwg_designInfo.langs.find(({ default: isDefault }) => isDefault) || {
    lang: 'en',
    default: true,
};
const isServerRendering = import.meta.env.SSR;

/**
 * @param {Page} page
 * @param {Lang} lang
 * @param {string} [forcedPath]
 */
const registerRoute = (page, lang, forcedPath) => {
    const langSlug = !lang.default || lang.isDefaultPath ? `/${lang.lang}` : '';
    let path =
        forcedPath ||
        (page.id === window.wwg_designInfo.homePageId ? '/' : `/${page.paths[lang.lang] || page.paths.default}`);

    path = convertPathToRouterFormat(path);

    routes.push({
        path: langSlug + path,
        component: wwPage,
        name: `page-${page.id}-${lang.lang}`,
        meta: {
            pageId: page.id,
            lang,
            isPrivate: !!page.pageUserGroups?.length,
        },
        async beforeEnter(to, from) {
            if (to.name === from.name) return;
            //Set page lang
            wwLib.wwLang.defaultLang = defaultLang.lang;
            wwLib.$store.dispatch('front/setLang', lang.lang);

            if (!isStaticRenderingActive()) {
                const canContinue = await initializePageRuntime(page, to);
                if (!canContinue) return null;
            }

            try {
                const { default: registerPageComponents } = await import(`@/pages/${page.id.split('_')[0]}.js`);
                await registerPageComponents(window.vm);
                await wwLib.wwWebsiteData.fetchPage(page.id);

                //Scroll to section or on top after page change
                if (isStaticRenderingActive()) {
                    return;
                } else if (to.hash) {
                    const targetElement = document.getElementById(to.hash.replace('#', ''));
                    if (targetElement) targetElement.scrollIntoView();
                } else {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }

                return;
            } catch (err) {
                wwLib.$store.dispatch('front/showPageLoadProgress', false);
                if (isStaticRenderingActive()) throw err;

                if (err.redirectUrl) {
                    return { path: err.redirectUrl || '404' };
                } else {
                    //Any other error: go to target page using window.location
                    window.location = to.fullPath;
                }
            }
        },
    });
};

for (const page of window.wwg_designInfo.pages) {
    for (const lang of window.wwg_designInfo.langs) {
        if (!page.langs.includes(lang.lang)) continue;
        registerRoute(page, lang);
    }
}

const page404 = window.wwg_designInfo.pages.find(page => page.paths.default === '404');
if (page404) {
    for (const lang of window.wwg_designInfo.langs) {
        // Create routes /:lang/:pathMatch(.*)* etc for all langs of the 404 page
        if (!page404.langs.includes(lang.lang)) continue;
        registerRoute(
            page404,
            {
                default: false,
                lang: lang.lang,
            },
            '/:pathMatch(.*)*'
        );
    }
    // Create route /:pathMatch(.*)* using default project lang
    registerRoute(page404, { default: true, isDefaultPath: false, lang: defaultLang.lang }, '/:pathMatch(.*)*');
} else {
    routes.push({
        path: '/:pathMatch(.*)*',
        redirect: null,
        async beforeEnter() {
            window.location.href = '/404';
        },
    });
}

const isProd = getRuntimeEnvironment() === 'production';

async function initializePageRuntime(page, route) {
    const backAuthStore = useBackAuthStore(wwLib.$pinia);
    if (!wwLib.wwAuth.plugin && !backAuthStore.projectAuth && window.wwg_designInfo.auth) {
        backAuthStore.setProjectAuth(window.wwg_designInfo.auth);
    }

    await initializePlugins();
    await initializeIntegrationInstances();

    if (!wwLib.wwAuth.plugin) {
        await backAuthStore.refresh();
        const projectAuth = backAuthStore.projectAuth || {};

        if (page.security?.accessRule !== 'authenticated') return true;
        if (!backAuthStore.isAuthenticated) {
            window.location.href = `${wwLib.wwPageHelper.getPagePath(
                projectAuth.unauthenticatedPageId
            )}?_source=${route.path}`;
            return false;
        }
        if (!page.security.accessRoles?.length) return true;

        const hasAccess =
            page.security.accessRolesCondition === 'AND'
                ? backAuthStore.matchAllRoles(page.security.accessRoles)
                : backAuthStore.matchAnyRoles(page.security.accessRoles);
        if (hasAccess) return true;

        window.location.href = `${wwLib.wwPageHelper.getPagePath(
            projectAuth.unauthorizedPageId
        )}?_source=${route.path}`;
        return false;
    }

    if (!page.pageUserGroups?.length) return true;
    await wwLib.wwAuth.init();

    if (!wwLib.wwAuth.getIsAuthenticated()) {
        window.location.href = `${wwLib.wwPageHelper.getPagePath(
            wwLib.wwAuth.getUnauthenticatedPageId()
        )}?_source=${route.path}`;
        return false;
    }

    if (
        page.pageUserGroups.length > 1 &&
        !wwLib.wwAuth.matchUserGroups(page.pageUserGroups.map(({ userGroup }) => userGroup))
    ) {
        window.location.href = `${wwLib.wwPageHelper.getPagePath(
            wwLib.wwAuth.getUnauthorizedPageId()
        )}?_source=${route.path}`;
        return false;
    }

    return true;
}

/**
 * Initializes the current route's traditional runtime dependencies after Vue has
 * hydrated the static projection. Static rendering remains active until this resolves,
 * so client islands and dynamic bindings cannot run against a partial runtime.
 */
export async function initializeCurrentRouteRuntime() {
    const route = router.currentRoute.value;
    const page = window.wwg_designInfo.pages.find(candidate => candidate.id === route.meta.pageId);
    if (!page) throw new Error(`Unable to initialize runtime for route ${route.fullPath}: page is unavailable.`);

    const canContinue = await initializePageRuntime(page, route);
    if (!canContinue) return { status: 'redirected' };
    return { status: 'ready', route };
}

/**
 * Starts the data phase without delaying the mounted lifecycle, matching normal
 * navigation where collections and workflows may initialize after the first render.
 */
export function startCurrentRouteDataInitialization(route) {
    return initializeData(route);
}

function createFrontHistory(serverRendering) {
    if (serverRendering) return createMemoryHistory();

    if (isProd && window.wwg_designInfo.baseTag?.href) {
        let baseTag = window.wwg_designInfo.baseTag.href;
        if (!baseTag.startsWith('/')) {
            baseTag = '/' + baseTag;
        }
        if (!baseTag.endsWith('/')) {
            baseTag += '/';
        }
        return createWebHistory(baseTag);
    }

    return createWebHistory();
}

export function createFrontRouter({ serverRendering = false } = {}) {
    const frontRouter = createRouter({
        history: createFrontHistory(serverRendering),
        routes,
        scrollBehavior,
    });

    //Trigger on page unload
    let isFirstNavigation = true;
    frontRouter.beforeEach(async (to, from) => {
        if (to.name === from.name) return;
        if (!isFirstNavigation && !serverRendering) await onPageUnload();
        isFirstNavigation = false;
        wwLib.globalVariables._navigationId++;
        return;
    });

    //Init page
    frontRouter.afterEach((to, from, failure) => {
        wwLib.$store.dispatch('front/showPageLoadProgress', false);
        let fromPath = from.path;
        let toPath = to.path;
        if (!fromPath.endsWith('/')) fromPath = fromPath + '/';
        if (!toPath.endsWith('/')) toPath = toPath + '/';
        if (failure || (from.name && toPath === fromPath) || serverRendering || isStaticRenderingActive()) return;
        void initializeData(to);
    });

    return frontRouter;
}

router = createFrontRouter({ serverRendering: isServerRendering });
/* wwFront:end */

export default router;
