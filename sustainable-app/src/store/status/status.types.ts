export interface Status {
  isLoading: boolean;
  isError: boolean;
  error: Error | undefined;
}

export interface Error {
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: Date;
}
