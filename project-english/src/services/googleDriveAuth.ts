import { ref, computed } from 'vue';

// Google Drive API configuration
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || '';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email';

// Global state
const isGoogleApiLoaded = ref(false);
const isGoogleSignedIn = ref(false);
const googleUser = ref<any>(null);
const googleUserEmail = ref<string>('');
const authError = ref<string>('');

// LocalStorage keys for persistence
const GOOGLE_TOKEN_KEY = 'vocabulary-google-token';
const GOOGLE_USER_KEY = 'vocabulary-google-user';
const GOOGLE_USER_EMAIL_KEY = 'vocabulary-google-user-email';
const GOOGLE_SIGNED_IN_KEY = 'vocabulary-is-google-signed-in';

/**
 * Google Drive Authentication Service
 * Handles Google OAuth 2.0 authentication for Drive API access
 */
export class GoogleDriveAuth {
  private static instance: GoogleDriveAuth;
  private gapi: any = null;
  private tokenClient: any = null;
  private autoRefreshTimer: number | null = null;

  private constructor() {
    // Restore saved auth state on initialization
    this.loadSavedAuthState();
  }

  public static getInstance(): GoogleDriveAuth {
    if (!GoogleDriveAuth.instance) {
      GoogleDriveAuth.instance = new GoogleDriveAuth();
    }
    return GoogleDriveAuth.instance;
  }

  /**
   * Load saved authentication state from localStorage
   */
  private loadSavedAuthState(): void {
    try {
      const savedToken = localStorage.getItem(GOOGLE_TOKEN_KEY);
      const savedUser = localStorage.getItem(GOOGLE_USER_KEY);
      const savedEmail = localStorage.getItem(GOOGLE_USER_EMAIL_KEY);
      const savedSignedIn = localStorage.getItem(GOOGLE_SIGNED_IN_KEY);

      if (savedToken && savedUser && savedSignedIn === 'true') {
        console.log('📂 Loading saved Google authentication state...');
        
        // Parse saved data
        const tokenData = JSON.parse(savedToken);
        const userData = JSON.parse(savedUser);
        
        // Check if token is expired (Custom: 3 months)
        const tokenAge = Date.now() - (tokenData.timestamp || 0);
        const isTokenExpired = tokenAge > (90 * 24 * 60 * 60 * 1000); // 90 days (3 months)
        
        // Persist login state even if token is expired; we'll refresh later
        googleUser.value = userData;
        googleUserEmail.value = savedEmail || '';
        isGoogleSignedIn.value = true;
        if (isTokenExpired) {
          console.log('⏰ Saved Google token expired, will attempt silent refresh later');
        } else {
          console.log('✅ Google authentication state restored from localStorage');
        }
      } else {
        console.log('ℹ️ No saved Google authentication state found');
      }
    } catch (error) {
      console.error('❌ Error loading saved auth state:', error);
      // Do not clear saved state aggressively; keep as-is to allow later recovery
    }
  }

  /**
   * Save authentication state to localStorage
   */
  private saveAuthState(token: any, user: any, email?: string): void {
    try {
      localStorage.setItem(GOOGLE_TOKEN_KEY, JSON.stringify({
        access_token: token.access_token,
        timestamp: Date.now()
      }));
      localStorage.setItem(GOOGLE_USER_KEY, JSON.stringify(user));
      localStorage.setItem(GOOGLE_SIGNED_IN_KEY, 'true');
      if (email) {
        localStorage.setItem(GOOGLE_USER_EMAIL_KEY, email);
      }
      console.log('💾 Google auth state saved to localStorage');
    } catch (error) {
      console.error('❌ Error saving auth state:', error);
    }
  }

  /**
   * Clear saved authentication state from localStorage
   */
  private clearSavedAuthState(): void {
    try {
      localStorage.removeItem(GOOGLE_TOKEN_KEY);
      localStorage.removeItem(GOOGLE_USER_KEY);
      localStorage.removeItem(GOOGLE_USER_EMAIL_KEY);
      localStorage.removeItem(GOOGLE_SIGNED_IN_KEY);
      console.log('🗑️ Google auth state cleared from localStorage');
    } catch (error) {
      console.error('❌ Error clearing auth state:', error);
    }
  }

  /**
   * Initialize Google APIs
   */
  async initialize(): Promise<void> {
    if (isGoogleApiLoaded.value && this.tokenClient && this.gapi) {
      console.log('Google APIs already initialized');
      return;
    }

    try {
      console.log('🚀 Initializing Google APIs...');
      
      // Clear any previous errors
      authError.value = '';
      
      // Load Google API scripts
      await this.loadGoogleScripts();
      
      // Initialize GAPI and GIS
      await Promise.all([
        this.initializeGapi(),
        this.initializeGIS()
      ]);
      
      // Verify initialization
      if (!this.tokenClient || !this.gapi) {
        throw new Error('Google APIs initialization incomplete');
      }
      
      isGoogleApiLoaded.value = true;
      console.log('✅ Google APIs initialized successfully');
      
      // Restore saved token to gapi if available
      await this.restoreTokenToGapi();

      // Start auto refresh if user is signed in
      if (isGoogleSignedIn.value) {
        this.startAutoRefresh();
        this.attachLifecycleListeners();
      }
    } catch (error) {
      console.error('❌ Failed to initialize Google APIs:', error);
      authError.value = 'Failed to initialize Google APIs';
      isGoogleApiLoaded.value = false;
      throw error;
    }
  }

  /**
   * Restore saved token to gapi client
   */
  private async restoreTokenToGapi(): Promise<void> {
    try {
      const savedToken = localStorage.getItem(GOOGLE_TOKEN_KEY);
      if (savedToken && this.gapi && isGoogleSignedIn.value) {
        const tokenData = JSON.parse(savedToken);
        
        // Check if token is still valid
        const tokenAge = Date.now() - (tokenData.timestamp || 0);
        const isTokenExpired = tokenAge > (90 * 24 * 60 * 60 * 1000); // 90 days (3 months)
        
        if (!isTokenExpired) {
          console.log('🔑 Restoring token to GAPI client...');
          this.gapi.client.setToken({ access_token: tokenData.access_token });
          console.log('✅ Token restored to GAPI client');
          
          // Verify token works by making a test API call
          await this.verifyTokenValidity();
        } else {
          console.log('⏰ Token expired during restoration, attempting silent refresh...');
          const refreshSuccess = await this.attemptSilentRefresh();
          if (!refreshSuccess) {
            // Keep login state; user may need to interact later, but do not clear saved state
            console.log('⚠️ Silent refresh failed during restoration. Keeping saved login state.');
            authError.value = 'Token expired; will require refresh on next action';
          }
        }
      }
    } catch (error) {
      console.error('❌ Error restoring token to GAPI:', error);
      authError.value = 'Failed to restore authentication';
    }
  }

  /**
   * Load Google API scripts dynamically
   */
  private async loadGoogleScripts(): Promise<void> {
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript && (window as any).gapi && (window as any).google) {
          resolve();
          return;
        }
        
        const script = document.createElement('script');
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
        loadScript('https://apis.google.com/js/api.js'),
        loadScript('https://accounts.google.com/gsi/client')
      ]);
      
      // Wait a bit for scripts to be ready
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Verify global objects are available
      if (!(window as any).gapi) {
        throw new Error('Google API (gapi) not loaded');
      }
      if (!(window as any).google?.accounts) {
        throw new Error('Google Identity Services not loaded');
      }
      
      console.log('📚 Google scripts loaded and verified');
    } catch (error) {
      console.error('❌ Error loading Google scripts:', error);
      throw error;
    }
  }

  /**
   * Initialize Google API client
   */
  private async initializeGapi(): Promise<void> {
    return new Promise((resolve, reject) => {
      window.gapi.load('client', async () => {
        try {
          await window.gapi.client.init({
            apiKey: GOOGLE_API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
          });
          
          this.gapi = window.gapi;
          console.log('✅ GAPI client initialized');
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
  private async initializeGIS(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: SCOPES,
          callback: (response: any) => {
            if (response.error) {
              console.error('❌ Token client error:', response.error);
              authError.value = response.error_description || 'Authentication failed';
              isGoogleSignedIn.value = false;
            } else {
              console.log('✅ Token received successfully');
              this.handleAuthSuccess(response);
            }
          },
        });
        
        console.log('✅ Google Identity Services initialized');
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Sign in to Google account
   */
  async signIn(): Promise<boolean> {
    try {
      console.log('🔐 Initiating Google sign-in...');
      
      // Auto-initialize if not already done
      if (!this.tokenClient || !isGoogleApiLoaded.value) {
        console.log('📡 Auto-initializing Google APIs for sign-in...');
        await this.initialize();
      }

      if (!this.tokenClient) {
        throw new Error('Failed to initialize Google Identity Services');
      }

      // Clear any previous errors
      authError.value = '';

      // Request access token
      this.tokenClient.requestAccessToken({ prompt: 'consent' });

      // Return promise that resolves when auth completes
      return new Promise((resolve) => {
        const timeoutId = setTimeout(() => {
          console.warn('⚠️ Google sign-in timeout');
          authError.value = 'Sign-in timeout';
          resolve(false);
        }, 30000); // 30 second timeout

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
      console.error('❌ Sign-in failed:', error);
      authError.value = 'Sign-in failed';
      return false;
    }
  }

  /**
   * Sign out from Google account
   */
  async signOut(): Promise<void> {
    try {
      if (this.gapi?.client?.getToken()) {
        window.google.accounts.oauth2.revoke(this.gapi.client.getToken().access_token);
      }
      
      // Clear local state
      isGoogleSignedIn.value = false;
      googleUser.value = null;
      googleUserEmail.value = '';
      authError.value = '';
      this.stopAutoRefresh();
      this.detachLifecycleListeners();
      
      // Clear saved authentication state from localStorage
      this.clearSavedAuthState();
      
      console.log('✅ Signed out successfully and cleared saved state');
    } catch (error) {
      console.error('❌ Sign-out failed:', error);
      throw error;
    }
  }

  /**
   * Handle successful authentication
   */
  private async handleAuthSuccess(response: any): Promise<void> {
    googleUser.value = response;
    isGoogleSignedIn.value = true;
    this.gapi.client.setToken({ access_token: response.access_token });
    
    // Fetch user email from Google API
    const userEmail = await this.fetchUserEmail();
    console.log('🔍 Fetched user email:', userEmail);
    if (userEmail) {
      googleUserEmail.value = userEmail;
      console.log('✅ Email set to reactive state:', googleUserEmail.value);
    } else {
      console.log('❌ No email received from API');
    }
    
    // Save authentication state to localStorage for persistence
    this.saveAuthState({ access_token: response.access_token }, response, userEmail || undefined);
    
    console.log('🔑 Authentication successful and persisted');
    // Ensure auto refresh is running
    this.startAutoRefresh();
  }

  /**
   * Verify token validity with a test API call
   */
  private async verifyTokenValidity(): Promise<boolean> {
    try {
      if (!this.gapi?.client) return false;
      
      // Make a simple API call to verify token works
      const response = await this.gapi.client.request({
        path: 'https://www.googleapis.com/drive/v3/about?fields=user'
      });
      
      if (response.status === 200) {
        console.log('✅ Token verification successful');
        return true;
      } else {
        console.log('❌ Token verification failed:', response.status);
        return false;
      }
    } catch (error) {
      console.log('❌ Token verification error:', error);
      return false;
    }
  }

  /**
   * Attempt silent token refresh
   */
  private async attemptSilentRefresh(): Promise<boolean> {
    try {
      if (!this.tokenClient) {
        console.log('❌ No token client available for refresh');
        return false;
      }
      
      console.log('🔄 Attempting silent token refresh...');
      
      // Use prompt: 'none' for true silent refresh (no user interaction at all)
      return new Promise((resolve) => {
        const originalCallback = this.tokenClient.callback;
        let timeoutId: number | undefined;
        
        this.tokenClient.callback = (response: any) => {
          // Restore original callback
          this.tokenClient.callback = originalCallback;
          if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
          }
          
          if (response.error) {
            console.log('❌ Silent refresh failed:', response.error);
            // If error indicates user interaction required, don't retry
            if (response.error === 'interaction_required' || response.error === 'login_required') {
              console.log('⚠️ Silent refresh requires user interaction, skipping');
            }
            resolve(false);
          } else {
            console.log('✅ Silent refresh successful');
            this.handleAuthSuccess(response);
            resolve(true);
          }
        };
        
        try {
          // Use prompt: 'none' for true silent refresh
          this.tokenClient.requestAccessToken({ prompt: 'none' });
          
          // Set timeout for silent refresh
          timeoutId = setTimeout(() => {
            this.tokenClient.callback = originalCallback;
            console.log('⏰ Silent refresh timeout');
            resolve(false);
          }, 5000); // Shorter 5 second timeout for silent operations
        } catch (error) {
          this.tokenClient.callback = originalCallback;
          if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
          }
          console.log('❌ Silent refresh request failed:', error);
          resolve(false);
        }
      });
    } catch (error) {
      console.error('❌ Silent refresh error:', error);
      return false;
    }
  }

  /**
   * Get current access token with automatic refresh if needed
   */
  async getAccessToken(): Promise<string | null> {
    try {
      let currentToken = this.gapi?.client?.getToken()?.access_token;
      
      if (!currentToken) {
        console.log('❌ No current token available, trying silent refresh...');
        const refreshed = await this.attemptSilentRefresh();
        if (!refreshed) {
          return null;
        }
        currentToken = this.gapi?.client?.getToken()?.access_token;
      }
      
      // Check if token is about to expire (refresh 3 months early)
      const savedToken = localStorage.getItem(GOOGLE_TOKEN_KEY);
      if (savedToken) {
        const tokenData = JSON.parse(savedToken);
        const tokenAge = Date.now() - (tokenData.timestamp || 0);
        const isNearExpiry = tokenAge > (90 * 24 * 60 * 60 * 1000); // 90 days (3 months)
        
        if (isNearExpiry) {
          console.log('🔄 Token near expiry, attempting refresh...');
          const refreshSuccess = await this.attemptSilentRefresh();
          if (refreshSuccess) {
            return this.gapi?.client?.getToken()?.access_token || null;
          } else {
            console.log('⚠️ Token refresh failed, keeping saved login state');
            return null;
          }
        }
      }
      
      return currentToken;
    } catch (error) {
      console.error('❌ Error getting access token:', error);
      return null;
    }
  }

  /**
   * Check if user is signed in with token validation
   */
  async isSignedIn(): Promise<boolean> {
    if (!isGoogleSignedIn.value) {
      return false;
    }
    
    // Verify we actually have a valid token
    const token = await this.getAccessToken();
    return token !== null || isGoogleSignedIn.value;
  }

  /**
   * Synchronous check for signed in state (for compatibility)
   */
  isSignedInSync(): boolean {
    return isGoogleSignedIn.value; // Persist login state regardless of token presence
  }

  /**
   * Get current authentication error
   */
  getAuthError(): string {
    return authError.value;
  }

  /**
   * Auto refresh helpers
   */
  private startAutoRefresh() {
    this.stopAutoRefresh();
    // Refresh every 3 months
    this.autoRefreshTimer = window.setInterval(async () => {
      if (!isGoogleSignedIn.value) return;
      
      // Only refresh if token is actually near expiry
      const needsRefresh = await this.shouldRefreshToken();
      if (needsRefresh) {
        console.log('⏱️ Auto-refresh timer triggered - token needs refresh');
        await this.attemptSilentRefresh();
      } else {
        console.log('⏱️ Auto-refresh timer checked - token still valid');
      }
    }, 90 * 24 * 60 * 60 * 1000); // 90 days (3 months)
    console.log('🕒 Auto-refresh timer started');
  }

  private stopAutoRefresh() {
    if (this.autoRefreshTimer) {
      clearInterval(this.autoRefreshTimer);
      this.autoRefreshTimer = null;
      console.log('🛑 Auto-refresh timer stopped');
    }
  }

  private visibilityHandler = async () => {
    if (document.visibilityState === 'visible' && isGoogleSignedIn.value) {
      // Only refresh if token is actually near expiry
      const needsRefresh = await this.shouldRefreshToken();
      if (needsRefresh) {
        console.log('👀 Page visible, token needs refresh');
        await this.attemptSilentRefresh();
      } else {
        console.log('👀 Page visible, token still valid');
      }
    }
  };

  private onlineHandler = async () => {
    if (navigator.onLine && isGoogleSignedIn.value) {
      // Only refresh if token is actually near expiry
      const needsRefresh = await this.shouldRefreshToken();
      if (needsRefresh) {
        console.log('🌐 Back online, token needs refresh');
        await this.attemptSilentRefresh();
      } else {
        console.log('🌐 Back online, token still valid');
      }
    }
  };

  private attachLifecycleListeners() {
    document.addEventListener('visibilitychange', this.visibilityHandler);
    window.addEventListener('online', this.onlineHandler);
    console.log('🔗 Lifecycle listeners attached');
  }

  private detachLifecycleListeners() {
    document.removeEventListener('visibilitychange', this.visibilityHandler);
    window.removeEventListener('online', this.onlineHandler);
    console.log('🔌 Lifecycle listeners detached');
  }

  /**
   * Fetch user email from Google API
   */
  private async fetchUserEmail(): Promise<string | null> {
    try {
      if (!this.gapi?.client) {
        console.log('❌ No GAPI client available for fetching user email');
        return null;
      }
      
      // Make API call to get user info
      const response = await this.gapi.client.request({
        path: 'https://www.googleapis.com/oauth2/v2/userinfo'
      });
      
      if (response.status === 200 && response.result?.email) {
        console.log('✅ User email fetched successfully');
        return response.result.email;
      } else {
        console.log('❌ Failed to fetch user email from API response');
        return null;
      }
    } catch (error) {
      console.error('❌ Error fetching user email:', error);
      return null;
    }
  }

  /**
   * Get current user email
   */
  async getUserEmail(): Promise<string> {
    return googleUserEmail.value;
  }

  /**
   * Check if token actually needs refreshing
   */
  private async shouldRefreshToken(): Promise<boolean> {
    try {
      // Check if we have a current token
      const currentToken = this.gapi?.client?.getToken()?.access_token;
      if (!currentToken) {
        console.log('🔍 No current token, refresh needed');
        return true;
      }

      // Check token age from localStorage
      const savedToken = localStorage.getItem(GOOGLE_TOKEN_KEY);
      if (!savedToken) {
        console.log('🔍 No saved token data, refresh needed');
        return true;
      }

      const tokenData = JSON.parse(savedToken);
      const tokenAge = Date.now() - (tokenData.timestamp || 0);
      const isNearExpiry = tokenAge > (90 * 24 * 60 * 60 * 1000); // 90 days (3 months) - conservative
      
      if (isNearExpiry) {
        console.log('🔍 Token is near expiry, refresh needed');
        return true;
      }

      console.log('🔍 Token is still valid, no refresh needed');
      return false;
    } catch (error) {
      console.error('❌ Error checking token refresh need:', error);
      return false; // Don't refresh if we can't determine
    }
  }
}

// Export reactive states for use in components
export const useGoogleDriveAuth = () => {
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
    getUserEmail: () => authService.getUserEmail(),
  };
};

// Export singleton instance
export const googleDriveAuth = GoogleDriveAuth.getInstance();
