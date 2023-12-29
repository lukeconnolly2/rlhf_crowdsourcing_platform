FROM node:21

RUN mkdir -p /app
WORKDIR /app
COPY . .

RUN apt-get update
RUN apt-get install -y python3

RUN npm install --platform=linux --arch=arm --libc=glibc
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]