# Basis-Image für Node.js
FROM node:18-alpine

# Arbeitsverzeichnis erstellen
WORKDIR /app

# package.json und package-lock.json kopieren
COPY package*.json ./

# Abhängigkeiten installieren
RUN npm install

# Quellcode kopieren
COPY . .

# Anwendung bauen
RUN npm ^run build

# Wechsel zu Nginx für das Hosting
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Port öffnen
EXPOSE 80

# Start-Befehl
CMD ["nginx", "-g", "daemon off;"]