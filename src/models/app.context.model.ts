export interface AppContextModel {
    message?: string | null;
    setMessage: (message: string) => void;
}