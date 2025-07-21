import type { Component } from 'vue'

/**
 * Utility module để xử lý việc import Vue components một cách an toàn
 * Giải quyết vấn đề TypeScript không nhận diện được file .vue
 */

// Type definition cho dynamic component loading
export type ComponentLoader = () => Promise<{ default: Component }>

/**
 * Hàm helper để load component một cách an toàn
 * @param componentPath - Đường dẫn đến component
 * @returns Promise resolve component
 */
export const loadComponent = (componentPath: string): ComponentLoader => {
  return () => import(componentPath)
}

/**
 * Hàm helper để load component đồng bộ (nếu đã được import)
 * @param component - Component đã được import
 * @returns Component
 */
export const safeComponent = (component: any): Component => {
  return component as Component
}

/**
 * Registry để quản lý các components
 */
export class ComponentRegistry {
  private static components: Map<string, Component> = new Map()

  /**
   * Đăng ký component
   * @param name - Tên component
   * @param component - Component instance
   */
  static register(name: string, component: Component): void {
    this.components.set(name, component)
  }

  /**
   * Lấy component đã đăng ký
   * @param name - Tên component
   * @returns Component hoặc undefined
   */
  static get(name: string): Component | undefined {
    return this.components.get(name)
  }

  /**
   * Kiểm tra component đã được đăng ký chưa
   * @param name - Tên component
   * @returns boolean
   */
  static has(name: string): boolean {
    return this.components.has(name)
  }

  /**
   * Xóa component khỏi registry
   * @param name - Tên component
   */
  static unregister(name: string): void {
    this.components.delete(name)
  }

  /**
   * Lấy danh sách tất cả components đã đăng ký
   * @returns Array tên components
   */
  static list(): string[] {
    return Array.from(this.components.keys())
  }
}
