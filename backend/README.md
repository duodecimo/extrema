# EXTREMA BACKEND

## ngrok with docker

atenção: o docker do backend tem que estar no ar (docker compose up)

```
docker run --rm -it --link extrema-app --net extrema-app_default --env AUTH_TOKEN=<a sua chave do ngrok> shkoliar/ngrok http extrema-app:8000
```

se tudo der certo, é só carregar:
`https://<ngrok published id>.ngrok.io/api/schema/swagger-ui/`

i.e:
`https://7840-177-134-10-41.ngrok.io/api/schema/swagger-ui/`
