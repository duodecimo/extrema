import { useSystemStore } from "@/stores/system";
import axios from "axios";

const systemStore = useSystemStore();

export async function useAxios(method, endpoint, payload) {
  var f_response = null;
  var f_err = null;
  await new Promise((resolve, reject) => {
    axios({
      method: method || "GET",
      url: endpoint,
      data: payload,
      headers: {
        Authorization: "Bearer " + systemStore.auth["access"],
      },
    })
      .then((response) => {
        f_response = response;
        console.log(">>>> f_response: ", f_response.data);
        console.log(
          "COMPOSABLE - useAxios.js - method useAxios: ",
          method || "GET",
          " endpoint: ",
          endpoint,
          " payload: ",
          payload,
          "response.data: ",
          response.data
        );
        resolve(response);
      })
      .catch((err) => {
        var heads = {
          Authorization: "Bearer " + systemStore.auth["access"],
        };
        console.log(
          "COMPOSABLE - useAxios.js - method useAxios (houve erro): ",
          method || "GET",
          " endpoint: ",
          endpoint,
          " payload: ",
          payload,
          "headers: ",
          heads
        );
        console.log(
          "COMPOSABLE - useAxios.js - method useAxios - error on first try - status: ",
          err.response.status,
          " response: ",
          err.response
        );
        // if failed on expired token, let's try to refresh token and try once more
        if (
          err.response.status === 401 &&
          err.response.data.code === "token_not_valid"
        ) {
          systemStore
            .tokenRefresh()
            .then(() => {
              axios({
                method: method || "GET",
                url: endpoint,
                data: payload,
                headers: {
                  Authorization: "Bearer " + systemStore.auth["access"],
                },
              })
                .then((response) => {
                  f_response = response;
                  console.log(">>>> f_response: ", f_response);
                  console.log(
                    "COMPOSABLE - useAxios.js - method useAxios - method: ",
                    method || "GET",
                    " endpoint: ",
                    endpoint,
                    " payload: ",
                    payload,
                    "response.data: ",
                    response.data
                  );
                  resolve(response);
                })
                .catch((err) => {
                  // failed on second try
                  f_err = err;
                  reject(err);
                });
            })
            .catch((err) => {
              // failed refreshing token
              console.log(
                "COMPOSABLE - useAxios.js - method useAxios - error refreshing token: ",
                err.response
              );
              f_err = err;
              reject(err);
            });
        } else {
          // error not due to expired token
          console.log(
            "COMPOSABLE - useAxios.js - method useAxios - error : ",
            err.response
          );
          f_err = err;
          reject(err);
        }
      });
  });
  return { response: f_response, err: f_err };
}
