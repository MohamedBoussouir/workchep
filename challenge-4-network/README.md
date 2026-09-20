# Challenge 4: Network
افتح `http://localhost:6000` وقم ربط الحاويتين.

## تلميح للمدرب (الحل)
docker network create my-net
docker run -d --name db --network my-net -e POSTGRES_PASSWORD=123 postgres
docker build -t ch4 .
docker run -p 6000:6000 --name app --network my-net -e DB_HOST=db ch4
