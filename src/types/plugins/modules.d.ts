import { Store } from 'vuex/types'
import { Modules } from '@/plugins/modules'

declare module 'vuex-module-decorators' {
  interface VuexModule {
    store: Store<unknown>
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $modules: Modules
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $modules: Modules
  }
}
