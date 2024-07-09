FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/frontend-app /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
