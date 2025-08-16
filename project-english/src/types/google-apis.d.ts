// Type declarations for Google APIs
declare global {
  interface Window {
    gapi: {
      load: (api: string, callback: () => void) => void;
      client: {
        init: (config: {
          apiKey: string;
          discoveryDocs: string[];
        }) => Promise<void>;
        drive: {
          files: {
            list: (params: any) => Promise<any>;
            create: (params: any) => Promise<any>;
            get: (params: any) => Promise<any>;
            delete: (params: any) => Promise<any>;
          };
        };
        getToken: () => { access_token: string } | null;
        setToken: (token: string) => void;
      };
    };
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: any) => void;
          }) => any;
          revoke: (token: string) => void;
        };
      };
    };
  }
}

export {};
