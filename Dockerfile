FROM node:18.20.2-alpine


WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
COPY . .
RUN npx prisma db push
RUN npx prisma generate
