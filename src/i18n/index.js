import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhCNLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhCN from './zh-CN'
import enUS from './en-US'
import { cookieGet } from '@/common/cookie'

import sjzh from './surbanajurong/zh'
import sjen from './surbanajurong/en'
import mazh from './mall-age/zh'
import maen from './mall-age/en'
import memberzh from './member/zh'
import memberen from './member/en'
Vue.use(VueI18n)

export const messages = {
  'zh-CN': {
    _lang: '简体中文',
    ...zhCN,
    ...zhCNLocale,
    ...sjzh,
    ...mazh,
    ...memberzh,
  },
  'en-US': {
    _lang: 'English',
    ...enUS,
    ...enLocale,
    ...sjen,
    ...maen,
    ...memberen,
  },
}
export default new VueI18n({
  locale: cookieGet('language') || 'zh-CN',
  messages,
  silentTranslationWarn: true,
})
