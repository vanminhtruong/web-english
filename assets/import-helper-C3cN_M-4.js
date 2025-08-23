function loadComponentSafely(importFn) {
  return async () => {
    try {
      const module = await importFn();
      return module.default || module;
    } catch (error) {
      console.error("Component loading failed:", error);
      return {
        template: '<div class="error-component">Component failed to load</div>'
      };
    }
  };
}
export {
  loadComponentSafely as l
};
//# sourceMappingURL=import-helper-C3cN_M-4.js.map
