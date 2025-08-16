import { ref, computed } from 'vue';

// Google Drive API configuration
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || '';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

// Global state
const isGoogleApiLoaded = ref(false);
const isGoogleSignedIn = ref(false);
const googleUser = ref<any>(null);
const authError = ref<string>('');

// LocalStorage keys for persistence
const GOOGLE_TOKEN_KEY = 'vocabulary-google-token';
const GOOGLE_USER_KEY = 'vocabulary-google-user';
const GOOGLE_SIGNED_IN_KEY = 'vocabulary-is-google-signed-in';

/**
 * Google Drive Authentication Service
 * Handles Google OAuth 2.0 authentication for Drive API access
 */
export class GoogleDriveAuth {
  private static instance: GoogleDriveAuth;
  private gapi: any = null;
  private tokenClient: any = null;

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
      const savedSignedIn = localStorage.getItem(GOOGLE_SIGNED_IN_KEY);

      if (savedToken && savedUser && savedSignedIn === 'true') {
        console.log('📂 Loading saved Google authentication state...');
        
        // Parse saved data
        const tokenData = JSON.parse(savedToken);
        const userData = JSON.parse(savedUser);
        
        // Check if token is expired (Google tokens typically expire in 1 hour)
        const tokenAge = Date.now() - (tokenData.timestamp || 0);
        const isTokenExpired = tokenAge > (55 * 60 * 1000); // 55 minutes to be safe
        
        if (isTokenExpired) {
          console.log('⏰ Saved Google token expired, clearing...');
          this.clearSavedAuthState();
          return;
        }
        
        // Restore state
        googleUser.value = userData;
        isGoogleSignedIn.value = true;
        console.log('✅ Google authentication state restored from localStorage');
      } else {
        console.log('ℹ️ No saved Google authentication state found');
      }
    } catch (error) {
      console.error('❌ Error loading saved auth state:', error);
      this.clearSavedAuthState();
    }
  }

  /**
   * Save authentication state to localStorage
   */
  private saveAuthState(token: any, user: any): void {
    try {
      localStorage.setItem(GOOGLE_TOKEN_KEY, JSON.stringify({
        access_token: token.access_token,
        timestamp: Date.now()
      }));
      localStorage.setItem(GOOGLE_USER_KEY, JSON.stringify(user));
      localStorage.setItem(GOOGLE_SIGNED_IN_KEY, 'true');
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
        const isTokenExpired = tokenAge > (55 * 60 * 1000);
        
        if (!isTokenExpired) {
          console.log('🔑 Restoring token to GAPI client...');
          this.gapi.client.setToken({ access_token: tokenData.access_token });
          console.log('✅ Token restored to GAPI client');
        } else {
          console.log('⏰ Token expired during restoration, clearing state');
          this.clearSavedAuthState();
          isGoogleSignedIn.value = false;
          googleUser.value = null;
        }
      }
    } catch (error) {
      console.error('❌ Error restoring token to GAPI:', error);
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
      authError.value = '';
      
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
  private handleAuthSuccess(response: any): void {
    googleUser.value = response;
    isGoogleSignedIn.value = true;
    this.gapi.client.setToken({ access_token: response.access_token });
    
    // Save authentication state to localStorage for persistence
    this.saveAuthState({ access_token: response.access_token }, response);
    
    console.log('🔑 Authentication successful and persisted');
  }

  /**
   * Get current access token
   */
  getAccessToken(): string | null {
    return this.gapi?.client?.getToken()?.access_token || null;
  }

  /**
   * Check if user is signed in
   */
  isSignedIn(): boolean {
    return isGoogleSignedIn.value;
  }

  /**
   * Get current authentication error
   */
  getAuthError(): string {
    return authError.value;
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
    authError: computed(() => authError.value),

    // Methods
    initialize: () => authService.initialize(),
    signIn: () => authService.signIn(), 
    signOut: () => authService.signOut(),
    isSignedIn: () => authService.isSignedIn(),
    getAccessToken: () => authService.getAccessToken(),
  };
};

// Export singleton instance
export const googleDriveAuth = GoogleDriveAuth.getInstance();
