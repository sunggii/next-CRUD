# Next CRUD with Prisma

โปรเจกต์นี้เป็นตัวอย่าง CRUD ด้วย Next.js + Prisma + PostgreSQL

## 1) ความแตกต่างระหว่างใช้ Prisma กับไม่ใช้ Prisma

### ใช้ Prisma
- เขียน query ผ่าน `PrismaClient` เช่น `prisma.student.findMany()`
- ได้ type safety ช่วยลดการพิมพ์ชื่อ field ผิด
- โค้ดอ่านง่ายกว่า โดยเฉพาะงาน CRUD
- รองรับการจัดการ schema และ migration ได้เป็นระบบ
- ตอนใช้ Prisma 7 ต้องเชื่อมฐานข้อมูลผ่าน `prisma.config.ts` และ adapter เช่น `@prisma/adapter-pg`

### ไม่ใช้ Prisma
- เขียน SQL เองผ่าน driver เช่น `pg`
- ควบคุม query ได้ละเอียดกว่า แต่โค้ดจะยาวและดูแลยากกว่า
- ต้องจัดการ type และ mapping เอง
- เหมาะกับงานที่ต้องการ SQL เฉพาะทางหรือ query ซับซ้อนมากๆ

## 2) ขั้นตอนการตั้งค่าโปรเจกต์นี้

### 1. ติดตั้ง dependencies ของโปรเจกต์
```bash
	npm install
```
    
### 2. ติดตั้ง Prisma
```bash
    npm install prisma --save-dev
    npm install @prisma/client
```

### 3. Init Prisma
```bash
    npx prisma init
```

คำสั่งนี้จะสร้าง:
- โฟลเดอร์ prisma/ พร้อมไฟล์ schema.prisma
- ไฟล์ .env (สำหรับเก็บ connection string)

### 4. ตั้งค่า `DATABASE_URL` ในไฟล์ `.env`
```env
	DATABASE_URL="postgresql://user:password@localhost:5432/postgres?schema=demo"
```

ตั้งให้ตรงกับของจริง

### 5. ติดตั้ง Prisma adapter สำหรับ PostgreSQL
```bash
	npm install @prisma/adapter-pg pg
```

### 6. ดึง schema จากฐานข้อมูลเข้ามาใน Prisma
```bash
	npx prisma db pull
```

เมื่อ run คำสั่งนี้จะได้ไฟล์ `prisma/schema.prisma` ที่ดึงข้อมูล table เก่ามาแล้ว

### 7. สร้าง Prisma Client
```bash
    npx prisma generate
```

### 8. ตรวจสอบโปรเจกต์ด้วย build
```bash
    npm run build
```

## หมายเหตุ

- ไฟล์ `prisma/schema.prisma` ใช้สำหรับเก็บ model ที่ introspect มา
- ไฟล์ `prisma.config.ts` ใช้โหลด `.env` และส่ง connection string ให้ Prisma
- หากใช้ Prisma 7 ห้ามใส่ `url` ใน `schema.prisma`
