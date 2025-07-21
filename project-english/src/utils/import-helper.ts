// Import Helper Utility - Giải quyết lỗi "module has no default export"
// Dành riêng cho Vue 3 components sử dụng <script setup>

import type { DefineComponent } from 'vue'

/**
 * Import Vue component một cách an toàn
 * Giải quyết lỗi "module has no default export" với Vue 3 script setup
 */
export async function safeImportComponent(path: string): Promise<DefineComponent> {
  try {
    const module = await import(path)
    return module.default || module
  } catch (error) {
    console.error(`Failed to import component from ${path}:`, error)
    throw error
  }
}

/**
 * Import module với fallback
 */
export async function safeImportModule(path: string, fallbackKey?: string): Promise<any> {
  try {
    const module = await import(path)
    if (module.default) {
      return module.default
    }
    if (fallbackKey && module[fallbackKey]) {
      return module[fallbackKey]
    }
    return module
  } catch (error) {
    console.error(`Failed to import module from ${path}:`, error)
    throw error
  }
}

/**
 * Load component với error handling
 */
export function loadComponentSafely(importFn: () => Promise<any>) {
  return async () => {
    try {
      const module = await importFn()
      return module.default || module
    } catch (error) {
      console.error('Component loading failed:', error)
      // Return fallback component
      return {
        template: '<div class="error-component">Component failed to load</div>'
      }
    }
  }
}

/**
 * Batch import components
 */
export async function importComponents(paths: Record<string, string>): Promise<Record<string, DefineComponent>> {
  const components: Record<string, DefineComponent> = {}
  
  for (const [name, path] of Object.entries(paths)) {
    try {
      components[name] = await safeImportComponent(path)
    } catch (error) {
      console.error(`Failed to import component ${name} from ${path}:`, error)
    }
  }
  
  return components
}

/**
 * Import với fallback mechanism cho các trường hợp đặc biệt
 */
export function withImportFallback<T = any>(
  importFn: () => Promise<any>,
  fallback?: T
): () => Promise<T> {
  return async () => {
    try {
      const module = await importFn()
      return module.default || module || fallback
    } catch (error) {
      console.warn('Import failed, using fallback:', error)
      if (fallback !== undefined) {
        return fallback
      }
      throw error
    }
  }
}

// Debug utilities
export const ImportDebug = {
  logImport: (path: string, success: boolean, error?: any) => {
    if (success) {
      console.log(`✅ Successfully imported: ${path}`)
    } else {
      console.error(`❌ Failed to import: ${path}`, error)
    }
  },
  
  inspectModule: async (path: string) => {
    try {
      const module = await import(path)
      console.log(`📦 Module structure for ${path}:`, {
        hasDefault: !!module.default,
        keys: Object.keys(module),
        module
      })
      return module
    } catch (error) {
      console.error(`❌ Failed to inspect module ${path}:`, error)
    }
  }
}
