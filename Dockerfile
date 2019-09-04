#
# ---- Base Node ----
# FROM node:11-stretch-slim

# WORKDIR /util

# COPY . .

# RUN npm i && npm run build

# CMD npm run start

# EXPOSE 3000


FROM arm32v6/alpine:3.6
COPY tmp/qemu-arm-static /usr/bin/qemu-arm-static

MAINTAINER amano



