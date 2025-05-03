export {};
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
  interface IRequest {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: Record<string, unknown>;
    queryParams?: Record<string, string | number | boolean | undefined>;
    useCredentials?: boolean;
    headers?: Record<string, string>;
    nextOption?: {
      revalidate?: number | false;
      tags?: string[];
    };
  }

  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }

  interface ILogin {
    user: {
      _id: string;
      email: string;
      name: string;
      isActive: boolean;
    };
    access_token: string;
  }
}
