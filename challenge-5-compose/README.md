# Challenge 5: Compose & Persistence
أصلح ملف التكوين لتشغيل التطبيق والتحقق من بقاء البيانات.

## تلميح للمدرب (الحل)
أضف `depends_on`, `environment`, و `volumes` لخدمة `db`.
استخدم `volumes` تحت `services.db` لربط المجلد بـ `pgdata` ومعرف في المستوى العلوي.
```yaml
version: '3'
services:
  app:
    build: .
    ports: ["7000:7000"]
    depends_on: [db]
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: 123
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```
