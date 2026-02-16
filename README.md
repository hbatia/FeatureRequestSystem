# Feature Requests Platform

מערכת לניהול, הצגת וטיפול בבקשות לשיפור (Feature Requests) בארגון.

## תוכן העניינים
- [סקירה כללית](#סקירה-כללית)
- [טכנולוגיות](#טכנולוגיות)
- [הרצה מקומית](#הרצה-מקומית)
- [מבנה הפרויקט](#מבנה-הפרויקט)
- [פיצ'רים עיקריים](#פיצרים-עיקריים)
- [תרומה](#תרומה)

---

## סקירה כללית

המערכת מאפשרת למשתמשים להגיש בקשות לשיפור, להצביע, להגיב ולעקוב אחרי סטטוס הבקשות. קיימת הפרדה בין צד שרת (backend) לצד לקוח (frontend), עם ממשק משתמש מודרני בעברית.

## טכנולוגיות
- **Frontend:** React (TypeScript), Vite, Tailwind CSS
- **Backend:** NestJS (TypeScript), Prisma ORM
- **Database:** PostgreSQL
- **Docker:** להרצה מהירה של סביבת הפיתוח

## הרצה מקומית

### דרישות מקדימות
- Node.js 18+
- Docker (להרצת DB)

### שלבים
1. התקנת תלויות:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. הרצת מסד נתונים:
   ```bash
   cd ../backend
   docker-compose up -d
   ```
3. הרצת צד שרת:
   ```bash
   npm run start:dev
   ```
4. הרצת צד לקוח:
   ```bash
   cd ../frontend
   npm run dev
   ```

## מבנה הפרויקט

```
backend/
  src/
    feature-requests/   # ניהול בקשות
    comments/           # תגובות
    users/              # משתמשים
    votes/              # הצבעות
  prisma/               # סכמות ומיגרציות
frontend/
  src/
    components/         # קומפוננטות React
    hooks/              # React hooks
    lib/                # קוד עזר
    pages/              # דפי אפליקציה
    types/              # טיפוסים משותפים
```

## פיצ'רים עיקריים
- הגשת בקשות חדשות לשיפור
- הצבעה על בקשות
- תגובות לכל בקשה
- סטטיסטיקות ודשבורד
- ניהול סטטוס בקשות (ממתין, הושלם וכו')
- ממשק משתמש בעברית, רספונסיבי

## תרומה
תרצו להציע פיצ'ר או תיקון? מוזמנים לפתוח Pull Request או Issue.

---

בהצלחה!
