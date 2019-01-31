#
# ---- Base Node ----
FROM node:11-slim

WORKDIR /util

COPY . .

RUN npm i && npm run build

CMD npm run start

EXPOSE 3000


