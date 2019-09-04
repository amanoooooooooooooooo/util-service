
# FROM node:11-stretch-slim
FROM balenalib/generic-armv7ahf-alpine-node:11-edge-run

WORKDIR /util

# COPY tmp/qemu-arm-static /usr/bin/qemu-arm-static
COPY . .

RUN npm i && npm run build

CMD npm run start

EXPOSE 3000





