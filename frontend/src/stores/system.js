import { defineStore } from "pinia";
import axios from "axios";

export const useSystemStore = defineStore({
  id: "system",
  state: () => ({ auth: null, loading: false }),
  actions: {
    login(payload) {
      console.log("Em system.js - login -payload: ", payload);
      return new Promise((result, reject) => {
        this.loading = true;
        axios
          .post("/api/access/login/", payload)
          .then(response => {
            // armazena na store
            var resultado = response.data.tokens;
            resultado["email"] = response.data.email;
            resultado["name"] = response.data.name;
            resultado["provider"] = response.data.provider;
            resultado["tokens"] = response.tokens;
            resultado["userid"] = response.data.userid;
            console.log(
              "useSystemStore - login - armazenando resultado: ",
              resultado
            );
            this.auth = resultado;
            result("useSystemStore - login - bem sucedido.");
          })
          .catch(err => {
            this.auth = null;
            console.log("useSystemStore - login -  erro: ", err);
            reject(err);
          })
          .finally(() => {
            setTimeout(() => {
              this.loading = false;
              console.log(">>> timeout para desligar loading");
            }, 5000);
          });
      });
    },
    tokenRefresh() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        if (this.auth["refresh"]) {
          const payload = {
            refresh: this.auth["refresh"],
          };
          console.log("useSystemStore - tokenRefresh - o payload é: ", payload);
          axios
            .post("/api/sys_admin/token/refresh/", payload)
            .then((response) => {
              this.auth["acess"] = response.data.access;
              console.log(
                "useSystemStore - tokenRefresh - response (novo acesso): ",
                response.data.access
              );
              resolve("sucesso atualizando token.");
            })
            .catch((err) => {
              console.log(
                "useSystemStore - tokenRefresh - erro: O token de refresh deve estar vencido, erro: ",
                err.response
              );
              console.log(
                "useSystemStore - tokenRefresh - forçar novo login (revogando dados do login atual) ..."
              );
              this.auth = null;
              reject(err);
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          this.loading = false;
          console.log(
            "useSystemStore - tokenRefresh - É preciso estar logado para atualizar o token."
          );
          reject("Falha atualizando token: verifique se está logado.");
        }
      });
    },
  },
});
