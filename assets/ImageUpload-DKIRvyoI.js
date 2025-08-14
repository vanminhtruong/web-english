import { d as defineComponent, H as useI18n, A as ref, I as onMounted, K as watch, L as onUnmounted, c as createElementBlock, v as openBlock, f as createBaseVNode, e as createCommentVNode, t as toDisplayString, u as unref, n as normalizeClass, i as withModifiers, g as createTextVNode, C as withDirectives, S as vModelText, Z as withKeys } from "./vendor-DoTKyHPB.js";
const _hoisted_1 = { class: "space-y-4" };
const _hoisted_2 = { class: "relative" };
const _hoisted_3 = {
  for: "image-upload",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
};
const _hoisted_4 = { class: "flex items-center space-x-4 mb-4" };
const _hoisted_5 = { key: 0 };
const _hoisted_6 = { class: "flex flex-col items-center space-y-2" };
const _hoisted_7 = { class: "text-sm text-gray-600 dark:text-gray-400" };
const _hoisted_8 = { class: "font-medium text-blue-600 dark:text-blue-400" };
const _hoisted_9 = { class: "text-xs text-gray-500 dark:text-gray-500" };
const _hoisted_10 = {
  key: 1,
  class: "space-y-3"
};
const _hoisted_11 = ["placeholder"];
const _hoisted_12 = ["disabled"];
const _hoisted_13 = {
  key: 0,
  class: "animate-spin -ml-1 mr-2 h-4 w-4 text-white",
  fill: "none",
  viewBox: "0 0 24 24"
};
const _hoisted_14 = {
  key: 2,
  class: "space-y-3"
};
const _hoisted_15 = { class: "p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 text-sm" };
const _hoisted_16 = { class: "flex items-center space-x-2 mt-2" };
const _hoisted_17 = ["disabled"];
const _hoisted_18 = {
  key: 0,
  class: "animate-spin -ml-1 mr-2 h-4 w-4 text-white",
  fill: "none",
  viewBox: "0 0 24 24"
};
const _hoisted_19 = {
  key: 1,
  class: "w-4 h-4",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_20 = {
  key: 0,
  class: "text-green-600 dark:text-green-400 text-sm"
};
const _hoisted_21 = { class: "p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 text-sm" };
const _hoisted_22 = { key: 0 };
const _hoisted_23 = {
  key: 1,
  class: "space-y-2"
};
const _hoisted_24 = { class: "flex items-center space-x-2" };
const _hoisted_25 = ["disabled"];
const _hoisted_26 = {
  key: 0,
  class: "animate-spin -ml-1 mr-2 h-4 w-4 text-white",
  fill: "none",
  viewBox: "0 0 24 24"
};
const _hoisted_27 = {
  key: 1,
  class: "w-4 h-4",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_28 = {
  key: 0,
  class: "text-green-600 dark:text-green-400 text-sm"
};
const _hoisted_29 = {
  key: 1,
  class: "text-yellow-600 dark:text-yellow-400 text-sm"
};
const _hoisted_30 = {
  key: 3,
  class: "relative"
};
const _hoisted_31 = { class: "border-2 border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden" };
const _hoisted_32 = ["src", "alt"];
const _hoisted_33 = { class: "flex items-center justify-between mt-2" };
const _hoisted_34 = { class: "flex items-center space-x-2" };
const _hoisted_35 = { class: "text-xs text-gray-500 dark:text-gray-400" };
const _hoisted_36 = { key: 0 };
const _hoisted_37 = { key: 1 };
const _hoisted_38 = {
  key: 4,
  class: "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
};
const _hoisted_39 = { class: "bg-white dark:bg-[#0a0a0a] rounded-lg p-6 w-full max-w-md mx-4" };
const _hoisted_40 = { class: "text-lg font-medium text-gray-900 dark:text-white mb-4" };
const _hoisted_41 = { class: "space-y-4" };
const _hoisted_42 = ["placeholder"];
const _hoisted_43 = { class: "flex justify-end space-x-3" };
const _hoisted_44 = ["disabled"];
const _hoisted_45 = {
  key: 5,
  class: "absolute inset-0 bg-white dark:bg-[#0a0a0a] bg-opacity-75 flex items-center justify-center rounded-lg"
};
const _hoisted_46 = { class: "flex items-center space-x-2 text-blue-600 dark:text-blue-400" };
const _hoisted_47 = { class: "text-sm" };
const _hoisted_48 = {
  key: 0,
  class: "p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md"
};
const _hoisted_49 = { class: "flex items-center space-x-2" };
const _hoisted_50 = { class: "text-sm text-red-700 dark:text-red-300" };
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ImageUpload",
  props: {
    modelValue: { default: null }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const fileInput = ref();
    const imagePreview = ref(null);
    const imageInfo = ref(null);
    const isDragOver = ref(false);
    const isProcessing = ref(false);
    const errorMessage = ref(null);
    const inputMethod = ref("upload");
    const imageUrl = ref("");
    const newImageUrl = ref("");
    const showUrlEdit = ref(false);
    const copyStatus = ref(null);
    const SUPPORTED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const handlePaste = async (e) => {
      try {
        const target = e.target;
        if (target && target.closest('input, textarea, [contenteditable="true"]')) return;
        if (inputMethod.value !== "copy") return;
        const cd = e.clipboardData;
        if (!cd) return;
        const items = cd.items;
        let imageFile = null;
        if (items && items.length) {
          for (let i = 0; i < items.length; i++) {
            const it = items[i];
            if (it.kind === "file" && it.type.startsWith("image/")) {
              const f = it.getAsFile();
              if (f) {
                imageFile = f;
                break;
              }
            }
          }
        }
        if (!imageFile && cd.files && cd.files.length > 0 && cd.files[0].type.startsWith("image/")) {
          imageFile = cd.files[0];
        }
        if (imageFile) {
          e.preventDefault();
          await processFile(imageFile);
          copyStatus.value = { type: "success", message: t("vocabulary.image.paste.success", "Image pasted!") || "Image pasted!" };
          return;
        }
        const text = cd.getData("text/plain");
        if (text && isValidImageUrl(text)) {
          e.preventDefault();
          imageUrl.value = text;
          await handleUrlInput();
          copyStatus.value = { type: "success", message: t("vocabulary.image.paste.success", "Image pasted!") || "Image pasted!" };
          return;
        }
        errorMessage.value = t("vocabulary.image.paste.noImage", "Clipboard does not contain an image");
      } catch (err) {
        console.error("Paste handler error:", err);
        errorMessage.value = t("vocabulary.image.paste.error", "Failed to paste from clipboard");
      }
    };
    onMounted(() => {
      if (inputMethod.value === "copy") {
        window.addEventListener("paste", handlePaste);
      }
    });
    watch(inputMethod, (val, oldVal) => {
      if (oldVal === "copy") {
        window.removeEventListener("paste", handlePaste);
      }
      if (val === "copy") {
        window.addEventListener("paste", handlePaste);
      }
    });
    onUnmounted(() => {
      window.removeEventListener("paste", handlePaste);
    });
    const triggerFileInput = () => {
      fileInput.value?.click();
    };
    const handleFileChange = (event) => {
      const target = event.target;
      const file = target.files?.[0];
      if (file) {
        processFile(file);
      }
    };
    const handleDragOver = (event) => {
      event.preventDefault();
      isDragOver.value = true;
    };
    const handleDragLeave = (event) => {
      event.preventDefault();
      isDragOver.value = false;
    };
    const handleDrop = (event) => {
      event.preventDefault();
      isDragOver.value = false;
      const files = event.dataTransfer?.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    };
    const processFile = async (file) => {
      errorMessage.value = null;
      if (!SUPPORTED_TYPES.includes(file.type)) {
        errorMessage.value = t("vocabulary.image.errors.unsupportedFormat", "Unsupported file format");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        errorMessage.value = t("vocabulary.image.errors.fileTooLarge", "File size too large");
        return;
      }
      isProcessing.value = true;
      try {
        const base64 = await fileToBase64(file);
        imagePreview.value = base64;
        imageInfo.value = {
          name: file.name,
          size: file.size
        };
        emit("update:modelValue", base64);
      } catch (error) {
        console.error("Error processing image:", error);
        errorMessage.value = t("vocabulary.image.errors.processingFailed", "Failed to process image");
      } finally {
        isProcessing.value = false;
      }
    };
    const fileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const result = reader.result;
          resolve(result);
        };
        reader.onerror = (error) => reject(error);
      });
    };
    const dataUrlToBlob = async (dataUrl) => {
      const res = await fetch(dataUrl);
      return await res.blob();
    };
    const fetchImageBlob = async (url) => {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error("Fetch failed");
      return await res.blob();
    };
    const urlToBlobViaCanvas = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            if (!ctx) return reject(new Error("Canvas not supported"));
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
              if (blob) resolve(blob);
              else reject(new Error("Canvas toBlob failed"));
            });
          } catch (e) {
            reject(e);
          }
        };
        img.onerror = () => reject(new Error("Image load error"));
        img.src = url;
      });
    };
    const copyImageToClipboard = async () => {
      copyStatus.value = null;
      errorMessage.value = null;
      if (!imagePreview.value) {
        errorMessage.value = t("vocabulary.image.copy.noImage", "No image to copy. Please upload or load an image first.");
        return;
      }
      const hasClipboard = !!(navigator.clipboard && navigator.clipboard.write && window.ClipboardItem);
      if (!hasClipboard) {
        errorMessage.value = t("vocabulary.image.copy.unsupported", "Clipboard API for images is not supported in this browser.");
        return;
      }
      isProcessing.value = true;
      try {
        let blob;
        if (imagePreview.value.startsWith("data:")) {
          blob = await dataUrlToBlob(imagePreview.value);
        } else if (imagePreview.value.startsWith("http")) {
          try {
            blob = await fetchImageBlob(imagePreview.value);
          } catch {
            blob = await urlToBlobViaCanvas(imagePreview.value);
          }
        } else {
          throw new Error("Unknown image source");
        }
        const mime = blob.type || "image/png";
        const item = new window.ClipboardItem({ [mime]: blob });
        await navigator.clipboard.write([item]);
        copyStatus.value = { type: "success", message: t("vocabulary.image.copy.success", "Image copied to clipboard!") || "Image copied to clipboard!" };
      } catch (err) {
        console.error("Copy image failed:", err);
        errorMessage.value = t("vocabulary.image.copy.failed", "Failed to copy image. Some images cannot be copied due to browser or CORS restrictions.");
        if (imagePreview.value?.startsWith("http")) {
          copyStatus.value = { type: "warning", message: t("vocabulary.image.copy.corsNote", "Tip: Images from some websites block copying. Try uploading the image instead.") || "Tip: Images from some websites block copying. Try uploading the image instead." };
        }
      } finally {
        isProcessing.value = false;
        setTimeout(() => {
          copyStatus.value = null;
        }, 2500);
      }
    };
    const pasteImageFromClipboard = async () => {
      copyStatus.value = null;
      errorMessage.value = null;
      if (inputMethod.value !== "copy") return;
      const canRead = !!(navigator.clipboard && navigator.clipboard.read);
      isProcessing.value = true;
      try {
        if (canRead) {
          const items = await navigator.clipboard.read();
          for (const item of items) {
            const types = item.types || [];
            const imageType = types.find((t2) => t2.startsWith("image/"));
            if (imageType) {
              const blob = await item.getType(imageType);
              const ext = (blob.type.split("/")[1] || "png").replace(/[^a-z0-9]/gi, "");
              const file = new File([blob], `clipboard-${Date.now()}.${ext}`, { type: blob.type });
              await processFile(file);
              copyStatus.value = { type: "success", message: t("vocabulary.image.paste.success", "Image pasted!") || "Image pasted!" };
              return;
            }
          }
        }
        if (navigator.clipboard && navigator.clipboard.readText) {
          const text = await navigator.clipboard.readText();
          const url = text?.trim();
          if (url && isValidImageUrl(url)) {
            imageUrl.value = url;
            await handleUrlInput();
            copyStatus.value = { type: "success", message: t("vocabulary.image.paste.success", "Image pasted!") || "Image pasted!" };
            return;
          }
        }
        errorMessage.value = t("vocabulary.image.paste.noImage", "Clipboard does not contain an image");
      } catch (err) {
        console.error("pasteImageFromClipboard failed:", err);
        errorMessage.value = t("vocabulary.image.paste.error", "Failed to paste from clipboard");
      } finally {
        isProcessing.value = false;
        if (copyStatus.value?.type === "success") {
          setTimeout(() => {
            copyStatus.value = null;
          }, 2500);
        }
      }
    };
    const removeImage = () => {
      imagePreview.value = null;
      imageInfo.value = null;
      errorMessage.value = null;
      imageUrl.value = "";
      if (fileInput.value) {
        fileInput.value.value = "";
      }
      emit("update:modelValue", null);
    };
    const handleUrlInput = async () => {
      if (!imageUrl.value.trim()) {
        errorMessage.value = t("vocabulary.image.errors.emptyUrl");
        return;
      }
      if (!isValidImageUrl(imageUrl.value)) {
        errorMessage.value = t("vocabulary.image.errors.invalidUrl");
        return;
      }
      isProcessing.value = true;
      errorMessage.value = null;
      try {
        await validateImageUrl(imageUrl.value);
        imagePreview.value = imageUrl.value;
        imageInfo.value = null;
        emit("update:modelValue", imageUrl.value);
      } catch (error) {
        console.error("Error loading image from URL:", error);
        if (isValidImageUrl(imageUrl.value)) {
          imagePreview.value = imageUrl.value;
          imageInfo.value = null;
          emit("update:modelValue", imageUrl.value);
          errorMessage.value = t("vocabulary.image.errors.corsWarning");
        } else {
          errorMessage.value = t("vocabulary.image.errors.urlLoadFailed");
        }
      } finally {
        isProcessing.value = false;
      }
    };
    const handleUrlChange = async () => {
      if (!newImageUrl.value.trim()) {
        errorMessage.value = t("vocabulary.image.errors.emptyUrl");
        return;
      }
      if (!isValidImageUrl(newImageUrl.value)) {
        errorMessage.value = t("vocabulary.image.errors.invalidUrl");
        return;
      }
      isProcessing.value = true;
      errorMessage.value = null;
      try {
        await validateImageUrl(newImageUrl.value);
        imagePreview.value = newImageUrl.value;
        imageUrl.value = newImageUrl.value;
        emit("update:modelValue", newImageUrl.value);
        showUrlEdit.value = false;
        newImageUrl.value = "";
      } catch (error) {
        console.error("Error loading image from URL:", error);
        if (isValidImageUrl(newImageUrl.value)) {
          imagePreview.value = newImageUrl.value;
          imageUrl.value = newImageUrl.value;
          emit("update:modelValue", newImageUrl.value);
          showUrlEdit.value = false;
          newImageUrl.value = "";
          errorMessage.value = t("vocabulary.image.errors.corsWarning");
        } else {
          errorMessage.value = t("vocabulary.image.errors.urlLoadFailed");
        }
      } finally {
        isProcessing.value = false;
      }
    };
    const isValidImageUrl = (url) => {
      try {
        const urlObj = new URL(url);
        if (!["http:", "https:"].includes(urlObj.protocol)) {
          return false;
        }
        const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"];
        const pathname = urlObj.pathname.toLowerCase();
        const hasImageExtension = imageExtensions.some((ext) => pathname.includes(ext));
        const commonImageHosts = [
          "imgur.com",
          "cloudinary.com",
          "unsplash.com",
          "pexels.com",
          "pixabay.com",
          "googleusercontent.com",
          "gstatic.com",
          "ggpht.com",
          // Google services
          "fbcdn.net",
          "cdninstagram.com",
          // Facebook/Instagram
          "twimg.com",
          // Twitter
          "amazonaws.com",
          "s3.",
          // AWS S3
          "githubusercontent.com",
          // GitHub
          "wikimedia.org",
          "wikipedia.org",
          // Wikipedia
          "flickr.com",
          "staticflickr.com",
          // Flickr
          "dropbox.com",
          "dropboxusercontent.com",
          // Dropbox
          "drive.google.com",
          // Google Drive
          "ibb.co",
          "postimg.cc",
          // Image hosting services
          "cdn.",
          "images.",
          "img.",
          "static.",
          "media."
          // Common CDN patterns
        ];
        const hasImageHost = commonImageHosts.some((host) => url.includes(host));
        const imageQueryParams = ["jpg", "jpeg", "png", "gif", "webp", "image", "img", "photo"];
        const queryString = urlObj.search.toLowerCase();
        const hasImageQuery = imageQueryParams.some((param) => queryString.includes(param));
        return hasImageExtension || hasImageHost || hasImageQuery;
      } catch {
        return false;
      }
    };
    const validateImageUrl = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const timeout = setTimeout(() => {
          reject(new Error("Image load timeout"));
        }, 8e3);
        img.onload = () => {
          clearTimeout(timeout);
          resolve();
        };
        img.onerror = () => {
          clearTimeout(timeout);
          if (isValidImageUrl(url)) {
            console.warn("Image validation failed but URL looks valid, accepting anyway");
            resolve();
          } else {
            reject(new Error("Failed to load image"));
          }
        };
        img.src = url;
      });
    };
    const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue !== imagePreview.value) {
          imagePreview.value = newValue;
          if (!newValue) {
            imageInfo.value = null;
            errorMessage.value = null;
            imageUrl.value = "";
          } else {
            if (newValue.startsWith("http")) {
              inputMethod.value = "url";
              imageUrl.value = newValue;
            } else {
              inputMethod.value = "upload";
            }
          }
        }
      },
      { immediate: true }
    );
    watch(inputMethod, (newMethod) => {
      errorMessage.value = null;
    });
    onMounted(() => {
      if (props.modelValue) {
        imagePreview.value = props.modelValue;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("label", _hoisted_3, toDisplayString(unref(t)("vocabulary.image.title", "Image")), 1),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => inputMethod.value = "upload"),
              type: "button",
              class: normalizeClass([
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                inputMethod.value === "upload" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              ])
            }, toDisplayString(unref(t)("vocabulary.image.upload", "Upload")), 3),
            createBaseVNode("button", {
              onClick: _cache[1] || (_cache[1] = ($event) => inputMethod.value = "url"),
              type: "button",
              class: normalizeClass([
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                inputMethod.value === "url" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              ])
            }, toDisplayString(unref(t)("vocabulary.image.url", "URL")), 3),
            createBaseVNode("button", {
              onClick: _cache[2] || (_cache[2] = ($event) => inputMethod.value = "copy"),
              type: "button",
              class: normalizeClass([
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                inputMethod.value === "copy" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              ])
            }, toDisplayString(unref(t)("vocabulary.image.copyTab", "Copy")), 3)
          ]),
          createBaseVNode("input", {
            id: "image-upload",
            ref_key: "fileInput",
            ref: fileInput,
            type: "file",
            accept: "image/*",
            onChange: handleFileChange,
            class: "hidden"
          }, null, 544),
          inputMethod.value === "upload" && !imagePreview.value ? (openBlock(), createElementBlock("div", _hoisted_5, [
            createBaseVNode("div", {
              onClick: triggerFileInput,
              onDragover: withModifiers(handleDragOver, ["prevent"]),
              onDragleave: withModifiers(handleDragLeave, ["prevent"]),
              onDrop: withModifiers(handleDrop, ["prevent"]),
              class: normalizeClass([
                "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                isDragOver.value ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500",
                "bg-gray-50 dark:bg-[#0a0a0a]/50 hover:bg-gray-100 dark:hover:bg-gray-700/50"
              ])
            }, [
              createBaseVNode("div", _hoisted_6, [
                _cache[7] || (_cache[7] = createBaseVNode("svg", {
                  class: "w-8 h-8 text-gray-400 dark:text-gray-500",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  })
                ], -1)),
                createBaseVNode("div", _hoisted_7, [
                  createBaseVNode("span", _hoisted_8, toDisplayString(unref(t)("vocabulary.image.clickToUpload", "Click to upload")), 1),
                  createTextVNode(" " + toDisplayString(unref(t)("vocabulary.image.orDragDrop", " or drag and drop")), 1)
                ]),
                createBaseVNode("p", _hoisted_9, toDisplayString(unref(t)("vocabulary.image.supportedFormats", "PNG, JPG, GIF up to 10MB")), 1)
              ])
            ], 34)
          ])) : createCommentVNode("", true),
          inputMethod.value === "url" && !imagePreview.value ? (openBlock(), createElementBlock("div", _hoisted_10, [
            createBaseVNode("div", null, [
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => imageUrl.value = $event),
                onBlur: handleUrlInput,
                onKeyup: withKeys(handleUrlInput, ["enter"]),
                type: "url",
                placeholder: unref(t)("vocabulary.image.urlPlaceholder", "Enter image URL"),
                class: "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              }, null, 40, _hoisted_11), [
                [vModelText, imageUrl.value]
              ])
            ]),
            createBaseVNode("button", {
              onClick: handleUrlInput,
              disabled: !imageUrl.value.trim() || isProcessing.value,
              type: "button",
              class: "w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
            }, [
              isProcessing.value ? (openBlock(), createElementBlock("svg", _hoisted_13, _cache[8] || (_cache[8] = [
                createBaseVNode("circle", {
                  class: "opacity-25",
                  cx: "12",
                  cy: "12",
                  r: "10",
                  stroke: "currentColor",
                  "stroke-width": "4"
                }, null, -1),
                createBaseVNode("path", {
                  class: "opacity-75",
                  fill: "currentColor",
                  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                }, null, -1)
              ]))) : createCommentVNode("", true),
              createBaseVNode("span", null, toDisplayString(isProcessing.value ? unref(t)("vocabulary.image.loading", "Loading...") : unref(t)("vocabulary.image.loadFromUrl", "Load from URL")), 1)
            ], 8, _hoisted_12)
          ])) : createCommentVNode("", true),
          inputMethod.value === "copy" ? (openBlock(), createElementBlock("div", _hoisted_14, [
            createBaseVNode("div", _hoisted_15, [
              createBaseVNode("p", null, toDisplayString(unref(t)("vocabulary.image.paste.hint", "Press Ctrl+V to paste an image, or click the button:")), 1),
              createBaseVNode("div", _hoisted_16, [
                createBaseVNode("button", {
                  onClick: pasteImageFromClipboard,
                  type: "button",
                  class: "px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2",
                  disabled: isProcessing.value
                }, [
                  isProcessing.value ? (openBlock(), createElementBlock("svg", _hoisted_18, _cache[9] || (_cache[9] = [
                    createBaseVNode("circle", {
                      class: "opacity-25",
                      cx: "12",
                      cy: "12",
                      r: "10",
                      stroke: "currentColor",
                      "stroke-width": "4"
                    }, null, -1),
                    createBaseVNode("path", {
                      class: "opacity-75",
                      fill: "currentColor",
                      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    }, null, -1)
                  ]))) : (openBlock(), createElementBlock("svg", _hoisted_19, _cache[10] || (_cache[10] = [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M8 16h8M8 12h8m8-5H8l-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7z"
                    }, null, -1)
                  ]))),
                  createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.image.paste.button", "Paste image from clipboard")), 1)
                ], 8, _hoisted_17),
                copyStatus.value && copyStatus.value.type === "success" ? (openBlock(), createElementBlock("span", _hoisted_20, toDisplayString(copyStatus.value.message), 1)) : createCommentVNode("", true)
              ])
            ]),
            createBaseVNode("div", _hoisted_21, [
              !imagePreview.value ? (openBlock(), createElementBlock("p", _hoisted_22, toDisplayString(unref(t)("vocabulary.image.copy.noImage", "No image to copy. Please upload or load an image first.")), 1)) : (openBlock(), createElementBlock("div", _hoisted_23, [
                createBaseVNode("p", null, toDisplayString(unref(t)("vocabulary.image.copy.description", "Copy the current image to your clipboard as an actual image, not just the URL.")), 1),
                createBaseVNode("div", _hoisted_24, [
                  createBaseVNode("button", {
                    onClick: copyImageToClipboard,
                    type: "button",
                    class: "px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2",
                    disabled: isProcessing.value
                  }, [
                    isProcessing.value ? (openBlock(), createElementBlock("svg", _hoisted_26, _cache[11] || (_cache[11] = [
                      createBaseVNode("circle", {
                        class: "opacity-25",
                        cx: "12",
                        cy: "12",
                        r: "10",
                        stroke: "currentColor",
                        "stroke-width": "4"
                      }, null, -1),
                      createBaseVNode("path", {
                        class: "opacity-75",
                        fill: "currentColor",
                        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      }, null, -1)
                    ]))) : (openBlock(), createElementBlock("svg", _hoisted_27, _cache[12] || (_cache[12] = [
                      createBaseVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M8 16h8M8 12h8m-9 8h10a2 2 0 002-2V6a2 2 0 00-2-2H9l-3 3v11a2 2 0 002 2z"
                      }, null, -1)
                    ]))),
                    createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.image.copy.button", "Copy image to clipboard")), 1)
                  ], 8, _hoisted_25),
                  copyStatus.value && copyStatus.value.type === "success" ? (openBlock(), createElementBlock("span", _hoisted_28, toDisplayString(copyStatus.value.message), 1)) : copyStatus.value && copyStatus.value.type === "warning" ? (openBlock(), createElementBlock("span", _hoisted_29, toDisplayString(copyStatus.value.message), 1)) : createCommentVNode("", true)
                ])
              ]))
            ])
          ])) : createCommentVNode("", true),
          imagePreview.value ? (openBlock(), createElementBlock("div", _hoisted_30, [
            createBaseVNode("div", _hoisted_31, [
              createBaseVNode("img", {
                src: imagePreview.value,
                alt: unref(t)("vocabulary.image.preview", "Image preview"),
                class: "w-full h-48 object-cover"
              }, null, 8, _hoisted_32)
            ]),
            createBaseVNode("div", _hoisted_33, [
              createBaseVNode("div", _hoisted_34, [
                inputMethod.value === "upload" ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  onClick: triggerFileInput,
                  type: "button",
                  class: "px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center space-x-1"
                }, [
                  _cache[13] || (_cache[13] = createBaseVNode("svg", {
                    class: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    })
                  ], -1)),
                  createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.image.changeFile", "Change Image")), 1)
                ])) : createCommentVNode("", true),
                inputMethod.value === "url" ? (openBlock(), createElementBlock("button", {
                  key: 1,
                  onClick: _cache[4] || (_cache[4] = ($event) => showUrlEdit.value = true),
                  type: "button",
                  class: "px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center space-x-1"
                }, [
                  _cache[14] || (_cache[14] = createBaseVNode("svg", {
                    class: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    })
                  ], -1)),
                  createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.image.changeUrl", "Change URL")), 1)
                ])) : createCommentVNode("", true),
                createBaseVNode("button", {
                  onClick: removeImage,
                  type: "button",
                  class: "px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors flex items-center space-x-1"
                }, [
                  _cache[15] || (_cache[15] = createBaseVNode("svg", {
                    class: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    })
                  ], -1)),
                  createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.image.remove", "Remove")), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_35, [
                imageInfo.value && inputMethod.value === "upload" ? (openBlock(), createElementBlock("div", _hoisted_36, toDisplayString(formatFileSize(imageInfo.value.size)), 1)) : createCommentVNode("", true),
                inputMethod.value === "url" ? (openBlock(), createElementBlock("div", _hoisted_37, toDisplayString(unref(t)("vocabulary.image.fromUrl", "From URL")), 1)) : createCommentVNode("", true)
              ])
            ])
          ])) : createCommentVNode("", true),
          showUrlEdit.value ? (openBlock(), createElementBlock("div", _hoisted_38, [
            createBaseVNode("div", _hoisted_39, [
              createBaseVNode("h3", _hoisted_40, toDisplayString(unref(t)("vocabulary.image.changeUrl", "Change URL")), 1),
              createBaseVNode("div", _hoisted_41, [
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => newImageUrl.value = $event),
                  onKeyup: withKeys(handleUrlChange, ["enter"]),
                  type: "url",
                  placeholder: unref(t)("vocabulary.image.urlPlaceholder", "Enter image URL"),
                  class: "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                }, null, 40, _hoisted_42), [
                  [vModelText, newImageUrl.value]
                ]),
                createBaseVNode("div", _hoisted_43, [
                  createBaseVNode("button", {
                    onClick: _cache[6] || (_cache[6] = ($event) => showUrlEdit.value = false),
                    type: "button",
                    class: "px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1),
                  createBaseVNode("button", {
                    onClick: handleUrlChange,
                    disabled: !newImageUrl.value.trim() || isProcessing.value,
                    type: "button",
                    class: "px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                  }, toDisplayString(isProcessing.value ? unref(t)("vocabulary.image.loading", "Loading...") : unref(t)("common.update", "Update")), 9, _hoisted_44)
                ])
              ])
            ])
          ])) : createCommentVNode("", true),
          isProcessing.value ? (openBlock(), createElementBlock("div", _hoisted_45, [
            createBaseVNode("div", _hoisted_46, [
              _cache[16] || (_cache[16] = createBaseVNode("svg", {
                class: "animate-spin w-5 h-5",
                fill: "none",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("circle", {
                  class: "opacity-25",
                  cx: "12",
                  cy: "12",
                  r: "10",
                  stroke: "currentColor",
                  "stroke-width": "4"
                }),
                createBaseVNode("path", {
                  class: "opacity-75",
                  fill: "currentColor",
                  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                })
              ], -1)),
              createBaseVNode("span", _hoisted_47, toDisplayString(unref(t)("vocabulary.image.processing", "Processing...")), 1)
            ])
          ])) : createCommentVNode("", true)
        ]),
        errorMessage.value ? (openBlock(), createElementBlock("div", _hoisted_48, [
          createBaseVNode("div", _hoisted_49, [
            _cache[17] || (_cache[17] = createBaseVNode("svg", {
              class: "w-5 h-5 text-red-500",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24"
            }, [
              createBaseVNode("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              })
            ], -1)),
            createBaseVNode("span", _hoisted_50, toDisplayString(errorMessage.value), 1)
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=ImageUpload-DKIRvyoI.js.map
