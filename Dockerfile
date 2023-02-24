FROM node:18.14.0-alpine as appbuild
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:18.14.0-alpine
WORKDIR /app
RUN yarn global add serve
COPY --from=appbuild /app/dist ./dist
EXPOSE 3000
ENTRYPOINT ["serve", "-s", "dist", "-p", "3000"]

