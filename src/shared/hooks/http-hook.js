import { useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
   const activeHttpRequests = useRef([]);
   const sendRequest = useCallback(
      async (url, method = "GET", body = null, headers = {}) => {
         const httpAbortCtrl = new AbortController();
         activeHttpRequests.current.push(httpAbortCtrl);
         try {
            const response = await fetch(url, {
               method: method,
               body: body,
               headers: headers,
               signal: httpAbortCtrl.signal,
            });
            const responseData = await response.json();
            activeHttpRequests.current = activeHttpRequests.current.filter(
               (item) => item !== httpAbortCtrl
            );
            if (!response.ok) {
               throw new Error(response.message);
            }
            return responseData;
         } catch (error) {
            throw error;
         }
      },
      []
   );
   useEffect(() => {
      return () => {
         activeHttpRequests.current.forEach((item) => item.abort());
      };
   }, []);
   return { sendRequest };
};
