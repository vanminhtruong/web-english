// Global type declarations for modules without TypeScript support

// Node.js Timer types cho browser environment
declare namespace NodeJS {
  type Timeout = ReturnType<typeof setTimeout>
  type Interval = ReturnType<typeof setInterval>
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  
  // Hỗ trợ cho Vue 3 components với script setup
  const component: DefineComponent<
    Record<string, any>, 
    Record<string, any>, 
    any,
    Record<string, any>,
    Record<string, any>,
    Record<string, any>,
    Record<string, any>,
    any
  >
  
  export default component
}

// Hỗ trợ cho Vue Single File Components với các loại script khác nhau
declare module '*.vue?vue&type=script&setup=true&lang=ts' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, any>, Record<string, any>, any>
  export default component
}

declare module '*.vue?vue&type=script&lang=ts' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, any>, Record<string, any>, any>
  export default component
}

// Đảm bảo các component Vue luôn có default export
declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends ComponentRenderProxy {}
    interface ElementAttributesProperty {
      $props: {}
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

// Module augmentation cho Vue
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // Có thể thêm global properties ở đây nếu cần
  }
}

// Export để làm file này thành module
export {}
