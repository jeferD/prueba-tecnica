# Usa una imagen base con Node.js instalado.
FROM node:latest as build
RUN apt-get update
RUN apt-get install -y nodejs npm


# Establece el directorio de trabajo dentro del contenedor para el servidor Node.js.
WORKDIR /app

# Copia los archivos del proyecto web en el directorio del servidor web del contenedor (Nginx).
COPY . /usr/share/nginx/html

# Copia el archivo servidor.js desde la ruta adecuada a la ubicación del servidor Node.js en el contenedor.
COPY ./assets/js/servidor.js /app/servidor.js

# Instala las dependencias de Node.js si tienes un archivo package.json (opcional).
COPY package.json package-lock.json /app/
RUN npm install

# Configura el servidor Nginx
FROM nginx:latest
COPY --from=build /usr/share/nginx/html /usr/share/nginx/html
COPY --from=build /app/servidor.js /app/servidor.js

# Expone el puerto 80 para que el servidor web Nginx sea accesible desde fuera del contenedor.
EXPOSE 80

# Comando para iniciar ambos servidores (Node.js y Nginx) cuando el contenedor se ejecute.
CMD ["sh", "-c", "node /app/servidor.js & nginx -g 'daemon off;'"]
