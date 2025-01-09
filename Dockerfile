FROM node:18-alpine AS build-stage

WORKDIR /app

COPY .npmr[c] .npmrc
COPY package.json ./

RUN npm install --verbose

COPY . ./

RUN NODE_OPTIONS=--max_old_space_size=8192 npm run app:build
RUN NODE_OPTIONS=--max_old_space_size=8192 npm run app:publish

FROM nginx:stable-alpine as production-stage

COPY ./nginx/mime.types /etc/nginx/mime.types
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/build/host/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
