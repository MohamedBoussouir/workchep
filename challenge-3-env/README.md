# Challenge 3: Env Var
قم بتشغيل الحاوية مع تمرير المتغير البيئي `FLAG=DOCKER_HERO_2026`.

## تلميح للمدرب (الحل)
docker build -t ch3 .
docker run -p 5000:5000 -e FLAG=DOCKER_HERO_2026 ch3
