import queryString from "query-string";

export const sendRequest = async <T>(props: IRequest) => {
  const {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  const options: RequestInit = {
    method,
    headers: new Headers({ "content-type": "application/json", ...headers }),
    body: body ? JSON.stringify(body) : null,
    ...nextOption,
  };
  if (useCredentials) options.credentials = "include";

  const finalUrl =
    Object.keys(queryParams).length > 0
      ? `${url}?${queryString.stringify(queryParams)}`
      : url;

  return fetch(finalUrl, options).then((res) => {
    if (res.ok) {
      return res.json() as T;
    } else {
      return res.json().then(function (json) {
        return {
          statusCode: res.status,
          message: json?.message ?? "",
          error: json?.error ?? "",
        } as T;
      });
    }
  });
};

export const sendRequestFile = async <T>(props: IRequest) => {
  //type
  const {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  const options: RequestInit = {
    method: method,
    // by default setting the content-type to be json type
    headers: new Headers({ ...headers }),
    body:
      body !== undefined && body !== null
        ? body instanceof FormData
          ? body
          : typeof body === "object"
          ? JSON.stringify(body)
          : body
        : null,
    ...nextOption,
  };
  if (useCredentials) options.credentials = "include";

  const finalUrl =
    Object.keys(queryParams).length > 0
      ? `${url}?${queryString.stringify(queryParams)}`
      : url;

  return fetch(finalUrl, options).then((res) => {
    if (res.ok) {
      return res.json() as T; //generic
    } else {
      return res.json().then(function (json) {
        // to be able to access error status when you catch the error
        return {
          statusCode: res.status,
          message: json?.message ?? "",
          error: json?.error ?? "",
        } as T;
      });
    }
  });
};
