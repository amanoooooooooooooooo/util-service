
# FROM node:11-stretch-slim
FROM balenalib/generic-armv7ahf-alpine-node:11-edge-run

WORKDIR /util

# COPY tmp/qemu-arm-static /usr/bin/qemu-arm-static

COPY ./package.json ./yarn-lock.json ./
RUN yarn

COPY . .

RUN yarn run build

CMD yarn run start

EXPOSE 3000





