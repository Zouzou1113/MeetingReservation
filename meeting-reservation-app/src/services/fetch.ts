import { get } from "lodash";

export type FetchOptions = | RequestInit
| {body: any; method?:string};

export interface  FetchError extends Error {
    status?: number;
}

export const fetchOnly = async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
   if(!url)
    {throw new Error("Url is required");} 

     const request:RequestInit = {
       method:  get(options, "method") || "GET",
     };

     if(request.method !== "GET")
     {
         request.headers =  new Headers({
            Accept: "application/json, */*",
            "Content-Type": "application/json; charset-utf-8",
        });
     }

     if(options.body) {
         request.body = JSON.stringify(options.body);
     }

     const res = await fetch(url, request);
     return handleResponse(res);
};


const handleResponse = async (response: Response): Promise<any> => {
  if(response.ok)
  {
      return response.json();
  }
   
  const error: FetchError = new Error(response.statusText);
  error.status = response.status;
  error.message = response.json.toString();
  throw error;
};
