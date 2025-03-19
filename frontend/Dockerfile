# Usa la imagen de Node.js
FROM node:18-alpine

WORKDIR /app

# Copia los archivos necesarios
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Asegura que las variables de entorno se lean correctamente
ARG NEXT_PUBLIC_SPOTIFY_CLIENT_ID
ARG NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
ARG NEXT_PUBLIC_BACKEND_URL

ENV NEXT_PUBLIC_SPOTIFY_CLIENT_ID=$NEXT_PUBLIC_SPOTIFY_CLIENT_ID
ENV NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=$NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

# Compila la aplicación Next.js
#RUN npm run build

# Corre la aplicación en modo producción
CMD ["npm", "run", "dev"]
