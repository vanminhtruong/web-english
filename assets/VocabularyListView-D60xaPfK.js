const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ConfirmToast-DsZYvMEQ.js","assets/vendor-CKTvmtu5.js","assets/LazyLoadComponent-DUQ86Zk1.js","assets/_plugin-vue_export-helper-1tPrXgE0.js","assets/LazyLoadComponent-DWULbbXY.css","assets/BaseAccordion-BADOQwig.js","assets/BaseAccordion-CilKpkpT.css","assets/GroupingToggle-DmtWVkf3.js","assets/index-JwMkyzcu.js","assets/vendor-toast-Blf0QbeM.js","assets/vendor-toast-jG2HNJHr.css","assets/index-DUQRsKJD.css","assets/TopicManagerPanel-ihJvgpNL.js","assets/SaveControlPanel-BES1cQYg.js","assets/VocabularyHeader-aMnvZ0WN.js","assets/VocabularyFilters-jQbw8gPR.js","assets/topicUtils-Ix3geJ7R.js","assets/VocabularyList-C-UApZh6.js","assets/import-helper-C3cN_M-4.js","assets/dateUtils-B2zqIzJj.js","assets/VocabularyFormDialog-7Db94Moa.js","assets/useVocabularyStore-C5HdnbWt.js","assets/VocabularyFormDialog-DNdALsNS.css","assets/VocabularyDetailDialog-CLWSumUW.js","assets/voiceStore-DiHiYd9f.js","assets/VocabularyDetailDialog-2zu8wUUX.css","assets/VocabularyNoteDialog-D7Ib1Ago.js","assets/VocabularyNoteDialog-KWtUVEUK.css","assets/GrammarManagerModal-DxRpsVEZ.js","assets/GrammarManagerModal-DHQPPZ-6.css","assets/MoveModal-DnTEJvlr.js","assets/MoveModal-BTEEEcyy.css","assets/VoiceSelector-s8mzgr_N.js","assets/TopicManager-ChZrObjN.js","assets/TopicManager-DWtaljOx.css","assets/DeleteAllVocabulariesPanel-CHFC3Jv5.js"])))=>i.map(i=>d[i]);
import { u as useModalStore, _ as __vitePreload } from "./index-JwMkyzcu.js";
import { z as ref, D as computed, P as watch, M as useI18n, A as onMounted, B as onUnmounted, G as defineAsyncComponent, d as defineComponent, c as createElementBlock, v as openBlock, V as createStaticVNode, f as createBaseVNode, y as createVNode, w as withCtx, t as toDisplayString, u as unref, W as isRef, E as withDirectives, e as createCommentVNode, g as createTextVNode, H as vShow, U as Transition, q as nextTick } from "./vendor-CKTvmtu5.js";
import { u as useToast, P as POSITION } from "./vendor-toast-Blf0QbeM.js";
import { u as useVoiceStore } from "./voiceStore-DiHiYd9f.js";
import { u as useVocabularyStore } from "./useVocabularyStore-C5HdnbWt.js";
import { a as getDateKey, b as groupVocabulariesByDate } from "./dateUtils-B2zqIzJj.js";
import { g as getCustomTopics } from "./topicUtils-Ix3geJ7R.js";
function useVocabularyFilters() {
  const searchQuery = ref("");
  const selectedCategory = ref("");
  const selectedLevel = ref("");
  const showFavoritesOnly = ref(false);
  const currentPage = ref(1);
  const dateGroupPages = ref({});
  function getStoredValue(key, defaultValue) {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  }
  function setStoredValue(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  showFavoritesOnly.value = getStoredValue("vocabulary-show-favorites-only", false);
  searchQuery.value = getStoredValue("vocabulary-search-query", "");
  selectedCategory.value = getStoredValue("vocabulary-selected-category", "");
  selectedLevel.value = getStoredValue("vocabulary-selected-level", "");
  const updateShowFavoritesOnly = (value) => {
    showFavoritesOnly.value = value;
    setStoredValue("vocabulary-show-favorites-only", value);
    currentPage.value = 1;
    dateGroupPages.value = {};
  };
  const updateSearchQuery = (value) => {
    searchQuery.value = value;
    setStoredValue("vocabulary-search-query", value);
    currentPage.value = 1;
    dateGroupPages.value = {};
  };
  const updateSelectedCategory = (value) => {
    selectedCategory.value = value;
    setStoredValue("vocabulary-selected-category", value);
    currentPage.value = 1;
    dateGroupPages.value = {};
  };
  const updateSelectedLevel = (value) => {
    selectedLevel.value = value;
    setStoredValue("vocabulary-selected-level", value);
    currentPage.value = 1;
    dateGroupPages.value = {};
  };
  return {
    searchQuery,
    selectedCategory,
    selectedLevel,
    showFavoritesOnly,
    currentPage,
    dateGroupPages,
    updateShowFavoritesOnly,
    updateSearchQuery,
    updateSelectedCategory,
    updateSelectedLevel
  };
}
function useVocabularyPagination(filteredVocabulary, useGrouping, itemsPerPage) {
  const currentPage = ref(1);
  const totalPages = computed(() => {
    if (useGrouping.value) return 1;
    return Math.ceil(filteredVocabulary.value.length / itemsPerPage.value);
  });
  const paginatedVocabulary = computed(() => {
    if (useGrouping.value) return filteredVocabulary.value;
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredVocabulary.value.slice(start, end);
  });
  const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1);
  const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredVocabulary.value.length));
  const visiblePages = computed(() => {
    const pages = [];
    const start = Math.max(1, currentPage.value - 2);
    const end = Math.min(totalPages.value, currentPage.value + 2);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  });
  const previousPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };
  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };
  const goToPage = (page) => {
    currentPage.value = page;
  };
  return {
    currentPage,
    totalPages,
    paginatedVocabulary,
    startIndex,
    endIndex,
    visiblePages,
    previousPage,
    nextPage,
    goToPage
  };
}
function useVocabularyGrouping() {
  const useGrouping = ref(false);
  const itemsPerPageGrouped = ref(5);
  const dateGroupPages = ref({});
  const getStoredUseGrouping = () => {
    const stored = localStorage.getItem("vocabulary-use-grouping");
    return stored ? JSON.parse(stored) : false;
  };
  const setStoredUseGrouping = (value) => {
    localStorage.setItem("vocabulary-use-grouping", JSON.stringify(value));
  };
  useGrouping.value = getStoredUseGrouping();
  const toggleGrouping = () => {
    useGrouping.value = !useGrouping.value;
    setStoredUseGrouping(useGrouping.value);
  };
  const reloadGroupingState = () => {
    useGrouping.value = getStoredUseGrouping();
  };
  const dateGroupPrevious = (date, filteredVocabulary) => {
    const currentPage = dateGroupPages.value[date] || 1;
    if (currentPage > 1) {
      dateGroupPages.value[date] = currentPage - 1;
    }
  };
  const dateGroupNext = (date, filteredVocabulary) => {
    const currentPage = dateGroupPages.value[date] || 1;
    const dateGroup = filteredVocabulary.filter((word) => getDateKey(word.createdAt) === date);
    const totalPages = Math.ceil(dateGroup.length / itemsPerPageGrouped.value);
    if (currentPage < totalPages) {
      dateGroupPages.value[date] = currentPage + 1;
    }
  };
  const dateGroupGoToPage = (date, page) => {
    dateGroupPages.value[date] = page;
  };
  return {
    useGrouping,
    itemsPerPageGrouped,
    dateGroupPages,
    toggleGrouping,
    reloadGroupingState,
    dateGroupPrevious,
    dateGroupNext,
    dateGroupGoToPage
  };
}
function useVocabularyDialogs() {
  const showFormDialog = ref(false);
  const selectedVocabulary = ref(null);
  const showDetailDialog = ref(false);
  const selectedVocabularyForDetail = ref(null);
  const openAddDialog = () => {
    selectedVocabulary.value = null;
    showFormDialog.value = true;
    window.dispatchEvent(new CustomEvent("vocabulary-edit-word"));
  };
  const openEditDialog = (word) => {
    selectedVocabulary.value = word;
    showFormDialog.value = true;
    window.dispatchEvent(new CustomEvent("vocabulary-edit-word"));
  };
  const onVocabularySaved = () => {
    showFormDialog.value = false;
    selectedVocabulary.value = null;
  };
  const openDetailsDialog = (word) => {
    selectedVocabularyForDetail.value = word;
    showDetailDialog.value = true;
    window.dispatchEvent(new CustomEvent("vocabulary-view-details"));
  };
  const openEditFromDetail = (word) => {
    showDetailDialog.value = false;
    selectedVocabulary.value = word;
    showFormDialog.value = true;
    window.dispatchEvent(new CustomEvent("vocabulary-edit-word"));
  };
  return {
    showFormDialog,
    selectedVocabulary,
    showDetailDialog,
    selectedVocabularyForDetail,
    openAddDialog,
    openEditDialog,
    onVocabularySaved,
    openDetailsDialog,
    openEditFromDetail
  };
}
function useTopicManager(debounceAutoSave) {
  const showTopicManager = ref(false);
  const vocabularyStore = useVocabularyStore();
  const modalStore = useModalStore();
  const openTopicManager = () => {
    showTopicManager.value = true;
    modalStore.setTopicManager(true);
  };
  watch(showTopicManager, (newValue) => {
    modalStore.setTopicManager(newValue);
  });
  const onTopicAdded = (topic) => {
    vocabularyStore.addCustomTopic(topic);
    debounceAutoSave();
    window.dispatchEvent(new CustomEvent("topics-updated"));
  };
  const onTopicUpdated = (oldKey, topic) => {
    vocabularyStore.allVocabularies.value.forEach((vocab) => {
      if (vocab.category === oldKey) {
        vocabularyStore.updateVocabulary(vocab.id, { category: topic.key });
      }
    });
    vocabularyStore.updateCustomTopic(oldKey, topic);
    debounceAutoSave();
    window.dispatchEvent(new CustomEvent("topics-updated"));
  };
  const onTopicDeleted = (key) => {
    vocabularyStore.deleteCustomTopic(key);
    debounceAutoSave();
    window.dispatchEvent(new CustomEvent("topics-updated"));
  };
  return {
    showTopicManager,
    openTopicManager,
    onTopicAdded,
    onTopicUpdated,
    onTopicDeleted
  };
}
const GOOGLE_CLIENT_ID = "330597757388-cdngesnvlcn7uiev2ptar27bu1gco9bt.apps.googleusercontent.com";
const GOOGLE_API_KEY = "AIzaSyDQONqrEK8FmTVj2ci8AM-DMmBKFMMZz20";
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email";
const isGoogleApiLoaded = ref(false);
const isGoogleSignedIn = ref(false);
const googleUser = ref(null);
const googleUserEmail = ref("");
const authError = ref("");
const GOOGLE_TOKEN_KEY = "vocabulary-google-token";
const GOOGLE_USER_KEY = "vocabulary-google-user";
const GOOGLE_USER_EMAIL_KEY = "vocabulary-google-user-email";
const GOOGLE_SIGNED_IN_KEY = "vocabulary-is-google-signed-in";
class GoogleDriveAuth {
  static instance;
  gapi = null;
  tokenClient = null;
  autoRefreshTimer = null;
  constructor() {
    this.loadSavedAuthState();
  }
  static getInstance() {
    if (!GoogleDriveAuth.instance) {
      GoogleDriveAuth.instance = new GoogleDriveAuth();
    }
    return GoogleDriveAuth.instance;
  }
  /**
   * Load saved authentication state from localStorage
   */
  loadSavedAuthState() {
    try {
      const savedToken = localStorage.getItem(GOOGLE_TOKEN_KEY);
      const savedUser = localStorage.getItem(GOOGLE_USER_KEY);
      const savedEmail = localStorage.getItem(GOOGLE_USER_EMAIL_KEY);
      const savedSignedIn = localStorage.getItem(GOOGLE_SIGNED_IN_KEY);
      if (savedToken && savedUser && savedSignedIn === "true") {
        console.log("📂 Loading saved Google authentication state...");
        const tokenData = JSON.parse(savedToken);
        const userData = JSON.parse(savedUser);
        const tokenAge = Date.now() - (tokenData.timestamp || 0);
        const isTokenExpired = tokenAge > 90 * 24 * 60 * 60 * 1e3;
        googleUser.value = userData;
        googleUserEmail.value = savedEmail || "";
        isGoogleSignedIn.value = true;
        if (isTokenExpired) {
          console.log("⏰ Saved Google token expired, will attempt silent refresh later");
        } else {
          console.log("✅ Google authentication state restored from localStorage");
        }
      } else {
        console.log("ℹ️ No saved Google authentication state found");
      }
    } catch (error) {
      console.error("❌ Error loading saved auth state:", error);
    }
  }
  /**
   * Save authentication state to localStorage
   */
  saveAuthState(token, user, email) {
    try {
      localStorage.setItem(GOOGLE_TOKEN_KEY, JSON.stringify({
        access_token: token.access_token,
        timestamp: Date.now()
      }));
      localStorage.setItem(GOOGLE_USER_KEY, JSON.stringify(user));
      localStorage.setItem(GOOGLE_SIGNED_IN_KEY, "true");
      if (email) {
        localStorage.setItem(GOOGLE_USER_EMAIL_KEY, email);
      }
      console.log("💾 Google auth state saved to localStorage");
    } catch (error) {
      console.error("❌ Error saving auth state:", error);
    }
  }
  /**
   * Clear saved authentication state from localStorage
   */
  clearSavedAuthState() {
    try {
      localStorage.removeItem(GOOGLE_TOKEN_KEY);
      localStorage.removeItem(GOOGLE_USER_KEY);
      localStorage.removeItem(GOOGLE_USER_EMAIL_KEY);
      localStorage.removeItem(GOOGLE_SIGNED_IN_KEY);
      console.log("🗑️ Google auth state cleared from localStorage");
    } catch (error) {
      console.error("❌ Error clearing auth state:", error);
    }
  }
  /**
   * Initialize Google APIs
   */
  async initialize() {
    if (isGoogleApiLoaded.value && this.tokenClient && this.gapi) {
      console.log("Google APIs already initialized");
      return;
    }
    try {
      console.log("🚀 Initializing Google APIs...");
      authError.value = "";
      await this.loadGoogleScripts();
      await Promise.all([
        this.initializeGapi(),
        this.initializeGIS()
      ]);
      if (!this.tokenClient || !this.gapi) {
        throw new Error("Google APIs initialization incomplete");
      }
      isGoogleApiLoaded.value = true;
      console.log("✅ Google APIs initialized successfully");
      await this.restoreTokenToGapi();
      if (isGoogleSignedIn.value) {
        this.startAutoRefresh();
        this.attachLifecycleListeners();
      }
    } catch (error) {
      console.error("❌ Failed to initialize Google APIs:", error);
      authError.value = "Failed to initialize Google APIs";
      isGoogleApiLoaded.value = false;
      throw error;
    }
  }
  /**
   * Restore saved token to gapi client
   */
  async restoreTokenToGapi() {
    try {
      const savedToken = localStorage.getItem(GOOGLE_TOKEN_KEY);
      if (savedToken && this.gapi && isGoogleSignedIn.value) {
        const tokenData = JSON.parse(savedToken);
        const tokenAge = Date.now() - (tokenData.timestamp || 0);
        const isTokenExpired = tokenAge > 90 * 24 * 60 * 60 * 1e3;
        if (!isTokenExpired) {
          console.log("🔑 Restoring token to GAPI client...");
          this.gapi.client.setToken({ access_token: tokenData.access_token });
          console.log("✅ Token restored to GAPI client");
          await this.verifyTokenValidity();
        } else {
          console.log("⏰ Token expired during restoration, attempting silent refresh...");
          const refreshSuccess = await this.attemptSilentRefresh();
          if (!refreshSuccess) {
            console.log("⚠️ Silent refresh failed during restoration. Keeping saved login state.");
            authError.value = "Token expired; will require refresh on next action";
          }
        }
      }
    } catch (error) {
      console.error("❌ Error restoring token to GAPI:", error);
      authError.value = "Failed to restore authentication";
    }
  }
  /**
   * Load Google API scripts dynamically
   */
  async loadGoogleScripts() {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript && window.gapi && window.google) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          console.log(`✅ Script loaded: ${src}`);
          resolve();
        };
        script.onerror = () => {
          console.error(`❌ Failed to load script: ${src}`);
          reject(new Error(`Failed to load script: ${src}`));
        };
        document.head.appendChild(script);
      });
    };
    try {
      await Promise.all([
        loadScript("https://apis.google.com/js/api.js"),
        loadScript("https://accounts.google.com/gsi/client")
      ]);
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!window.gapi) {
        throw new Error("Google API (gapi) not loaded");
      }
      if (!window.google?.accounts) {
        throw new Error("Google Identity Services not loaded");
      }
      console.log("📚 Google scripts loaded and verified");
    } catch (error) {
      console.error("❌ Error loading Google scripts:", error);
      throw error;
    }
  }
  /**
   * Initialize Google API client
   */
  async initializeGapi() {
    return new Promise((resolve, reject) => {
      window.gapi.load("client", async () => {
        try {
          await window.gapi.client.init({
            apiKey: GOOGLE_API_KEY,
            discoveryDocs: [DISCOVERY_DOC]
          });
          this.gapi = window.gapi;
          console.log("✅ GAPI client initialized");
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }
  /**
   * Initialize Google Identity Services
   */
  async initializeGIS() {
    return new Promise((resolve, reject) => {
      try {
        this.tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: SCOPES,
          callback: (response) => {
            if (response.error) {
              console.error("❌ Token client error:", response.error);
              authError.value = response.error_description || "Authentication failed";
              isGoogleSignedIn.value = false;
            } else {
              console.log("✅ Token received successfully");
              this.handleAuthSuccess(response);
            }
          }
        });
        console.log("✅ Google Identity Services initialized");
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Sign in to Google account
   */
  async signIn() {
    try {
      console.log("🔐 Initiating Google sign-in...");
      if (!this.tokenClient || !isGoogleApiLoaded.value) {
        console.log("📡 Auto-initializing Google APIs for sign-in...");
        await this.initialize();
      }
      if (!this.tokenClient) {
        throw new Error("Failed to initialize Google Identity Services");
      }
      authError.value = "";
      this.tokenClient.requestAccessToken({ prompt: "consent" });
      return new Promise((resolve) => {
        const timeoutId = setTimeout(() => {
          console.warn("⚠️ Google sign-in timeout");
          authError.value = "Sign-in timeout";
          resolve(false);
        }, 3e4);
        const checkAuth = () => {
          if (isGoogleSignedIn.value) {
            clearTimeout(timeoutId);
            this.startAutoRefresh();
            this.attachLifecycleListeners();
            resolve(true);
          } else if (authError.value) {
            clearTimeout(timeoutId);
            resolve(false);
          } else {
            setTimeout(checkAuth, 100);
          }
        };
        checkAuth();
      });
    } catch (error) {
      console.error("❌ Sign-in failed:", error);
      authError.value = "Sign-in failed";
      return false;
    }
  }
  /**
   * Sign out from Google account
   */
  async signOut() {
    try {
      if (this.gapi?.client?.getToken()) {
        window.google.accounts.oauth2.revoke(this.gapi.client.getToken().access_token);
      }
      isGoogleSignedIn.value = false;
      googleUser.value = null;
      googleUserEmail.value = "";
      authError.value = "";
      this.stopAutoRefresh();
      this.detachLifecycleListeners();
      this.clearSavedAuthState();
      console.log("✅ Signed out successfully and cleared saved state");
    } catch (error) {
      console.error("❌ Sign-out failed:", error);
      throw error;
    }
  }
  /**
   * Handle successful authentication
   */
  async handleAuthSuccess(response) {
    googleUser.value = response;
    isGoogleSignedIn.value = true;
    this.gapi.client.setToken({ access_token: response.access_token });
    const userEmail = await this.fetchUserEmail();
    console.log("🔍 Fetched user email:", userEmail);
    if (userEmail) {
      googleUserEmail.value = userEmail;
      console.log("✅ Email set to reactive state:", googleUserEmail.value);
    } else {
      console.log("❌ No email received from API");
    }
    this.saveAuthState({ access_token: response.access_token }, response, userEmail || void 0);
    console.log("🔑 Authentication successful and persisted");
    this.startAutoRefresh();
  }
  /**
   * Verify token validity with a test API call
   */
  async verifyTokenValidity() {
    try {
      if (!this.gapi?.client) return false;
      const response = await this.gapi.client.request({
        path: "https://www.googleapis.com/drive/v3/about?fields=user"
      });
      if (response.status === 200) {
        console.log("✅ Token verification successful");
        return true;
      } else {
        console.log("❌ Token verification failed:", response.status);
        return false;
      }
    } catch (error) {
      console.log("❌ Token verification error:", error);
      return false;
    }
  }
  /**
   * Attempt silent token refresh
   */
  async attemptSilentRefresh() {
    try {
      if (!this.tokenClient) {
        console.log("❌ No token client available for refresh");
        return false;
      }
      console.log("🔄 Attempting silent token refresh...");
      return new Promise((resolve) => {
        const originalCallback = this.tokenClient.callback;
        let timeoutId;
        this.tokenClient.callback = (response) => {
          this.tokenClient.callback = originalCallback;
          if (timeoutId !== void 0) {
            clearTimeout(timeoutId);
          }
          if (response.error) {
            console.log("❌ Silent refresh failed:", response.error);
            if (response.error === "interaction_required" || response.error === "login_required") {
              console.log("⚠️ Silent refresh requires user interaction, skipping");
            }
            resolve(false);
          } else {
            console.log("✅ Silent refresh successful");
            this.handleAuthSuccess(response);
            resolve(true);
          }
        };
        try {
          this.tokenClient.requestAccessToken({ prompt: "none" });
          timeoutId = setTimeout(() => {
            this.tokenClient.callback = originalCallback;
            console.log("⏰ Silent refresh timeout");
            resolve(false);
          }, 5e3);
        } catch (error) {
          this.tokenClient.callback = originalCallback;
          if (timeoutId !== void 0) {
            clearTimeout(timeoutId);
          }
          console.log("❌ Silent refresh request failed:", error);
          resolve(false);
        }
      });
    } catch (error) {
      console.error("❌ Silent refresh error:", error);
      return false;
    }
  }
  /**
   * Get current access token with automatic refresh if needed
   */
  async getAccessToken() {
    try {
      let currentToken = this.gapi?.client?.getToken()?.access_token;
      if (!currentToken) {
        console.log("❌ No current token available, trying silent refresh...");
        const refreshed = await this.attemptSilentRefresh();
        if (!refreshed) {
          return null;
        }
        currentToken = this.gapi?.client?.getToken()?.access_token;
      }
      const savedToken = localStorage.getItem(GOOGLE_TOKEN_KEY);
      if (savedToken) {
        const tokenData = JSON.parse(savedToken);
        const tokenAge = Date.now() - (tokenData.timestamp || 0);
        const isNearExpiry = tokenAge > 90 * 24 * 60 * 60 * 1e3;
        if (isNearExpiry) {
          console.log("🔄 Token near expiry, attempting refresh...");
          const refreshSuccess = await this.attemptSilentRefresh();
          if (refreshSuccess) {
            return this.gapi?.client?.getToken()?.access_token || null;
          } else {
            console.log("⚠️ Token refresh failed, keeping saved login state");
            return null;
          }
        }
      }
      return currentToken;
    } catch (error) {
      console.error("❌ Error getting access token:", error);
      return null;
    }
  }
  /**
   * Check if user is signed in with token validation
   */
  async isSignedIn() {
    if (!isGoogleSignedIn.value) {
      return false;
    }
    const token = await this.getAccessToken();
    return token !== null || isGoogleSignedIn.value;
  }
  /**
   * Synchronous check for signed in state (for compatibility)
   */
  isSignedInSync() {
    return isGoogleSignedIn.value;
  }
  /**
   * Get current authentication error
   */
  getAuthError() {
    return authError.value;
  }
  /**
   * Auto refresh helpers
   */
  startAutoRefresh() {
    this.stopAutoRefresh();
    this.autoRefreshTimer = window.setInterval(async () => {
      if (!isGoogleSignedIn.value) return;
      const needsRefresh = await this.shouldRefreshToken();
      if (needsRefresh) {
        console.log("⏱️ Auto-refresh timer triggered - token needs refresh");
        await this.attemptSilentRefresh();
      } else {
        console.log("⏱️ Auto-refresh timer checked - token still valid");
      }
    }, 90 * 24 * 60 * 60 * 1e3);
    console.log("🕒 Auto-refresh timer started");
  }
  stopAutoRefresh() {
    if (this.autoRefreshTimer) {
      clearInterval(this.autoRefreshTimer);
      this.autoRefreshTimer = null;
      console.log("🛑 Auto-refresh timer stopped");
    }
  }
  visibilityHandler = async () => {
    if (document.visibilityState === "visible" && isGoogleSignedIn.value) {
      const needsRefresh = await this.shouldRefreshToken();
      if (needsRefresh) {
        console.log("👀 Page visible, token needs refresh");
        await this.attemptSilentRefresh();
      } else {
        console.log("👀 Page visible, token still valid");
      }
    }
  };
  onlineHandler = async () => {
    if (navigator.onLine && isGoogleSignedIn.value) {
      const needsRefresh = await this.shouldRefreshToken();
      if (needsRefresh) {
        console.log("🌐 Back online, token needs refresh");
        await this.attemptSilentRefresh();
      } else {
        console.log("🌐 Back online, token still valid");
      }
    }
  };
  attachLifecycleListeners() {
    document.addEventListener("visibilitychange", this.visibilityHandler);
    window.addEventListener("online", this.onlineHandler);
    console.log("🔗 Lifecycle listeners attached");
  }
  detachLifecycleListeners() {
    document.removeEventListener("visibilitychange", this.visibilityHandler);
    window.removeEventListener("online", this.onlineHandler);
    console.log("🔌 Lifecycle listeners detached");
  }
  /**
   * Fetch user email from Google API
   */
  async fetchUserEmail() {
    try {
      if (!this.gapi?.client) {
        console.log("❌ No GAPI client available for fetching user email");
        return null;
      }
      const response = await this.gapi.client.request({
        path: "https://www.googleapis.com/oauth2/v2/userinfo"
      });
      if (response.status === 200 && response.result?.email) {
        console.log("✅ User email fetched successfully");
        return response.result.email;
      } else {
        console.log("❌ Failed to fetch user email from API response");
        return null;
      }
    } catch (error) {
      console.error("❌ Error fetching user email:", error);
      return null;
    }
  }
  /**
   * Get current user email
   */
  async getUserEmail() {
    return googleUserEmail.value;
  }
  /**
   * Check if token actually needs refreshing
   */
  async shouldRefreshToken() {
    try {
      const currentToken = this.gapi?.client?.getToken()?.access_token;
      if (!currentToken) {
        console.log("🔍 No current token, refresh needed");
        return true;
      }
      const savedToken = localStorage.getItem(GOOGLE_TOKEN_KEY);
      if (!savedToken) {
        console.log("🔍 No saved token data, refresh needed");
        return true;
      }
      const tokenData = JSON.parse(savedToken);
      const tokenAge = Date.now() - (tokenData.timestamp || 0);
      const isNearExpiry = tokenAge > 90 * 24 * 60 * 60 * 1e3;
      if (isNearExpiry) {
        console.log("🔍 Token is near expiry, refresh needed");
        return true;
      }
      console.log("🔍 Token is still valid, no refresh needed");
      return false;
    } catch (error) {
      console.error("❌ Error checking token refresh need:", error);
      return false;
    }
  }
}
const useGoogleDriveAuth = () => {
  const authService = GoogleDriveAuth.getInstance();
  return {
    // Reactive states
    isGoogleApiLoaded: computed(() => isGoogleApiLoaded.value),
    isGoogleSignedIn: computed(() => isGoogleSignedIn.value),
    googleUser: computed(() => googleUser.value),
    googleUserEmail: computed(() => googleUserEmail.value),
    authError: computed(() => authError.value),
    // Methods
    initialize: () => authService.initialize(),
    signIn: () => authService.signIn(),
    signOut: () => authService.signOut(),
    isSignedIn: () => authService.isSignedIn(),
    isSignedInSync: () => authService.isSignedInSync(),
    getAccessToken: () => authService.getAccessToken(),
    getUserEmail: () => authService.getUserEmail()
  };
};
const googleDriveAuth = GoogleDriveAuth.getInstance();
class GoogleDriveApi {
  static instance;
  VOCABULARY_FOLDER_NAME = "Vocabulary Backup";
  BACKUP_FILE_NAME = "vocabulary-auto-backup.json";
  vocabularyFolderId = null;
  constructor() {
  }
  static getInstance() {
    if (!GoogleDriveApi.instance) {
      GoogleDriveApi.instance = new GoogleDriveApi();
    }
    return GoogleDriveApi.instance;
  }
  /**
   * Ensure user is authenticated before making API calls
   */
  async ensureAuthenticated() {
    if (!await googleDriveAuth.isSignedIn()) {
      console.log("⚠️ User not signed in, attempting to sign in...");
      return await googleDriveAuth.signIn();
    }
    return true;
  }
  /**
   * Handle 401 errors by refreshing token and retrying
   */
  async handleAuthError(operation) {
    try {
      const response = await operation();
      if (response.status === 401) {
        console.log("🔄 Received 401 error, attempting token refresh...");
        const newToken = await googleDriveAuth.getAccessToken();
        if (!newToken) {
          throw new Error("Unable to refresh authentication token");
        }
        console.log("♻️ Retrying operation with refreshed token...");
        const retryResponse = await operation();
        if (retryResponse.status === 401) {
          throw new Error("Authentication failed even after token refresh");
        }
        return retryResponse;
      }
      return response;
    } catch (error) {
      console.error("❌ Auth error handling failed:", error);
      throw error;
    }
  }
  /**
   * Find or create the vocabulary backup folder
   */
  async findOrCreateVocabularyFolder() {
    try {
      if (!await this.ensureAuthenticated()) {
        throw new Error("Authentication failed");
      }
      console.log("📁 Finding or creating vocabulary backup folder...");
      const response = await window.gapi.client.drive.files.list({
        q: `name='${this.VOCABULARY_FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        spaces: "drive",
        fields: "files(id, name)"
      });
      if (response.result.files && response.result.files.length > 0) {
        this.vocabularyFolderId = response.result.files[0].id;
        console.log("✅ Found existing vocabulary folder:", this.vocabularyFolderId);
        return this.vocabularyFolderId;
      }
      const createResponse = await window.gapi.client.drive.files.create({
        resource: {
          name: this.VOCABULARY_FOLDER_NAME,
          mimeType: "application/vnd.google-apps.folder",
          description: "Automatically created folder for vocabulary backup files"
        },
        fields: "id"
      });
      this.vocabularyFolderId = createResponse.result.id;
      console.log("✅ Created new vocabulary folder:", this.vocabularyFolderId);
      return this.vocabularyFolderId;
    } catch (error) {
      console.error("❌ Failed to find or create vocabulary folder:", error);
      return null;
    }
  }
  /**
   * Upload vocabulary data to Google Drive
   */
  async uploadVocabularyData(data) {
    let dataSizeKB = 0;
    try {
      if (!await this.ensureAuthenticated()) {
        throw new Error("Authentication failed");
      }
      console.log("📤 Starting vocabulary data upload to Google Drive...");
      const folderId = await this.findOrCreateVocabularyFolder();
      if (!folderId) {
        throw new Error("Failed to create vocabulary folder");
      }
      const existingFile = await this.findVocabularyBackupFile();
      const jsonData = JSON.stringify(data, null, 2);
      dataSizeKB = Math.round(jsonData.length / 1024);
      console.log(`📊 Preparing upload: ${dataSizeKB}KB of vocabulary data`);
      const blob = new Blob([jsonData], { type: "application/json" });
      let response;
      if (existingFile) {
        console.log("🔄 Updating existing backup file:", existingFile.id);
        const createUpdateRequest = async () => {
          const accessToken = await googleDriveAuth.getAccessToken();
          if (!accessToken) {
            throw new Error("No access token available");
          }
          console.log(`🔄 Starting update request for ${dataSizeKB}KB data...`);
          const form = new FormData();
          form.append("metadata", new Blob([JSON.stringify({
            name: this.BACKUP_FILE_NAME,
            description: `Vocabulary backup - Updated: ${(/* @__PURE__ */ new Date()).toISOString()}`
          })], { type: "application/json" }));
          form.append("file", blob);
          const controller = new AbortController();
          const timeoutMs = Math.max(6e4, Math.min(6e5, 6e4 + dataSizeKB * 60));
          const timeoutMinutes = Math.round(timeoutMs / 6e4);
          console.log(`⏱️ Setting ${timeoutMinutes} minute timeout for ${dataSizeKB}KB file`);
          const timeoutId = setTimeout(() => {
            console.log(`⏰ Upload timeout after ${timeoutMinutes} minutes, aborting request...`);
            controller.abort();
          }, timeoutMs);
          try {
            const response2 = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${existingFile.id}?uploadType=multipart&fields=id,name,modifiedTime,size`, {
              method: "PATCH",
              headers: {
                "Authorization": `Bearer ${accessToken}`
              },
              body: form,
              signal: controller.signal
            });
            clearTimeout(timeoutId);
            console.log(`✅ Update request completed with status: ${response2.status}`);
            return response2;
          } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === "AbortError") {
              throw new Error(`Upload timeout after ${timeoutMinutes} minutes for ${dataSizeKB}KB file`);
            }
            throw error;
          }
        };
        response = await this.handleAuthError(createUpdateRequest);
      } else {
        console.log("📄 Creating new backup file...");
        const createNewRequest = async () => {
          const accessToken = await googleDriveAuth.getAccessToken();
          if (!accessToken) {
            throw new Error("No access token available");
          }
          console.log(`📄 Starting new file creation for ${dataSizeKB}KB data...`);
          const form = new FormData();
          form.append("metadata", new Blob([JSON.stringify({
            name: this.BACKUP_FILE_NAME,
            parents: [folderId],
            description: `Vocabulary backup - Created: ${(/* @__PURE__ */ new Date()).toISOString()}`
          })], { type: "application/json" }));
          form.append("file", blob);
          const controller = new AbortController();
          const timeoutMs = Math.max(6e4, Math.min(6e5, 6e4 + dataSizeKB * 60));
          const timeoutMinutes = Math.round(timeoutMs / 6e4);
          console.log(`⏱️ Setting ${timeoutMinutes} minute timeout for ${dataSizeKB}KB file`);
          const timeoutId = setTimeout(() => {
            console.log(`⏰ Upload timeout after ${timeoutMinutes} minutes, aborting request...`);
            controller.abort();
          }, timeoutMs);
          try {
            const response2 = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,modifiedTime,size", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${accessToken}`
              },
              body: form,
              signal: controller.signal
            });
            clearTimeout(timeoutId);
            console.log(`✅ New file creation completed with status: ${response2.status}`);
            return response2;
          } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === "AbortError") {
              throw new Error(`Upload timeout after ${timeoutMinutes} minutes for ${dataSizeKB}KB file`);
            }
            throw error;
          }
        };
        response = await this.handleAuthError(createNewRequest);
      }
      console.log(`🔍 Checking response status: ${response.status}`);
      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        console.error(`❌ HTTP error ${response.status} for ${dataSizeKB}KB upload:`, errorText);
        if (response.status === 401) {
          throw new Error("Authentication failed - please sign in to Google Drive again");
        } else if (response.status === 403) {
          throw new Error("Permission denied - please check Google Drive permissions");
        } else if (response.status === 413) {
          throw new Error(`File too large (${dataSizeKB}KB) - Google Drive limit exceeded`);
        } else if (response.status === 429) {
          throw new Error("Rate limit exceeded - please try again later");
        } else {
          throw new Error(`Upload failed with status ${response.status}: ${errorText}`);
        }
      }
      console.log("📥 Parsing response JSON...");
      const result = await response.json();
      console.log(`✅ Vocabulary data (${dataSizeKB}KB) uploaded successfully:`, {
        fileId: result.id,
        fileName: result.name,
        size: result.size,
        modifiedTime: result.modifiedTime
      });
      return {
        success: true,
        fileId: result.id
      };
    } catch (error) {
      const errorMessage = error.message;
      const sizeInfo = typeof dataSizeKB !== "undefined" ? `${dataSizeKB}KB` : "unknown size";
      console.error(`❌ Failed to upload vocabulary data (${sizeInfo}):`, {
        error: errorMessage,
        stack: error.stack
      });
      return {
        success: false,
        error: errorMessage
      };
    }
  }
  /**
   * Download vocabulary data from Google Drive
   */
  async downloadVocabularyData() {
    try {
      if (!await this.ensureAuthenticated()) {
        throw new Error("Authentication failed");
      }
      console.log("⬇️ Starting vocabulary data download from Google Drive...");
      const backupFile = await this.findVocabularyBackupFile();
      if (!backupFile) {
        return {
          success: false,
          error: "No vocabulary backup file found on Google Drive"
        };
      }
      console.log("📄 Found backup file:", backupFile.name, backupFile.id);
      const response = await window.gapi.client.drive.files.get({
        fileId: backupFile.id,
        alt: "media"
      });
      if (!response.body) {
        throw new Error("Empty response body");
      }
      const data = JSON.parse(response.body);
      console.log("✅ Vocabulary data downloaded successfully");
      return {
        success: true,
        data,
        lastModified: backupFile.modifiedTime
      };
    } catch (error) {
      console.error("❌ Failed to download vocabulary data:", error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  /**
   * Find the vocabulary backup file in the vocabulary folder
   */
  async findVocabularyBackupFile() {
    try {
      const folderId = await this.findOrCreateVocabularyFolder();
      if (!folderId) return null;
      const response = await window.gapi.client.drive.files.list({
        q: `name='${this.BACKUP_FILE_NAME}' and parents in '${folderId}' and trashed=false`,
        spaces: "drive",
        fields: "files(id, name, modifiedTime, size, mimeType)"
      });
      if (response.result.files && response.result.files.length > 0) {
        return response.result.files[0];
      }
      return null;
    } catch (error) {
      console.error("❌ Failed to find vocabulary backup file:", error);
      return null;
    }
  }
  /**
   * Get vocabulary backup file info
   */
  async getVocabularyBackupInfo() {
    try {
      if (!await this.ensureAuthenticated()) {
        throw new Error("Authentication failed");
      }
      const backupFile = await this.findVocabularyBackupFile();
      return {
        exists: !!backupFile,
        file: backupFile || void 0
      };
    } catch (error) {
      return {
        exists: false,
        error: error.message
      };
    }
  }
  /**
   * Delete vocabulary backup file
   */
  async deleteVocabularyBackup() {
    try {
      if (!await this.ensureAuthenticated()) {
        throw new Error("Authentication failed");
      }
      const backupFile = await this.findVocabularyBackupFile();
      if (!backupFile) {
        return { success: true };
      }
      await window.gapi.client.drive.files.delete({
        fileId: backupFile.id
      });
      console.log("🗑️ Vocabulary backup file deleted successfully");
      return { success: true };
    } catch (error) {
      console.error("❌ Failed to delete vocabulary backup:", error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  /**
   * Check if there are any conflicts between local and remote data
   */
  async checkForConflicts(localData) {
    try {
      const downloadResult = await this.downloadVocabularyData();
      if (!downloadResult.success) {
        return {
          hasConflicts: false,
          error: downloadResult.error
        };
      }
      const localModified = localData.exportDate || (/* @__PURE__ */ new Date()).toISOString();
      const remoteModified = downloadResult.lastModified;
      const hasConflicts = new Date(remoteModified) > new Date(localModified);
      return {
        hasConflicts,
        localModified,
        remoteModified,
        remoteData: downloadResult.data
      };
    } catch (error) {
      return {
        hasConflicts: false,
        error: error.message
      };
    }
  }
}
const useGoogleDriveApi = () => {
  const driveApi = GoogleDriveApi.getInstance();
  return {
    uploadVocabularyData: (data) => driveApi.uploadVocabularyData(data),
    downloadVocabularyData: () => driveApi.downloadVocabularyData(),
    getVocabularyBackupInfo: () => driveApi.getVocabularyBackupInfo(),
    deleteVocabularyBackup: () => driveApi.deleteVocabularyBackup(),
    checkForConflicts: (localData) => driveApi.checkForConflicts(localData)
  };
};
GoogleDriveApi.getInstance();
const ConfirmToast = defineAsyncComponent(() => __vitePreload(() => import("./ConfirmToast-DsZYvMEQ.js"), true ? __vite__mapDeps([0,1]) : void 0));
function useVocabularySaving() {
  const { t } = useI18n();
  const vocabularyStore = useVocabularyStore();
  const toast = useToast();
  const googleAuth = useGoogleDriveAuth();
  const googleDriveApi = useGoogleDriveApi();
  const autoSaveEnabled = ref(true);
  const isSaving = ref(false);
  const lastSaveTime = ref("");
  const saveStatus = ref("idle");
  const autoSaveFileHandle = ref(null);
  const hasAutoSaveFile = ref(false);
  const hasGoogleDriveFile = ref(false);
  const storageType = ref("local");
  const autoSaveFileName = "vocabulary-auto-backup.json";
  let autoSaveTimer = null;
  let debounceTimer = null;
  const autoSaveFilePath = ref("");
  const DB_NAME = "vocabulary-file-handles";
  const DB_VERSION = 1;
  const STORE_NAME = "file-handles";
  const FILE_HANDLE_KEY = "auto-save-file-handle";
  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
    });
  };
  const saveFileHandleToIDB = async (fileHandle) => {
    try {
      const db = await openDB();
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      await new Promise((resolve, reject) => {
        const request = store.put(fileHandle, FILE_HANDLE_KEY);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
      console.log("File handle saved to IndexedDB");
    } catch (error) {
      console.error("Error saving file handle to IndexedDB:", error);
    }
  };
  const loadFileHandleFromIDB = async () => {
    try {
      const db = await openDB();
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      return new Promise((resolve, reject) => {
        const request = store.get(FILE_HANDLE_KEY);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result || null);
      });
    } catch (error) {
      console.error("Error loading file handle from IndexedDB:", error);
      return null;
    }
  };
  const clearFileHandleFromIDB = async () => {
    try {
      const db = await openDB();
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      await new Promise((resolve, reject) => {
        const request = store.delete(FILE_HANDLE_KEY);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
      console.log("File handle cleared from IndexedDB");
    } catch (error) {
      console.error("Error clearing file handle from IndexedDB:", error);
    }
  };
  const getStoredValue = (key, defaultValue) => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  };
  const setStoredValue = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  autoSaveEnabled.value = getStoredValue("vocabulary-auto-save-enabled", true);
  hasAutoSaveFile.value = getStoredValue("vocabulary-has-auto-save-file", false);
  hasGoogleDriveFile.value = getStoredValue("vocabulary-has-google-drive-file", false);
  storageType.value = getStoredValue("vocabulary-storage-type", "local");
  lastSaveTime.value = getStoredValue("vocabulary-last-save-time", "");
  const initializeAutoSave = async () => {
    console.log("🔧 Initializing auto-save, hasAutoSaveFile:", hasAutoSaveFile.value);
    if (hasAutoSaveFile.value && "showSaveFilePicker" in window) {
      try {
        console.log("🔍 Attempting to restore file handle from IndexedDB...");
        const savedFileHandle = await loadFileHandleFromIDB();
        if (savedFileHandle) {
          console.log("✅ Found saved file handle in IndexedDB");
          try {
            const opts = { mode: "readwrite" };
            const permission = await savedFileHandle.queryPermission(opts);
            console.log("🔐 File handle permission:", permission);
            if (permission === "granted" || permission === "prompt") {
              autoSaveFileHandle.value = savedFileHandle;
              console.log("✅ File handle restored to autoSaveFileHandle");
              try {
                const fileProps = await savedFileHandle.getFile();
                autoSaveFilePath.value = fileProps.name;
                console.log("📁 File handle restored successfully:", fileProps.name);
                if (permission === "prompt") {
                  console.log("🔄 Requesting permission for file handle...");
                  await savedFileHandle.requestPermission(opts);
                }
              } catch (e) {
                console.log("⚠️ Could not get file properties, but handle seems valid:", e);
              }
            } else {
              console.log("❌ File handle permission denied, clearing stored handle");
              await clearFileHandleFromIDB();
              hasAutoSaveFile.value = false;
              setStoredValue("vocabulary-has-auto-save-file", false);
            }
          } catch (error) {
            console.log("❌ Saved file handle is invalid, clearing:", error);
            await clearFileHandleFromIDB();
            hasAutoSaveFile.value = false;
            setStoredValue("vocabulary-has-auto-save-file", false);
          }
        } else {
          console.log("❌ No file handle found in IndexedDB");
          hasAutoSaveFile.value = false;
          setStoredValue("vocabulary-has-auto-save-file", false);
        }
      } catch (error) {
        console.error("❌ Error initializing auto-save:", error);
        hasAutoSaveFile.value = false;
        setStoredValue("vocabulary-has-auto-save-file", false);
      }
    } else {
      console.log("ℹ️ Auto-save not enabled or File System API not supported");
    }
  };
  const saveToFileSystem = async (data) => {
    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: `vocabulary-backup-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`,
        types: [{
          description: "JSON files",
          accept: { "application/json": [".json"] }
        }]
      });
      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(data, null, 2));
      await writable.close();
      autoSaveFileHandle.value = fileHandle;
      hasAutoSaveFile.value = true;
      setStoredValue("vocabulary-has-auto-save-file", true);
      await saveFileHandleToIDB(fileHandle);
    } catch (error) {
      if (error.name !== "AbortError") {
        await downloadJsonFile(data);
      }
    }
  };
  const downloadJsonFile = async (data) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `vocabulary-backup-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const getVocabularyData = () => {
    const getGroupTopics = () => {
      try {
        const stored = localStorage.getItem("vocabulary-group-topics");
        return stored ? JSON.parse(stored) : {};
      } catch (error) {
        return {};
      }
    };
    const getVocabularyNotes = () => {
      try {
        const stored = localStorage.getItem("vocabulary-notes");
        return stored ? JSON.parse(stored) : {};
      } catch (error) {
        return {};
      }
    };
    const getMarkedWords = () => {
      try {
        const stored = localStorage.getItem("vocabulary-marked-words");
        return stored ? JSON.parse(stored) : {};
      } catch (error) {
        return {};
      }
    };
    const getGrammarRules = () => {
      try {
        const stored = localStorage.getItem("grammar-rules");
        return stored ? JSON.parse(stored) : [];
      } catch (error) {
        return [];
      }
    };
    const getPracticeHistory = () => {
      try {
        const stored = localStorage.getItem("flashcard-practice-history");
        return stored ? JSON.parse(stored) : [];
      } catch (error) {
        return [];
      }
    };
    const getCategoryName = (categoryKey) => {
      const customTopics = getCustomTopics();
      const customTopic = customTopics.find((topic) => topic.key === categoryKey);
      if (customTopic) {
        return customTopic.en;
      }
      const builtInCategories = {
        "technology": "Technology",
        "business": "Business",
        "travel": "Travel",
        "food": "Food",
        "health": "Health",
        "education": "Education",
        "sports": "Sports",
        "entertainment": "Entertainment",
        "science": "Science",
        "art": "Art",
        "music": "Music",
        "literature": "Literature",
        "politics": "Politics",
        "environment": "Environment",
        "fashion": "Fashion",
        "finance": "Finance"
      };
      return builtInCategories[categoryKey] || categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
    };
    const enhancedVocabularies = vocabularyStore.allVocabularies.value.map((vocab) => ({
      ...vocab,
      categoryName: getCategoryName(vocab.category)
      // Add category name alongside category key
    }));
    return {
      vocabularies: enhancedVocabularies,
      customTopics: vocabularyStore.customTopics.value,
      groupTopics: getGroupTopics(),
      vocabularyNotes: getVocabularyNotes(),
      markedWords: getMarkedWords(),
      grammarRules: getGrammarRules(),
      // Include grammar rules in export
      practiceHistory: getPracticeHistory(),
      // Include practice history in export
      accordionState: JSON.parse(localStorage.getItem("vocabulary-accordion-state") || "{}"),
      useGrouping: JSON.parse(localStorage.getItem("vocabulary-use-grouping") || "false"),
      // Save grouping state
      exportDate: (/* @__PURE__ */ new Date()).toISOString(),
      version: "1.6",
      // Increment version to indicate practice history support
      totalCount: vocabularyStore.totalCount.value
    };
  };
  const manualSave = async () => {
    if (isSaving.value) return;
    isSaving.value = true;
    saveStatus.value = "saving";
    try {
      const vocabularyData = getVocabularyData();
      if ("showSaveFilePicker" in window) {
        await saveToFileSystem(vocabularyData);
      } else {
        await downloadJsonFile(vocabularyData);
      }
      vocabularyStore.saveToLocalStorage();
      const now = (/* @__PURE__ */ new Date()).toLocaleString("vi-VN");
      lastSaveTime.value = now;
      setStoredValue("vocabulary-last-save-time", now);
      saveStatus.value = "success";
      setTimeout(() => {
        if (saveStatus.value === "success") saveStatus.value = "idle";
      }, 2e3);
    } catch (error) {
      saveStatus.value = "error";
      setTimeout(() => {
        if (saveStatus.value === "error") saveStatus.value = "idle";
      }, 3e3);
    } finally {
      isSaving.value = false;
    }
  };
  const performAutoSave = async () => {
    if (!autoSaveEnabled.value) return;
    try {
      saveStatus.value = "saving";
      const vocabularyData = getVocabularyData();
      vocabularyStore.saveToLocalStorage();
      let saveSuccess = false;
      if (storageType.value === "google-drive") {
        saveSuccess = await tryAutoSaveToGoogleDrive(vocabularyData);
      } else if (storageType.value === "local" && hasAutoSaveFile.value) {
        saveSuccess = await tryAutoSaveToFile(vocabularyData);
      } else {
        saveSuccess = true;
      }
      const now = (/* @__PURE__ */ new Date()).toLocaleString("vi-VN");
      lastSaveTime.value = now;
      setStoredValue("vocabulary-last-save-time", now);
      if (saveSuccess) {
        saveStatus.value = "success";
        console.log("✅ Auto-save completed successfully");
        setTimeout(() => {
          if (saveStatus.value === "success") {
            saveStatus.value = "idle";
          }
        }, 1e3);
      } else {
        saveStatus.value = "error";
        console.error("❌ Auto-save failed");
        setTimeout(() => {
          if (saveStatus.value === "error") {
            saveStatus.value = "idle";
          }
        }, 2e3);
      }
      return saveSuccess;
    } catch (error) {
      console.error("Auto-save error:", error);
      saveStatus.value = "error";
      setTimeout(() => {
        if (saveStatus.value === "error") {
          saveStatus.value = "idle";
        }
      }, 2e3);
      return false;
    }
  };
  const tryAutoSaveToFile = async (data) => {
    if (!("showSaveFilePicker" in window)) {
      console.log("Browser doesn't support File System Access API");
      return false;
    }
    if (!autoSaveFileHandle.value) {
      console.log("No auto-save file handle available");
      return false;
    }
    try {
      console.log("Attempting to auto-save to file...", autoSaveFilePath.value);
      const opts = { mode: "readwrite" };
      const permission = await autoSaveFileHandle.value.queryPermission(opts);
      if (permission !== "granted") {
        console.log("Requesting permission to write to file...");
        const newPermission = await autoSaveFileHandle.value.requestPermission(opts);
        if (newPermission !== "granted") {
          console.error("Permission to write to file denied");
          toast.error(t("vocabulary.save.errors.permissionDenied", "Permission denied"));
          return false;
        }
      }
      console.log("Creating writable stream...");
      const writable = await autoSaveFileHandle.value.createWritable();
      const jsonString = JSON.stringify(data, null, 2);
      console.log(`Writing ${jsonString.length} characters to file...`);
      await writable.write(jsonString);
      console.log("Closing writable stream...");
      await writable.close();
      console.log("Auto-save to file completed successfully:", autoSaveFilePath.value);
      const now = (/* @__PURE__ */ new Date()).toLocaleString("vi-VN");
      lastSaveTime.value = now;
      setStoredValue("vocabulary-last-save-time", now);
      return true;
    } catch (error) {
      console.error("Error auto-saving to file:", error);
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        toast.error(t("vocabulary.save.errors.permissionDenied", "Permission denied"));
      } else {
        toast.error(t("vocabulary.save.errors.autoSaveFileFailed", "Auto save file failed"));
      }
      if (!(error instanceof DOMException && error.name === "NotAllowedError")) {
        autoSaveFileHandle.value = null;
        hasAutoSaveFile.value = false;
        setStoredValue("vocabulary-has-auto-save-file", false);
        await clearFileHandleFromIDB();
      }
      return false;
    }
  };
  const debounceAutoSave = () => {
    if (!autoSaveEnabled.value) {
      console.log("Auto-save is disabled, skipping debounce");
      return;
    }
    console.log("Setting up debounce auto-save timer...");
    if (debounceTimer) {
      console.log("Clearing existing debounce timer");
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }
    console.log("Creating new debounce timer");
    debounceTimer = setTimeout(async () => {
      console.log("Debounce timer triggered, performing auto-save...");
      if (storageType.value === "local" && !hasAutoSaveFile.value) {
        console.log("No auto-save file selected, saving to localStorage only");
        vocabularyStore.saveToLocalStorage();
        return;
      }
      if (storageType.value === "google-drive") {
        const isSignedIn = await googleAuth.isSignedIn();
        if (!isSignedIn) {
          console.log("Google Drive selected but not signed in or token invalid, saving to localStorage only");
          vocabularyStore.saveToLocalStorage();
          return;
        }
      }
      const result = await performAutoSave();
      console.log("Auto-save result:", result ? "Success" : "Failed");
      if (!result) {
        const retryMessage = storageType.value === "google-drive" ? t("vocabulary.save.googleDriveRetry", "Google Drive save failed. Check connection.") || "Google Drive save failed. Check connection." : t("vocabulary.save.autoSaveRetry", "Auto save failed. Click to select a new file.") || "Auto save failed. Click to select a new file.";
        toast.info(retryMessage, {
          timeout: 5e3,
          onClick: () => {
            if (storageType.value === "local") {
              setupAutoSaveFile();
            }
          }
        });
      }
    }, 500);
  };
  const scheduleAutoSave = () => {
    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    autoSaveTimer = window.setTimeout(() => {
      if (autoSaveEnabled.value) {
        performAutoSave();
        scheduleAutoSave();
      }
    }, 1e4);
  };
  const setupAutoSaveFile = async () => {
    if ("showSaveFilePicker" in window) {
      try {
        console.log("Setting up auto-save file...");
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: autoSaveFileName,
          types: [{ description: "JSON files", accept: { "application/json": [".json"] } }]
        });
        autoSaveFileHandle.value = fileHandle;
        await saveFileHandleToIDB(fileHandle);
        try {
          const fileProps = await fileHandle.getFile();
          autoSaveFilePath.value = fileProps.name;
          console.log("Selected auto-save file:", fileProps.name);
        } catch (e) {
          console.log("Could not get file properties:", e);
        }
        hasAutoSaveFile.value = true;
        setStoredValue("vocabulary-has-auto-save-file", true);
        const vocabularyData = getVocabularyData();
        console.log("Testing auto-save with file handle:", autoSaveFileHandle.value);
        const saveResult = await tryAutoSaveToFile(vocabularyData);
        if (saveResult) {
          toast.success(t("vocabulary.save.autoSaveFileSetup", "Auto save file setup"));
          console.log("Auto-save file setup successful!");
        } else {
          toast.error(t("vocabulary.save.errors.autoSaveFileFailed", "Auto save file failed"));
          console.error("Auto-save file setup failed!");
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error setting up auto-save file:", error);
          toast.error(t("vocabulary.save.errors.fileSelectError", { error: error.message }) || `File selection error: ${error.message}`);
        }
      }
    } else {
      toast.error(t("vocabulary.save.errors.browserNotSupported", "Browser not supported"));
    }
  };
  const handleFileImport = (file) => {
    if (!file || !file.name.endsWith(".json")) {
      toast.error(t("vocabulary.save.errors.invalidFile", "Invalid file"));
      return;
    }
    const toastId = toast(
      {
        component: ConfirmToast,
        props: {
          message: t("vocabulary.save.import.confirmMessage", { filename: file.name }, `Import ${file.name}? This will replace all current vocabulary.`),
          confirmText: t("common.confirm", "Confirm"),
          cancelText: t("common.cancel", "Cancel"),
          onConfirm: () => {
            const reader = new FileReader();
            reader.onload = (e) => {
              isSaving.value = true;
              try {
                const text = e.target?.result;
                const data = JSON.parse(text);
                if (!data.vocabularies || !Array.isArray(data.vocabularies)) {
                  toast.error(t("vocabulary.save.errors.invalidFile", "Invalid file"));
                  isSaving.value = false;
                  return;
                }
                vocabularyStore.importVocabularies(data.vocabularies);
                if (data.customTopics && Array.isArray(data.customTopics)) {
                  localStorage.setItem("customTopics", JSON.stringify(data.customTopics));
                  vocabularyStore.refreshCustomTopics();
                  console.log("Imported custom topics:", data.customTopics);
                }
                if (data.topics && Array.isArray(data.topics)) {
                  localStorage.setItem("customTopics", JSON.stringify(data.topics));
                  vocabularyStore.refreshCustomTopics();
                  console.log("Imported legacy topics:", data.topics);
                }
                if (data.groupTopics && typeof data.groupTopics === "object") {
                  localStorage.setItem("vocabulary-group-topics", JSON.stringify(data.groupTopics));
                  console.log("Imported group topics:", data.groupTopics);
                }
                if (data.accordionState && typeof data.accordionState === "object") {
                  localStorage.setItem("vocabulary-accordion-state", JSON.stringify(data.accordionState));
                  console.log("Imported accordion state:", data.accordionState);
                }
                if (typeof data.useGrouping === "boolean") {
                  localStorage.setItem("vocabulary-use-grouping", JSON.stringify(data.useGrouping));
                  console.log("Imported grouping state:", data.useGrouping);
                }
                if (data.vocabularyNotes && typeof data.vocabularyNotes === "object") {
                  localStorage.setItem("vocabulary-notes", JSON.stringify(data.vocabularyNotes));
                  console.log("Imported vocabulary notes:", data.vocabularyNotes);
                }
                if (data.markedWords && typeof data.markedWords === "object") {
                  localStorage.setItem("vocabulary-marked-words", JSON.stringify(data.markedWords));
                  console.log("Imported marked words:", data.markedWords);
                }
                if (data.grammarRules && Array.isArray(data.grammarRules)) {
                  localStorage.setItem("grammar-rules", JSON.stringify(data.grammarRules));
                  console.log("Imported grammar rules:", data.grammarRules);
                }
                if (data.practiceHistory && Array.isArray(data.practiceHistory)) {
                  localStorage.setItem("flashcard-practice-history", JSON.stringify(data.practiceHistory));
                  console.log("Imported practice history:", data.practiceHistory);
                }
                isSaving.value = false;
                let importMessage = t("vocabulary.save.import.successMessage", { count: data.vocabularies.length }, `Successfully imported ${data.vocabularies.length} vocabulary words`);
                if (data.customTopics?.length > 0) {
                  importMessage += ` + ${data.customTopics.length} custom categories`;
                }
                if (data.groupTopics && Object.keys(data.groupTopics).length > 0) {
                  importMessage += ` + ${Object.keys(data.groupTopics).length} group topics`;
                }
                if (typeof data.useGrouping === "boolean") {
                  importMessage += ` + grouping preference`;
                }
                if (data.vocabularyNotes && Object.keys(data.vocabularyNotes).length > 0) {
                  importMessage += ` + ${Object.keys(data.vocabularyNotes).length} vocabulary notes`;
                }
                if (data.markedWords && Object.keys(data.markedWords).length > 0) {
                  let totalMarkedWords = 0;
                  Object.values(data.markedWords).forEach((words) => {
                    if (Array.isArray(words)) {
                      totalMarkedWords += words.length;
                    }
                  });
                  importMessage += ` + ${totalMarkedWords} marked words`;
                }
                if (data.grammarRules && data.grammarRules.length > 0) {
                  importMessage += ` + ${data.grammarRules.length} grammar rules`;
                }
                if (data.practiceHistory && data.practiceHistory.length > 0) {
                  importMessage += ` + ${data.practiceHistory.length} practice sessions`;
                }
                toast.success(importMessage);
                window.dispatchEvent(new CustomEvent("vocabularyImportComplete", {
                  detail: { useGrouping: data.useGrouping }
                }));
                if (autoSaveEnabled.value) {
                  debounceAutoSave();
                }
              } catch (error) {
                isSaving.value = false;
                console.error(t("vocabulary.save.errors.invalidFile"), error);
                toast.error(t("vocabulary.save.errors.invalidFile", "Invalid file"));
              }
            };
            reader.onerror = () => {
              isSaving.value = false;
              console.error("Error reading file");
              toast.error(t("vocabulary.save.errors.fileReadError", { error: reader.error?.message || "Unknown error" }) || `Error reading file: ${reader.error?.message || "Unknown error"}`);
            };
            reader.readAsText(file);
            toast.dismiss(toastId);
          },
          onCancel: () => {
            isSaving.value = false;
            toast.dismiss(toastId);
          }
        }
      },
      {
        position: POSITION.TOP_CENTER,
        timeout: false,
        closeButton: false,
        draggable: false,
        icon: false
      }
    );
  };
  const tryAutoSaveToGoogleDrive = async (data) => {
    try {
      const isSignedIn = await googleAuth.isSignedIn();
      if (!isSignedIn) {
        console.log("❌ Not signed in to Google Drive or token invalid");
        return false;
      }
      console.log("⬆️ Attempting to auto-save to Google Drive...");
      let lastError = null;
      const maxAttempts = 2;
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          console.log(`📤 Google Drive upload attempt ${attempt}/${maxAttempts}...`);
          const result = await googleDriveApi.uploadVocabularyData(data);
          if (result.success) {
            console.log(`✅ Auto-save to Google Drive completed successfully (attempt ${attempt})`);
            hasGoogleDriveFile.value = true;
            setStoredValue("vocabulary-has-google-drive-file", true);
            return true;
          } else {
            lastError = result.error;
            console.error(`❌ Google Drive save failed (attempt ${attempt}):`, result.error);
            if (result.error?.includes("timeout")) {
              console.log("⏰ Upload timeout detected, stopping retries to avoid excessive wait");
              break;
            }
            if (result.error?.includes("401") || result.error?.includes("unauthorized")) {
              console.log("🔄 Auth error detected, refreshing token...");
              const token = await googleAuth.getAccessToken();
              if (!token) {
                console.log("❌ Token refresh failed, stopping retries");
                break;
              }
            }
            if (attempt < maxAttempts) {
              console.log(`⏳ Waiting ${attempt * 2}s before retry...`);
              await new Promise((resolve) => setTimeout(resolve, 2e3 * attempt));
            }
          }
        } catch (apiError) {
          lastError = apiError;
          const errorMsg2 = apiError?.message || String(apiError);
          console.error(`❌ Google Drive API error (attempt ${attempt}):`, errorMsg2);
          if (errorMsg2.includes("timeout")) {
            console.log("⏰ API timeout detected, stopping retries");
            break;
          }
          if (attempt < maxAttempts) {
            console.log(`⏳ Waiting ${attempt * 2}s before retry...`);
            await new Promise((resolve) => setTimeout(resolve, 2e3 * attempt));
          }
        }
      }
      const errorMsg = lastError?.message || String(lastError);
      console.error("❌ All Google Drive auto-save attempts failed:", errorMsg);
      if (errorMsg?.includes("timeout")) {
        const dataSize = Math.round(JSON.stringify(data).length / 1024);
        console.warn(`⚠️ Auto-save failed due to timeout for ${dataSize}KB file. Consider reducing vocabulary size or checking internet connection.`);
      }
      return false;
    } catch (error) {
      console.error("❌ Error saving to Google Drive:", error);
      return false;
    }
  };
  const setupGoogleDrive = async () => {
    try {
      console.log("Setting up Google Drive auto-save...");
      const isSignedIn = await googleAuth.isSignedIn();
      if (!isSignedIn) {
        const signInResult = await googleAuth.signIn();
        if (!signInResult) {
          toast.error(t("vocabulary.save.errors.googleSignInFailed", "Google sign-in failed") || "Google sign-in failed");
          return false;
        }
      }
      const vocabularyData = getVocabularyData();
      let lastError = null;
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const result = await googleDriveApi.uploadVocabularyData(vocabularyData);
          if (result.success) {
            hasGoogleDriveFile.value = true;
            setStoredValue("vocabulary-has-google-drive-file", true);
            toast.success(t("vocabulary.save.googleDriveSetup", "Google Drive setup successful") || "Google Drive setup successful");
            return true;
          } else {
            lastError = result.error;
            console.error(`❌ Google Drive setup test failed (attempt ${attempt}):`, result.error);
            if (attempt < 2) {
              await new Promise((resolve) => setTimeout(resolve, 1e3));
            }
          }
        } catch (apiError) {
          lastError = apiError;
          console.error(`❌ Google Drive setup API error (attempt ${attempt}):`, apiError);
          if (attempt < 2) {
            await new Promise((resolve) => setTimeout(resolve, 1e3));
          }
        }
      }
      toast.error(t("vocabulary.save.errors.googleDriveSetupFailed", "Google Drive setup failed") || `Google Drive setup failed: ${lastError}`);
      return false;
    } catch (error) {
      console.error("Error setting up Google Drive:", error);
      toast.error(t("vocabulary.save.errors.googleDriveSetupFailed", "Google Drive setup failed") || "Google Drive setup failed");
      return false;
    }
  };
  const syncFromGoogleDrive = async () => {
    try {
      const isSignedIn = await googleAuth.isSignedIn();
      if (!isSignedIn) {
        toast.error(t("vocabulary.save.errors.notSignedIn", "Not signed in to Google") || "Not signed in to Google");
        return false;
      }
      console.log("Syncing from Google Drive...");
      let lastError = null;
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const result = await googleDriveApi.downloadVocabularyData();
          if (result.success && result.data) {
            if (result.data.vocabularies && Array.isArray(result.data.vocabularies)) {
              vocabularyStore.importVocabularies(result.data.vocabularies);
              if (result.data.customTopics && Array.isArray(result.data.customTopics)) {
                localStorage.setItem("customTopics", JSON.stringify(result.data.customTopics));
                vocabularyStore.refreshCustomTopics();
              }
              if (result.data.groupTopics && typeof result.data.groupTopics === "object") {
                localStorage.setItem("vocabulary-group-topics", JSON.stringify(result.data.groupTopics));
              }
              if (result.data.grammarRules && Array.isArray(result.data.grammarRules)) {
                localStorage.setItem("grammar-rules", JSON.stringify(result.data.grammarRules));
              }
              if (result.data.practiceHistory && Array.isArray(result.data.practiceHistory)) {
                localStorage.setItem("flashcard-practice-history", JSON.stringify(result.data.practiceHistory));
              }
              toast.success(t("vocabulary.save.syncFromDriveSuccess", "Successfully synced from Google Drive") || "Successfully synced from Google Drive");
              return true;
            }
          } else {
            lastError = result.error;
            console.error(`❌ Google Drive sync failed (attempt ${attempt}):`, result.error);
            if (attempt < 2) {
              await new Promise((resolve) => setTimeout(resolve, 1e3));
            }
          }
        } catch (apiError) {
          lastError = apiError;
          console.error(`❌ Google Drive sync API error (attempt ${attempt}):`, apiError);
          if (attempt < 2) {
            await new Promise((resolve) => setTimeout(resolve, 1e3));
          }
        }
      }
      toast.error(lastError || t("vocabulary.save.errors.syncFailed", "Sync failed") || "Sync failed");
      return false;
    } catch (error) {
      console.error("Error syncing from Google Drive:", error);
      toast.error(t("vocabulary.save.errors.syncFailed", "Sync failed") || "Sync failed");
      return false;
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      console.log("Initiating Google sign-in...");
      await googleAuth.initialize();
      const result = await googleAuth.signIn();
      if (result) {
        toast.success(t("vocabulary.save.googleSignInSuccess", "Successfully signed in to Google") || "Successfully signed in to Google");
        try {
          const backupInfo = await googleDriveApi.getVocabularyBackupInfo();
          if (backupInfo.exists) {
            hasGoogleDriveFile.value = true;
            setStoredValue("vocabulary-has-google-drive-file", true);
          }
        } catch (backupError) {
          console.warn("⚠️ Could not check backup status after sign-in:", backupError);
        }
      } else {
        toast.error(t("vocabulary.save.errors.googleSignInFailed", "Google sign-in failed") || "Google sign-in failed");
      }
      return result;
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error(t("vocabulary.save.errors.googleSignInFailed", "Google sign-in failed") || "Google sign-in failed");
      return false;
    }
  };
  const handleGoogleSignOut = async () => {
    try {
      await googleAuth.signOut();
      hasGoogleDriveFile.value = false;
      setStoredValue("vocabulary-has-google-drive-file", false);
      toast.success(t("vocabulary.save.googleSignOutSuccess", "Successfully signed out from Google") || "Successfully signed out from Google");
    } catch (error) {
      console.error("Google sign-out error:", error);
      toast.error(t("vocabulary.save.errors.googleSignOutFailed", "Google sign-out failed") || "Google sign-out failed");
    }
  };
  const resetAutoSaveFile = async () => {
    autoSaveFileHandle.value = null;
    hasAutoSaveFile.value = false;
    setStoredValue("vocabulary-has-auto-save-file", false);
    autoSaveFilePath.value = "";
    await clearFileHandleFromIDB();
    console.log("Auto-save file reset completed");
  };
  const getSaveStatusColor = computed(() => {
    switch (saveStatus.value) {
      case "saving":
        return "bg-yellow-500";
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  });
  const getSaveStatusText = computed(() => {
    switch (saveStatus.value) {
      case "saving":
        return autoSaveEnabled.value ? t("vocabulary.save.status.autoSaving", "Auto Saving...") : t("vocabulary.save.status.saving", "Saving...");
      case "success":
        if (autoSaveEnabled.value) {
          if (storageType.value === "google-drive" && hasGoogleDriveFile.value) {
            return t("vocabulary.save.status.autoGoogleDrive", "Auto saved to Google Drive");
          } else if (storageType.value === "local" && hasAutoSaveFile.value) {
            return t("vocabulary.save.status.autoWithFile", "Auto saved to file");
          } else {
            return t("vocabulary.save.status.autoLocalStorage", "Auto saved locally");
          }
        }
        return t("vocabulary.save.status.fileSaved", "Saved to file");
      case "error":
        return t("vocabulary.save.status.error", "Save error");
      default:
        if (autoSaveEnabled.value) {
          if (storageType.value === "google-drive") {
            return googleAuth.isSignedInSync() ? t("vocabulary.save.status.googleDriveReady", "Google Drive ready") : t("vocabulary.save.status.googleDriveSignIn", "Sign in to Google Drive");
          } else {
            return hasAutoSaveFile.value ? t("vocabulary.save.status.autoFile", "Auto save ready") : t("vocabulary.save.status.autoNoFile", "Auto save (no file)");
          }
        }
        return t("vocabulary.save.manual", "Manual save");
    }
  });
  onMounted(async () => {
    console.log("🚀 Component mounted, initializing auto-save...");
    await initializeAutoSave();
    console.log("📱 Initializing Google APIs...");
    try {
      await googleAuth.initialize();
      console.log("✅ Google APIs initialized");
      const isSignedIn = await googleAuth.isSignedIn();
      if (isSignedIn) {
        console.log("✅ Google Drive authentication restored and validated");
        try {
          const backupInfo = await googleDriveApi.getVocabularyBackupInfo();
          if (backupInfo.exists) {
            hasGoogleDriveFile.value = true;
            setStoredValue("vocabulary-has-google-drive-file", true);
            console.log("✅ Google Drive backup file found");
          }
        } catch (error) {
          console.warn("⚠️ Could not check Google Drive backup status:", error);
        }
      } else {
        console.log("⚠️ Google Drive authentication could not be restored");
      }
    } catch (error) {
      console.error("❌ Failed to initialize Google APIs:", error);
    }
  });
  onUnmounted(() => {
    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    if (debounceTimer) clearTimeout(debounceTimer);
  });
  return {
    autoSaveEnabled,
    isSaving,
    lastSaveTime,
    hasAutoSaveFile,
    hasGoogleDriveFile,
    storageType,
    autoSaveFilePath,
    saveStatus,
    getSaveStatusColor,
    getSaveStatusText,
    manualSave,
    debounceAutoSave,
    scheduleAutoSave,
    setupAutoSaveFile,
    setupGoogleDrive,
    syncFromGoogleDrive,
    handleGoogleSignIn,
    handleGoogleSignOut,
    handleFileImport,
    resetAutoSaveFile,
    // Google auth states  
    isGoogleSignedIn: computed(() => googleAuth.isSignedInSync()),
    googleUserEmail: googleAuth.googleUserEmail,
    googleAuthError: googleAuth.authError
  };
}
function useMoveMode() {
  const { t, locale } = useI18n();
  const vocabularyStore = useVocabularyStore();
  const toast = useToast();
  const globalMoveMode = ref(getStoredMoveMode());
  const showMoveModal = ref(false);
  const wordToMove = ref(null);
  const selectedTargetDate = ref("");
  const availableDateGroups = ref([]);
  const currentSourceDate = ref("");
  function getStoredMoveMode() {
    try {
      const stored = localStorage.getItem("vocabulary-global-move-mode-enabled");
      return stored ? JSON.parse(stored) : false;
    } catch (error) {
      console.warn("Failed to parse stored move mode preference:", error);
      return false;
    }
  }
  function setStoredMoveMode(enabled) {
    try {
      localStorage.setItem("vocabulary-global-move-mode-enabled", JSON.stringify(enabled));
    } catch (error) {
      console.warn("Failed to store move mode preference:", error);
    }
  }
  const toggleMoveMode = (enabled) => {
    globalMoveMode.value = enabled;
    setStoredMoveMode(enabled);
  };
  const handleMoveVocabulary = (data) => {
    if (!data.targetDate) {
      wordToMove.value = {
        ...data.word,
        categoryName: data.word.category,
        isBatchMove: false
      };
      currentSourceDate.value = data.sourceDate || "";
      loadAvailableDateGroups(data.word.category);
      showMoveModal.value = true;
    } else {
      performMoveVocabulary(data);
    }
  };
  const loadAvailableDateGroups = (topic) => {
    const allDateGroups = groupVocabulariesByDate(vocabularyStore.allVocabularies.value);
    availableDateGroups.value = allDateGroups.filter((group) => group.date !== currentSourceDate.value).map((group) => ({
      date: group.date,
      count: group.vocabularies.length
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };
  const performMoveVocabulary = async (data) => {
    try {
      const wordIndex = vocabularyStore.allVocabularies.value.findIndex((w) => w.id === data.word.id);
      if (wordIndex !== -1) {
        const updatedWord = {
          ...data.word,
          createdAt: data.targetDate,
          updatedAt: data.targetDate
        };
        vocabularyStore.allVocabularies.value[wordIndex] = updatedWord;
        toast.success(
          t(
            "vocabulary.moveSuccess",
            { word: data.word.word, date: formatDateForDisplay(data.targetDate) },
            `Successfully moved "${data.word.word}" to ${formatDateForDisplay(data.targetDate)}`
          ),
          { timeout: 3e3 }
        );
        console.log(`Moved vocabulary "${data.word.word}" to ${data.targetDate}`);
      } else {
        throw new Error("Word not found");
      }
    } catch (error) {
      console.error("Failed to move vocabulary:", error);
      toast.error(
        t(
          "vocabulary.moveError",
          { word: data.word.word, error: error.message },
          `Failed to move "${data.word.word}": ${error.message}`
        ),
        { timeout: 5e3 }
      );
    }
  };
  const formatDateForDisplay = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale.value, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };
  const closeMoveModal = () => {
    showMoveModal.value = false;
    wordToMove.value = null;
    selectedTargetDate.value = "";
    availableDateGroups.value = [];
    currentSourceDate.value = "";
  };
  const confirmMove = (data) => {
    if (data.word.isBatchMove) {
      performBatchMove(data.targetDate);
    } else {
      performMoveVocabulary(data);
    }
    closeMoveModal();
  };
  const handleBatchMoveCategory = (data) => {
    const batchWords = data.words;
    const categoryName = data.topic;
    wordToMove.value = {
      ...batchWords[0],
      isBatchMove: true,
      batchWords,
      categoryName
    };
    currentSourceDate.value = data.sourceDate;
    const allGroups = groupVocabulariesByDate(vocabularyStore.allVocabularies.value);
    availableDateGroups.value = allGroups.filter((group) => group.date !== data.sourceDate).map((group) => ({
      date: group.date,
      count: group.vocabularies.length
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    showMoveModal.value = true;
  };
  const performBatchMove = async (targetDate) => {
    try {
      const batchWords = wordToMove.value?.batchWords || [];
      const categoryName = wordToMove.value?.categoryName || "";
      batchWords.forEach((word) => {
        const wordIndex = vocabularyStore.allVocabularies.value.findIndex((w) => w.id === word.id);
        if (wordIndex !== -1) {
          const updatedWord = {
            ...word,
            createdAt: targetDate,
            updatedAt: targetDate
          };
          vocabularyStore.allVocabularies.value[wordIndex] = updatedWord;
        }
      });
      toast.success(
        t(
          "vocabulary.batchMoveSuccess",
          { count: batchWords.length, category: categoryName, date: formatDateForDisplay(targetDate) },
          `Successfully moved ${batchWords.length} words from "${categoryName}" to ${formatDateForDisplay(targetDate)}`
        ),
        { timeout: 3e3 }
      );
      console.log(`Batch moved ${batchWords.length} words from category "${categoryName}" to ${targetDate}`);
    } catch (error) {
      console.error("Failed to batch move vocabulary:", error);
      toast.error(
        t(
          "vocabulary.batchMoveError",
          { error: error.message },
          `Failed to batch move: ${error.message}`
        ),
        { timeout: 5e3 }
      );
    }
  };
  return {
    // State
    globalMoveMode,
    showMoveModal,
    wordToMove,
    selectedTargetDate,
    availableDateGroups,
    currentSourceDate,
    // Actions
    toggleMoveMode,
    handleMoveVocabulary,
    handleBatchMoveCategory,
    loadAvailableDateGroups,
    performMoveVocabulary,
    performBatchMove,
    closeMoveModal,
    confirmMove,
    formatDateForDisplay,
    // Helpers
    getStoredMoveMode,
    setStoredMoveMode
  };
}
const _hoisted_1 = { class: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] relative overflow-x-hidden" };
const _hoisted_2 = { class: "relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-3 sm:pt-6" };
const _hoisted_3 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 mb-3 xs:mb-4 sm:mb-6" };
const _hoisted_4 = { class: "flex items-center mb-4" };
const _hoisted_5 = { class: "text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent" };
const _hoisted_6 = { class: "relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto py-3 px-2 xs:py-4 xs:px-3 sm:py-6 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-x-hidden" };
const _hoisted_7 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] mb-3 xs:mb-4 sm:mb-6 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6" };
const _hoisted_8 = { class: "flex items-center mb-4" };
const _hoisted_9 = { class: "text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent" };
const _hoisted_10 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] mb-3 xs:mb-4 sm:mb-6 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6" };
const _hoisted_11 = { class: "flex items-center mb-4" };
const _hoisted_12 = { class: "text-base sm:text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent" };
const _hoisted_13 = { class: "space-y-4 sm:space-y-6" };
const _hoisted_14 = { class: "bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-3 sm:p-4 md:p-5" };
const _hoisted_15 = { class: "flex items-center mb-3 sm:mb-4" };
const _hoisted_16 = { class: "text-sm sm:text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent" };
const _hoisted_17 = { class: "bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-3 sm:p-4 md:p-5" };
const _hoisted_18 = { class: "flex items-center mb-3 sm:mb-4" };
const _hoisted_19 = { class: "text-sm sm:text-base font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent" };
const _hoisted_20 = { class: "bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-3 sm:p-4 md:p-5" };
const _hoisted_21 = { class: "flex items-center mb-3 sm:mb-4" };
const _hoisted_22 = { class: "text-sm sm:text-base font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent" };
const _hoisted_23 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.003] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6" };
const _hoisted_24 = { class: "fixed bottom-6 z-50 left-1/2 translate-x-4 md:translate-x-4 lg:left-auto lg:right-6 lg:translate-x-0" };
const _hoisted_25 = {
  key: 0,
  class: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-black dark:text-white dark:border dark:border-dark-bg-mute rounded shadow-lg whitespace-nowrap z-50"
};
const HOVER_EXPAND_STORAGE_KEY = "vocabulary-hover-expand-enabled";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VocabularyListView",
  setup(__props) {
    const LazyLoadComponent = defineAsyncComponent(() => __vitePreload(() => import("./LazyLoadComponent-DUQ86Zk1.js"), true ? __vite__mapDeps([2,1,3,4]) : void 0));
    const BaseAccordion = defineAsyncComponent(() => __vitePreload(() => import("./BaseAccordion-BADOQwig.js"), true ? __vite__mapDeps([5,1,3,6]) : void 0));
    const GroupingToggle = defineAsyncComponent(() => __vitePreload(() => import("./GroupingToggle-DmtWVkf3.js"), true ? __vite__mapDeps([7,8,1,9,10,11]) : void 0));
    const ConfirmToast2 = defineAsyncComponent(() => __vitePreload(() => import("./ConfirmToast-DsZYvMEQ.js"), true ? __vite__mapDeps([0,1]) : void 0));
    const TopicManagerPanel = defineAsyncComponent(() => __vitePreload(() => import("./TopicManagerPanel-ihJvgpNL.js"), true ? __vite__mapDeps([12,1]) : void 0));
    const SaveControlPanel = defineAsyncComponent(() => __vitePreload(() => import("./SaveControlPanel-BES1cQYg.js"), true ? __vite__mapDeps([13,1]) : void 0));
    const VocabularyHeader = defineAsyncComponent(() => __vitePreload(() => import("./VocabularyHeader-aMnvZ0WN.js"), true ? __vite__mapDeps([14,8,1,9,10,11]) : void 0));
    const VocabularyFilters = defineAsyncComponent(() => __vitePreload(() => import("./VocabularyFilters-jQbw8gPR.js"), true ? __vite__mapDeps([15,8,1,9,10,11,16]) : void 0));
    const VocabularyList = defineAsyncComponent(() => __vitePreload(() => import("./VocabularyList-C-UApZh6.js"), true ? __vite__mapDeps([17,8,1,9,10,11,18,19,16]) : void 0));
    const VocabularyFormDialog = defineAsyncComponent(() => __vitePreload(() => import("./VocabularyFormDialog-7Db94Moa.js"), true ? __vite__mapDeps([20,8,1,9,10,11,21,16,3,22]) : void 0));
    const VocabularyDetailDialog = defineAsyncComponent(() => __vitePreload(() => import("./VocabularyDetailDialog-CLWSumUW.js"), true ? __vite__mapDeps([23,1,24,8,9,10,11,19,16,3,25]) : void 0));
    const VocabularyNoteDialog = defineAsyncComponent(() => __vitePreload(() => import("./VocabularyNoteDialog-D7Ib1Ago.js"), true ? __vite__mapDeps([26,1,19,24,9,10,3,27]) : void 0));
    const GrammarManagerModal = defineAsyncComponent(() => __vitePreload(() => import("./GrammarManagerModal-DxRpsVEZ.js"), true ? __vite__mapDeps([28,8,1,9,10,11,21,19,16,3,29]) : void 0));
    const MoveModal = defineAsyncComponent(() => __vitePreload(() => import("./MoveModal-DnTEJvlr.js"), true ? __vite__mapDeps([30,1,16,3,31]) : void 0));
    const VoiceSelector = defineAsyncComponent(() => __vitePreload(() => import("./VoiceSelector-s8mzgr_N.js"), true ? __vite__mapDeps([32,8,1,9,10,11,24]) : void 0));
    const TopicManager = defineAsyncComponent(() => __vitePreload(() => import("./TopicManager-ChZrObjN.js"), true ? __vite__mapDeps([33,1,3,34]) : void 0));
    const DeleteAllVocabulariesPanel = defineAsyncComponent(() => __vitePreload(() => import("./DeleteAllVocabulariesPanel-CHFC3Jv5.js"), true ? __vite__mapDeps([35,1,9,10,21,8,11,24]) : void 0));
    const { t, locale } = useI18n();
    const toast = useToast();
    const vocabularyStore = useVocabularyStore();
    const voiceStore = useVoiceStore();
    const modalStore = useModalStore();
    const itemsPerPage = ref(5);
    const {
      searchQuery,
      selectedCategory,
      selectedLevel,
      showFavoritesOnly,
      updateShowFavoritesOnly,
      updateSearchQuery,
      updateSelectedCategory,
      updateSelectedLevel
    } = useVocabularyFilters();
    const {
      useGrouping,
      itemsPerPageGrouped,
      dateGroupPages,
      toggleGrouping,
      reloadGroupingState,
      dateGroupPrevious,
      dateGroupNext,
      dateGroupGoToPage
    } = useVocabularyGrouping();
    const getStoredHoverState = () => {
      try {
        const stored = localStorage.getItem(HOVER_EXPAND_STORAGE_KEY);
        return stored ? JSON.parse(stored) : false;
      } catch (error) {
        console.warn("Failed to load hover expand state from localStorage:", error);
        return false;
      }
    };
    const setStoredHoverState = (enabled) => {
      try {
        localStorage.setItem(HOVER_EXPAND_STORAGE_KEY, JSON.stringify(enabled));
      } catch (error) {
        console.warn("Failed to save hover expand state to localStorage:", error);
      }
    };
    const hoverToExpandEnabled = ref(getStoredHoverState());
    const {
      globalMoveMode,
      showMoveModal,
      wordToMove,
      availableDateGroups,
      currentSourceDate,
      toggleMoveMode,
      handleMoveVocabulary,
      handleBatchMoveCategory,
      closeMoveModal,
      confirmMove
    } = useMoveMode();
    const showNoteDialog = ref(false);
    const noteDialogDate = ref("");
    const noteDialogWords = ref([]);
    const filteredVocabulary = computed(() => {
      return vocabularyStore.allVocabularies.value.filter((word) => {
        const matchesSearch = !searchQuery.value || word.word.toLowerCase().includes(searchQuery.value.toLowerCase()) || word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesCategory = !selectedCategory.value || word.category === selectedCategory.value;
        const matchesLevel = !selectedLevel.value || word.level === selectedLevel.value;
        const matchesFavorite = !showFavoritesOnly.value || word.favorite === true;
        return matchesSearch && matchesCategory && matchesLevel && matchesFavorite;
      });
    });
    const {
      currentPage,
      totalPages,
      paginatedVocabulary,
      startIndex,
      endIndex,
      visiblePages,
      previousPage,
      nextPage,
      goToPage
    } = useVocabularyPagination(filteredVocabulary, useGrouping, itemsPerPage);
    const {
      showFormDialog,
      selectedVocabulary,
      showDetailDialog,
      selectedVocabularyForDetail,
      openAddDialog,
      openEditDialog,
      onVocabularySaved: originalOnVocabularySaved,
      openDetailsDialog,
      openEditFromDetail
    } = useVocabularyDialogs();
    const recentlyAddedCategory = ref(null);
    const onVocabularySaved = (data) => {
      originalOnVocabularySaved();
      targetDateForNewVocabulary.value = null;
      if (data?.category) {
        recentlyAddedCategory.value = data.category;
        console.log("Recently added category:", data.category);
      }
      if (autoSaveEnabled.value) {
        debounceAutoSave();
        console.log("Auto-save triggered from Add Word in date group");
      }
      if (useGrouping.value) {
        nextTick(() => {
          reloadGroupingState();
          console.log("Grouping state reloaded after vocabulary saved");
        });
      }
    };
    const {
      autoSaveEnabled,
      isSaving,
      lastSaveTime,
      hasAutoSaveFile,
      hasGoogleDriveFile,
      storageType,
      saveStatus,
      getSaveStatusColor,
      getSaveStatusText,
      manualSave,
      debounceAutoSave,
      scheduleAutoSave,
      setupAutoSaveFile,
      setupGoogleDrive,
      syncFromGoogleDrive,
      handleGoogleSignIn,
      handleGoogleSignOut,
      handleFileImport,
      resetAutoSaveFile,
      autoSaveFilePath,
      isGoogleSignedIn: isGoogleSignedIn2,
      googleUserEmail: googleUserEmail2,
      googleAuthError
    } = useVocabularySaving();
    const {
      showTopicManager,
      openTopicManager,
      onTopicAdded,
      onTopicUpdated,
      onTopicDeleted
    } = useTopicManager(debounceAutoSave);
    const categories = computed(() => {
      const usedCategories = new Set(vocabularyStore.allVocabularies.value.map((vocab) => vocab.category));
      return Array.from(usedCategories).sort();
    });
    const categoryUsage = computed(() => vocabularyStore.getCategoryUsage.value);
    const showStickyButtonVisible = computed(() => {
      return showStickyButton.value && !showFormDialog.value && !modalStore.shouldHideAddNewWord;
    });
    const formattedSaveStatusForAccordion = computed(() => {
      if (!lastSaveTime.value) {
        return t("vocabulary.save.notSaved", "Not saved");
      }
      const statusText = getSaveStatusText.value;
      const timeText = lastSaveTime.value;
      const lastSaveLabel = t("vocabulary.save.lastSave", { time: timeText }, "Last saved: {time}");
      let finalText;
      if (lastSaveLabel && lastSaveLabel.includes("{time}")) {
        finalText = lastSaveLabel.replace("{time}", timeText);
      } else {
        finalText = lastSaveLabel || `Last saved: ${timeText}`;
      }
      return `${finalText} - ${statusText}`;
    });
    const deleteWord = (word) => {
      const toastId = toast(
        {
          component: ConfirmToast2,
          props: {
            message: t("vocabulary.confirmDelete", { word: word.word }),
            confirmText: t("common.confirm"),
            cancelText: t("common.cancel"),
            onConfirm: () => {
              vocabularyStore.deleteVocabulary(word.id);
              debounceAutoSave();
              toast.dismiss(toastId);
              toast.success(t("vocabulary.deleteSuccess", { word: word.word }) || `Successfully deleted "${word.word}"`);
            },
            onCancel: () => {
              toast.dismiss(toastId);
            }
          }
        },
        {
          position: POSITION.TOP_CENTER,
          timeout: false,
          closeButton: false,
          draggable: false,
          icon: false
        }
      );
    };
    const toggleFavorite = (word) => {
      vocabularyStore.toggleFavorite(word.id);
      if (selectedVocabularyForDetail.value && selectedVocabularyForDetail.value.id === word.id) {
        selectedVocabularyForDetail.value.favorite = !selectedVocabularyForDetail.value.favorite;
      }
      debounceAutoSave();
    };
    const playAudio = async (word) => {
      try {
        const utterance = voiceStore.createUtterance(word);
        await new Promise((resolve, reject) => {
          utterance.onend = () => resolve();
          utterance.onerror = (event) => reject(event.error);
          if ("speechSynthesis" in window) {
            speechSynthesis.speak(utterance);
          } else {
            reject(new Error("Speech synthesis not supported"));
          }
        });
      } catch (error) {
        console.error("Error playing audio:", error);
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(word);
          utterance.lang = "en-US";
          speechSynthesis.speak(utterance);
        }
      }
    };
    watch(
      () => vocabularyStore.allVocabularies.value,
      (newVocabularies, oldVocabularies) => {
        const newCount = newVocabularies?.length || 0;
        const oldCount = oldVocabularies?.length || 0;
        if (autoSaveEnabled.value && newCount > 0 && oldCount !== void 0 && newCount !== oldCount) {
          saveStatus.value = "saving";
          debounceAutoSave();
        }
        if (useGrouping.value && newCount !== oldCount && newCount > 0) {
          nextTick(() => {
            reloadGroupingState();
            console.log("Grouping state reloaded due to vocabulary count change");
          });
        }
      },
      { deep: true, immediate: false }
    );
    watch(
      () => vocabularyStore.allVocabularies.value.map((v) => ({ id: v.id, favorite: v.favorite, word: v.word, meaning: v.meaning })),
      (newData, oldData) => {
        if (autoSaveEnabled.value && newData.length > 0 && oldData && JSON.stringify(newData) !== JSON.stringify(oldData)) {
          debounceAutoSave();
        }
      },
      { deep: true }
    );
    watch(
      hoverToExpandEnabled,
      (newValue) => {
        setStoredHoverState(newValue);
      }
    );
    watch(showNoteDialog, (newValue) => {
      if (newValue) {
        document.body.classList.add("modal-open");
      } else {
        if (!showFormDialog.value) {
          document.body.classList.remove("modal-open");
        }
      }
      modalStore.setNoteDialog(newValue);
    });
    watch(showFormDialog, (newValue) => {
      if (newValue) {
        document.body.classList.add("modal-open");
        showStickyTooltip.value = false;
      } else {
        if (!showNoteDialog.value) {
          document.body.classList.remove("modal-open");
        }
      }
      modalStore.setVocabularyForm(newValue);
    });
    onMounted(() => {
      vocabularyStore.initializeStore();
      if (autoSaveEnabled.value) {
        scheduleAutoSave();
      }
      window.addEventListener("vocabulary-notes-updated", () => {
        if (autoSaveEnabled.value) {
          debounceAutoSave();
        }
      });
      window.addEventListener("grammar-rules-updated", () => {
        if (autoSaveEnabled.value) {
          debounceAutoSave();
        }
      });
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    });
    const handleFileImportWithReload = (file) => {
      const handleImportComplete = (event) => {
        nextTick(() => {
          reloadGroupingState();
          console.log("Grouping state reloaded after import");
        });
        window.removeEventListener("vocabularyImportComplete", handleImportComplete);
      };
      window.addEventListener("vocabularyImportComplete", handleImportComplete);
      handleFileImport(file);
    };
    const showStickyButton = ref(false);
    const showStickyTooltip = ref(false);
    const headerHeight = ref(0);
    ref(false);
    const lastScrollY = ref(0);
    const accordionState = ref(true);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const headerElement = document.querySelector("[data-vocabulary-header]") || document.querySelector("header");
      if (headerHeight.value === 0 && headerElement) {
        headerHeight.value = headerElement.offsetHeight;
      }
      const currentAccordionState = (() => {
        try {
          const stored = localStorage.getItem("accordion-vocabulary-header");
          return stored !== null ? JSON.parse(stored) : true;
        } catch {
          return true;
        }
      })();
      accordionState.value = currentAccordionState;
      const originalAddButton = document.querySelector("[data-original-add-button]");
      let originalButtonVisible = false;
      if (originalAddButton) {
        const rect = originalAddButton.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(originalAddButton);
        originalButtonVisible = rect.height > 0 && rect.width > 0 && computedStyle.display !== "none" && computedStyle.visibility !== "hidden" && computedStyle.opacity !== "0";
      }
      const headerBottom = headerHeight.value || 120;
      let shouldShowSticky;
      if (!accordionState.value) {
        shouldShowSticky = true;
      } else if (originalButtonVisible) {
        shouldShowSticky = false;
      } else {
        shouldShowSticky = scrollY > headerBottom;
      }
      showStickyButton.value = shouldShowSticky;
      lastScrollY.value = scrollY;
    };
    const openNoteDialog = (date, words) => {
      noteDialogDate.value = date;
      noteDialogWords.value = words;
      showNoteDialog.value = true;
    };
    const targetDateForNewVocabulary = ref(null);
    const showGrammarManagerModal = ref(false);
    const grammarManagerDate = ref(null);
    const openAddVocabularyForDate = (date) => {
      targetDateForNewVocabulary.value = date;
      selectedVocabulary.value = null;
      showFormDialog.value = true;
      window.dispatchEvent(new CustomEvent("vocabulary-edit-word"));
    };
    const openGrammarManagerForDate = (date) => {
      console.log("Opening grammar manager for date:", date);
      grammarManagerDate.value = date;
      showGrammarManagerModal.value = true;
      modalStore.setGrammarManager(true);
      console.log("Modal state:", showGrammarManagerModal.value);
    };
    watch(showGrammarManagerModal, (newValue) => {
      if (newValue) {
        document.body.classList.add("modal-open");
      } else {
        if (!showNoteDialog.value && !showFormDialog.value) {
          document.body.classList.remove("modal-open");
        }
      }
      modalStore.setGrammarManager(newValue);
    });
    const handleNoteSaved = (note, markedWords) => {
      toast.success(t("vocabulary.notes.saveSuccess", "Notes saved successfully"), {
        timeout: 2e3
      });
      if (autoSaveEnabled.value) {
        toast.info(t("vocabulary.notes.autoSaveNotice", "Notes will be included in auto-save"), {
          timeout: 3e3
        });
        debounceAutoSave();
      }
      console.log(`Note saved for ${noteDialogDate.value} with ${markedWords.length} marked words`);
    };
    const handleVocabulariesDeleted = () => {
      currentPage.value = 1;
      recentlyAddedCategory.value = null;
      if (useGrouping.value) {
        nextTick(() => {
          reloadGroupingState();
          console.log("Grouping state reloaded after delete all");
        });
      }
      if (autoSaveEnabled.value) {
        debounceAutoSave();
      }
    };
    const handleLocalStoreCleared = () => {
      currentPage.value = 1;
      recentlyAddedCategory.value = null;
      useGrouping.value = false;
      autoSaveEnabled.value = false;
      hoverToExpandEnabled.value = false;
      globalMoveMode.value = false;
      nextTick(() => {
        reloadGroupingState();
        console.log("Grouping state reloaded after local store clear");
      });
      toast.info(
        t("vocabulary.deleteAll.localStoreClearedInfo", "Application has been reset to initial state. All local preferences have been cleared."),
        { timeout: 5e3 }
      );
      console.log("Local store cleared, application reset to initial state");
    };
    watch(hoverToExpandEnabled, (newValue) => {
      setStoredHoverState(newValue);
    });
    watch(globalMoveMode, (newValue) => {
      toggleMoveMode(newValue);
    });
    const handleStorageChange = (e) => {
      if (e.key === "accordion-vocabulary-header") {
        setTimeout(() => handleScroll(), 50);
      }
    };
    onMounted(() => {
      document.addEventListener("scroll", handleScroll);
      window.addEventListener("storage", handleStorageChange);
      const accordionButton = document.querySelector("[data-vocabulary-header] button");
      if (accordionButton) {
        accordionButton.addEventListener("click", () => {
          setTimeout(() => handleScroll(), 100);
        });
      }
      handleScroll();
    });
    onUnmounted(() => {
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", handleStorageChange);
      document.body.classList.remove("modal-open");
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[26] || (_cache[26] = createStaticVNode('<div class="absolute inset-0 overflow-hidden pointer-events-none z-0"><div class="floating-shapes"><div class="absolute top-20 left-10 w-64 h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob"></div><div class="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000"></div><div class="absolute -bottom-8 left-20 w-80 h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000"></div><div class="hidden sm:block absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-300 dark:bg-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-1000"></div><div class="hidden sm:block absolute bottom-24 right-24 w-52 h-52 bg-indigo-300 dark:bg-indigo-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-3000"></div><div class="hidden md:block absolute top-1/3 right-1/3 w-36 h-36 bg-emerald-300 dark:bg-emerald-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-1500"></div><div class="hidden md:block absolute -bottom-20 -right-10 w-96 h-96 bg-blue-200 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-2xl opacity-20 animate-blob animation-delay-2500"></div><div class="hidden lg:block absolute top-1/2 -left-16 w-72 h-72 bg-fuchsia-300 dark:bg-fuchsia-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-3500"></div><div class="hidden xl:block absolute top-6 right-1/4 w-44 h-44 bg-teal-300 dark:bg-teal-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-500"></div><div class="hidden sm:block absolute top-1/4 left-6 w-24 h-24 bg-sky-300 dark:bg-sky-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-lg opacity-20 animate-blob animation-delay-4500"></div><div class="hidden sm:block absolute bottom-8 left-1/3 w-28 h-28 bg-rose-300 dark:bg-rose-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-lg opacity-20 animate-blob animation-delay-5500"></div><div class="hidden md:block absolute top-16 right-1/3 w-20 h-20 bg-violet-300 dark:bg-violet-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-lg opacity-20 animate-blob animation-delay-6500"></div><div class="hidden md:block absolute bottom-1/3 right-6 w-24 h-24 bg-lime-300 dark:bg-lime-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-lg opacity-20 animate-blob animation-delay-7500"></div><div class="hidden lg:block absolute top-3/4 left-1/4 w-32 h-32 bg-amber-300 dark:bg-amber-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 animate-blob animation-delay-8500"></div><div class="hidden lg:block absolute top-8 right-8 w-16 h-16 bg-orange-300 dark:bg-orange-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-md opacity-25 animate-blob animation-delay-1200"></div><div class="hidden xl:block absolute bottom-10 left-1/2 -translate-x-1/2 w-28 h-28 bg-cyan-200 dark:bg-cyan-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-15 animate-blob animation-delay-2200"></div><div class="hidden 2xl:block absolute top-1/5 right-1/5 w-40 h-40 bg-indigo-200 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-2xl opacity-15 animate-blob animation-delay-5200"></div><div class="hidden lg:block absolute -top-24 left-1/3 w-96 h-96 bg-blue-100 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10 animate-blob animation-delay-900"></div><div class="hidden lg:block absolute bottom-[-120px] left-[-80px] w-[420px] h-[420px] bg-purple-100 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10 animate-blob animation-delay-1900"></div><div class="hidden xl:block absolute top-1/3 left-[70%] w-48 h-48 bg-pink-200 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-2xl opacity-15 animate-blob animation-delay-3300"></div><div class="hidden xl:block absolute bottom-1/4 right-[35%] w-32 h-32 bg-cyan-300 dark:bg-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-15 animate-blob animation-delay-6100"></div><div class="hidden 2xl:block absolute top-[12%] left-[12%] w-56 h-56 bg-emerald-200 dark:bg-emerald-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-2xl opacity-15 animate-blob animation-delay-7100"></div><div class="hidden 2xl:block absolute bottom-[8%] right-[12%] w-64 h-64 bg-teal-200 dark:bg-teal-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-2xl opacity-15 animate-blob animation-delay-9100"></div></div></div>', 1)),
        createBaseVNode("div", _hoisted_2, [
          createVNode(unref(LazyLoadComponent), {
            "animation-type": "fade-up",
            threshold: 0.1,
            "root-margin": "0px"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_3, [
                createBaseVNode("div", _hoisted_4, [
                  _cache[18] || (_cache[18] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                    createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mr-2.5" })
                  ], -1)),
                  createBaseVNode("h1", _hoisted_5, toDisplayString(unref(t)("vocabulary.header.title", "Vocabulary")), 1)
                ]),
                createVNode(unref(VocabularyHeader), { onAddVocabulary: unref(openAddDialog) }, null, 8, ["onAddVocabulary"])
              ])
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_6, [
          createVNode(unref(LazyLoadComponent), {
            "animation-type": "slide-left",
            threshold: 0.1,
            "root-margin": "-50px"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_7, [
                createBaseVNode("div", _hoisted_8, [
                  _cache[19] || (_cache[19] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                    createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-2.5" })
                  ], -1)),
                  createBaseVNode("h3", _hoisted_9, toDisplayString(unref(t)("vocabulary.filters.title", "Filters")), 1)
                ]),
                createVNode(unref(VocabularyFilters), {
                  "search-query": unref(searchQuery),
                  "selected-category": unref(selectedCategory),
                  "selected-level": unref(selectedLevel),
                  categories: categories.value,
                  "show-favorites-only": unref(showFavoritesOnly),
                  "onUpdate:searchQuery": unref(updateSearchQuery),
                  "onUpdate:selectedCategory": unref(updateSelectedCategory),
                  "onUpdate:selectedLevel": unref(updateSelectedLevel),
                  "onUpdate:showFavoritesOnly": unref(updateShowFavoritesOnly)
                }, null, 8, ["search-query", "selected-category", "selected-level", "categories", "show-favorites-only", "onUpdate:searchQuery", "onUpdate:selectedCategory", "onUpdate:selectedLevel", "onUpdate:showFavoritesOnly"])
              ])
            ]),
            _: 1
          }),
          createVNode(unref(LazyLoadComponent), {
            "animation-type": "slide-right",
            threshold: 0.1,
            "root-margin": "-50px"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_10, [
                createBaseVNode("div", _hoisted_11, [
                  _cache[20] || (_cache[20] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                    createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-2.5" })
                  ], -1)),
                  createBaseVNode("h3", _hoisted_12, toDisplayString(unref(t)("vocabulary.grouping.title", "Grouping & Move Mode")), 1)
                ]),
                createVNode(unref(GroupingToggle), {
                  "model-value": unref(useGrouping),
                  "hover-enabled": hoverToExpandEnabled.value,
                  "move-mode": unref(globalMoveMode),
                  "onUpdate:modelValue": unref(toggleGrouping),
                  "onUpdate:hoverEnabled": _cache[0] || (_cache[0] = ($event) => hoverToExpandEnabled.value = $event),
                  "onUpdate:moveMode": _cache[1] || (_cache[1] = ($event) => globalMoveMode.value = $event)
                }, null, 8, ["model-value", "hover-enabled", "move-mode", "onUpdate:modelValue"])
              ])
            ]),
            _: 1
          }),
          createVNode(unref(LazyLoadComponent), {
            "animation-type": "scale",
            threshold: 0.1,
            "root-margin": "-50px"
          }, {
            default: withCtx(() => [
              createVNode(unref(BaseAccordion), {
                title: unref(t)("vocabulary.tools.accordionTitle", "Tools & Settings"),
                description: unref(t)("vocabulary.tools.accordionDescription", "Voice settings, topic manager, and save & sync options"),
                icon: "settings",
                "default-open": true,
                "persist-key": "vocabulary-tools",
                "status-text": formattedSaveStatusForAccordion.value,
                "status-color": unref(getSaveStatusColor),
                "show-status-when-closed": true,
                class: "mb-3 xs:mb-4 sm:mb-6"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_13, [
                    createBaseVNode("div", _hoisted_14, [
                      createBaseVNode("div", _hoisted_15, [
                        _cache[21] || (_cache[21] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                          createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-2.5" })
                        ], -1)),
                        createBaseVNode("h3", _hoisted_16, toDisplayString(unref(t)("voice.settings.title", "Voice Settings")), 1)
                      ]),
                      createVNode(unref(VoiceSelector), { "show-voice-info": true })
                    ]),
                    createBaseVNode("div", _hoisted_17, [
                      createBaseVNode("div", _hoisted_18, [
                        _cache[22] || (_cache[22] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                          createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-2.5" })
                        ], -1)),
                        createBaseVNode("h3", _hoisted_19, toDisplayString(unref(t)("vocabulary.topicManager.title", "Topic Manager")), 1)
                      ]),
                      createVNode(unref(TopicManagerPanel), { onOpen: unref(openTopicManager) }, null, 8, ["onOpen"])
                    ]),
                    createBaseVNode("div", _hoisted_20, [
                      createBaseVNode("div", _hoisted_21, [
                        _cache[23] || (_cache[23] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                          createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-2.5" })
                        ], -1)),
                        createBaseVNode("h3", _hoisted_22, toDisplayString(unref(t)("vocabulary.save.title", "Save & Sync")), 1)
                      ]),
                      createVNode(unref(SaveControlPanel), {
                        "auto-save-enabled": unref(autoSaveEnabled),
                        "onUpdate:autoSaveEnabled": _cache[2] || (_cache[2] = ($event) => autoSaveEnabled.value = $event),
                        "is-saving": unref(isSaving),
                        "has-auto-save-file": unref(hasAutoSaveFile),
                        "onUpdate:hasAutoSaveFile": _cache[3] || (_cache[3] = ($event) => hasAutoSaveFile.value = $event),
                        "has-google-drive-file": unref(hasGoogleDriveFile),
                        "onUpdate:hasGoogleDriveFile": _cache[4] || (_cache[4] = ($event) => hasGoogleDriveFile.value = $event),
                        "storage-type": unref(storageType),
                        "onUpdate:storageType": _cache[5] || (_cache[5] = ($event) => storageType.value = $event),
                        "is-google-signed-in": unref(isGoogleSignedIn2),
                        "onUpdate:isGoogleSignedIn": _cache[6] || (_cache[6] = ($event) => isGoogleSignedIn2.value = $event),
                        "google-user-email": unref(googleUserEmail2),
                        "google-auth-error": unref(googleAuthError),
                        "auto-save-file-path": unref(autoSaveFilePath),
                        "onUpdate:autoSaveFilePath": _cache[7] || (_cache[7] = ($event) => autoSaveFilePath.value = $event),
                        "last-save-time": unref(lastSaveTime),
                        "save-status-color": unref(getSaveStatusColor),
                        "save-status-text": unref(getSaveStatusText),
                        onManualSave: unref(manualSave),
                        onSetupAutoSave: unref(setupAutoSaveFile),
                        onSetupGoogleDrive: unref(setupGoogleDrive),
                        onGoogleSignIn: unref(handleGoogleSignIn),
                        onGoogleSignOut: unref(handleGoogleSignOut),
                        onSyncFromGoogleDrive: unref(syncFromGoogleDrive),
                        onResetAutoSave: unref(resetAutoSaveFile),
                        onImportFile: handleFileImportWithReload
                      }, null, 8, ["auto-save-enabled", "is-saving", "has-auto-save-file", "has-google-drive-file", "storage-type", "is-google-signed-in", "google-user-email", "google-auth-error", "auto-save-file-path", "last-save-time", "save-status-color", "save-status-text", "onManualSave", "onSetupAutoSave", "onSetupGoogleDrive", "onGoogleSignIn", "onGoogleSignOut", "onSyncFromGoogleDrive", "onResetAutoSave"])
                    ]),
                    createVNode(unref(DeleteAllVocabulariesPanel), {
                      "total-count": filteredVocabulary.value.length,
                      "auto-save-enabled": unref(autoSaveEnabled),
                      "use-grouping": unref(useGrouping),
                      onVocabulariesDeleted: handleVocabulariesDeleted,
                      onLocalStoreCleared: handleLocalStoreCleared
                    }, null, 8, ["total-count", "auto-save-enabled", "use-grouping"])
                  ])
                ]),
                _: 1
              }, 8, ["title", "description", "status-text", "status-color"])
            ]),
            _: 1
          }),
          createVNode(unref(LazyLoadComponent), {
            "animation-type": "slide-left",
            threshold: 0.05,
            "root-margin": "-50px"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_23, [
                createVNode(unref(VocabularyList), {
                  "paginated-words": unref(useGrouping) ? [] : unref(paginatedVocabulary),
                  "current-page": unref(currentPage),
                  "total-pages": unref(totalPages),
                  "total-count": filteredVocabulary.value.length,
                  "start-index": unref(startIndex),
                  "end-index": unref(endIndex),
                  "visible-pages": unref(visiblePages),
                  "use-grouping": unref(useGrouping),
                  "all-words": unref(useGrouping) ? filteredVocabulary.value : void 0,
                  "date-group-pages": unref(dateGroupPages),
                  "items-per-page-grouped": unref(itemsPerPageGrouped),
                  "hover-to-expand-enabled": hoverToExpandEnabled.value,
                  "global-move-mode": unref(globalMoveMode),
                  "recently-added-category": recentlyAddedCategory.value,
                  onPlayAudio: playAudio,
                  onEditWord: unref(openEditDialog),
                  onDeleteWord: deleteWord,
                  onToggleFavorite: toggleFavorite,
                  onViewDetails: unref(openDetailsDialog),
                  onPreviousPage: unref(previousPage),
                  onNextPage: unref(nextPage),
                  onGoToPage: unref(goToPage),
                  onDateGroupPrevious: _cache[8] || (_cache[8] = (date) => unref(dateGroupPrevious)(date, filteredVocabulary.value)),
                  onDateGroupNext: _cache[9] || (_cache[9] = (date) => unref(dateGroupNext)(date, filteredVocabulary.value)),
                  onDateGroupGoToPage: unref(dateGroupGoToPage),
                  onMoveVocabulary: unref(handleMoveVocabulary),
                  onOpenNoteDialog: openNoteDialog,
                  onOpenAddVocabularyDialog: openAddVocabularyForDate,
                  onOpenGrammarManager: openGrammarManagerForDate,
                  onBatchMoveCategory: unref(handleBatchMoveCategory)
                }, null, 8, ["paginated-words", "current-page", "total-pages", "total-count", "start-index", "end-index", "visible-pages", "use-grouping", "all-words", "date-group-pages", "items-per-page-grouped", "hover-to-expand-enabled", "global-move-mode", "recently-added-category", "onEditWord", "onViewDetails", "onPreviousPage", "onNextPage", "onGoToPage", "onDateGroupGoToPage", "onMoveVocabulary", "onBatchMoveCategory"])
              ])
            ]),
            _: 1
          })
        ]),
        createVNode(unref(VocabularyFormDialog), {
          modelValue: unref(showFormDialog),
          "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => isRef(showFormDialog) ? showFormDialog.value = $event : null),
          vocabulary: unref(selectedVocabulary),
          "target-date": targetDateForNewVocabulary.value,
          onVocabularySaved
        }, null, 8, ["modelValue", "vocabulary", "target-date"]),
        createVNode(unref(VocabularyDetailDialog), {
          modelValue: unref(showDetailDialog),
          "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => isRef(showDetailDialog) ? showDetailDialog.value = $event : null),
          vocabulary: unref(selectedVocabularyForDetail),
          onEditVocabulary: unref(openEditFromDetail),
          onToggleFavorite: toggleFavorite
        }, null, 8, ["modelValue", "vocabulary", "onEditVocabulary"]),
        createVNode(unref(TopicManager), {
          modelValue: unref(showTopicManager),
          "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => isRef(showTopicManager) ? showTopicManager.value = $event : null),
          "vocabulary-usage": categoryUsage.value,
          onTopicAdded: unref(onTopicAdded),
          onTopicUpdated: unref(onTopicUpdated),
          onTopicDeleted: unref(onTopicDeleted)
        }, null, 8, ["modelValue", "vocabulary-usage", "onTopicAdded", "onTopicUpdated", "onTopicDeleted"]),
        createVNode(unref(VocabularyNoteDialog), {
          modelValue: showNoteDialog.value,
          "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => showNoteDialog.value = $event),
          date: noteDialogDate.value,
          "today-words": noteDialogWords.value,
          onSaveNote: handleNoteSaved
        }, null, 8, ["modelValue", "date", "today-words"]),
        createVNode(unref(GrammarManagerModal), {
          modelValue: showGrammarManagerModal.value,
          "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => showGrammarManagerModal.value = $event),
          selectedDate: grammarManagerDate.value
        }, null, 8, ["modelValue", "selectedDate"]),
        createVNode(Transition, { name: "fade-scale" }, {
          default: withCtx(() => [
            withDirectives(createBaseVNode("div", _hoisted_24, [
              createBaseVNode("button", {
                onClick: _cache[15] || (_cache[15] = //@ts-ignore
                (...args) => unref(openAddDialog) && unref(openAddDialog)(...args)),
                onMouseenter: _cache[16] || (_cache[16] = ($event) => showStickyTooltip.value = true),
                onMouseleave: _cache[17] || (_cache[17] = ($event) => showStickyTooltip.value = false),
                class: "relative bg-blue-500 hover:bg-blue-600 text-white font-medium w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              }, [
                _cache[25] || (_cache[25] = createBaseVNode("svg", {
                  class: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8",
                  fill: "currentColor",
                  viewBox: "0 0 20 20"
                }, [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                showStickyTooltip.value ? (openBlock(), createElementBlock("div", _hoisted_25, [
                  createTextVNode(toDisplayString(unref(t)("vocabulary.addNew", "Add New Word")) + " ", 1),
                  _cache[24] || (_cache[24] = createBaseVNode("div", { class: "absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-black" }, null, -1))
                ])) : createCommentVNode("", true)
              ], 32)
            ], 512), [
              [vShow, showStickyButtonVisible.value]
            ])
          ]),
          _: 1
        }),
        createVNode(unref(MoveModal), {
          "show-modal": unref(showMoveModal),
          "word-to-move": unref(wordToMove),
          "available-date-groups": unref(availableDateGroups),
          "source-date": unref(currentSourceDate),
          "all-vocabularies": unref(vocabularyStore).allVocabularies.value,
          onClose: unref(closeMoveModal),
          onConfirmMove: unref(confirmMove)
        }, null, 8, ["show-modal", "word-to-move", "available-date-groups", "source-date", "all-vocabularies", "onClose", "onConfirmMove"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=VocabularyListView-D60xaPfK.js.map
