# Challenge 2: Broken Dockerfile
قم بإصلاح ملف Dockerfile ليعمل التطبيق على المنفذ 4000.

## تلميح للمدرب (الحل)
Dockerfile المصحح:
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "app.js"]
