FROM node:20-alpine AS build
WORKDIR /app

ARG VITE_BFF_URL=/api/bff
ARG VITE_AZURE_TENANT_ID=
ARG VITE_AZURE_CLIENT_ID=
ARG VITE_AZURE_API_SCOPE=api://rutaexpress/access_as_user
ENV VITE_BFF_URL=$VITE_BFF_URL \
    VITE_AZURE_TENANT_ID=$VITE_AZURE_TENANT_ID \
    VITE_AZURE_CLIENT_ID=$VITE_AZURE_CLIENT_ID \
    VITE_AZURE_API_SCOPE=$VITE_AZURE_API_SCOPE

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
