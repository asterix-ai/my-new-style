# السفاريتي للاسماك الطازجة - React Project

هذا المشروع هو تطبيق ويب كامل مبني باستخدام React، Tailwind CSS، و Firebase (Authentication, Firestore, Storage) لإدارة منتجات محل أسماك.

## هيكل المشروع


react-project/
├── public/
│   └── index.html
│   └── manifest.json
├── src/
│   ├── assets/
│   │   └── logo.png
│   ├── components/
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── InputField.js
│   │   ├── Navbar.js
│   │   └── LoadingSpinner.js
│   ├── contexts/
│   │   └── FirebaseContext.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useFirestore.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── SignInPage.js
│   │   ├── SignUpPage.js
│   │   ├── ProductsPage.js
│   │   └── AddProductPage.js
│   ├── services/
│   │   ├── firebase.js
│   │   └── productService.js
│   ├── utils/
│   │   └── authUtils.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.js
│   ├── index.js
│   └── reportWebVitals.js
├── tailwind.config.js
├── .env
├── .gitignore
├── package.json
├── postcss.config.js
└── README.md


## الميزات الأساسية

-   **إدارة المنتجات**: إضافة وعرض وحذف منتجات الأسماك الطازجة.
-   **مصادقة المستخدمين (Authentication)**: تسجيل الدخول وإنشاء حسابات جديدة باستخدام البريد الإلكتروني وكلمة المرور (Firebase Auth).
-   **تخزين البيانات (Firestore)**: حفظ بيانات المنتجات والمستخدمين بشكل منظم في Firestore.
-   **تخزين الصور (Firebase Storage)**: رفع صور المنتجات إلى Firebase Storage.
-   **تصميم عصري ومتجاوب**: باستخدام Tailwind CSS مع دعم الوضع الليلي (Dark Mode).
-   **أنيميشنز تفاعلية**: باستخدام Framer Motion لتجربة مستخدم سلسة.
-   **أيقونات احترافية**: باستخدام Lucide React.
-   **تنبيهات سهلة الاستخدام**: باستخدام React Hot Toast لإشعارات النجاح/الخطأ.
-   **مؤشرات تحميل**: باستخدام React Spinners.
-   **عزل البيانات (Tenant Isolation)**: استخدام `projectId` لضمان أن كل مشروع (أو عميل) يتعامل فقط مع بياناته الخاصة في Firestore و Storage.

## المكتبات المستخدمة

-   `react`
-   `react-dom`
-   `react-scripts`
-   `tailwindcss`
-   `framer-motion`
-   `lucide-react`
-   `react-hot-toast`
-   `react-router-dom`
-   `react-spinners`
-   `firebase`

## إعداد المشروع

1.  **استنساخ المستودع (Clone the repository)**:
    bash
    git clone <your-repo-url>
    cd react-project
    

2.  **تثبيت التبعيات (Install dependencies)**:
    bash
    npm install
    # أو
    yarn install
    

3.  **إعداد Firebase**: 
    -   انتقل إلى [Firebase Console](https://console.firebase.google.com/) وأنشئ مشروعًا جديدًا.
    -   أضف تطبيق ويب إلى مشروعك واحصل على `firebaseConfig`.
    -   أنشئ ملف `.env` في جذر المشروع (react-project/) وأضف متغيرات البيئة التالية، مع استبدال القيم بالخاصة بك من `firebaseConfig`:
        env
        REACT_APP_FIREBASE_API_KEY="AIzaSyAGV2T-vtyuUMvY4JbbnasmqsxYdZfsgO4"
        REACT_APP_FIREBASE_AUTH_DOMAIN="aign-ed801.firebaseapp.com"
        REACT_APP_FIREBASE_PROJECT_ID="aign-ed801"
        REACT_APP_FIREBASE_STORAGE_BUCKET="aign-ed801.firebasestorage.app"
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID="66513709331"
        REACT_APP_FIREBASE_APP_ID="1:66513709331:web:c829e53b3fca16d57692e6"
        REACT_APP_FIREBASE_MEASUREMENT_ID="G-RXS6M904T9"
        
    -   **ملاحظة هامة لعزل البيانات**: المشروع يستخدم `react-project-1760886245594-ex3a9vqos` كمعرف للمشروع (Tenant ID) في Firestore و Storage. تأكد من أن قواعد أمان Firebase الخاصة بك تسمح بهذا النمط.

4.  **تشغيل التطبيق (Run the application)**:
    bash
    npm start
    # أو
    yarn start
    
    سيتم فتح التطبيق في متصفحك على `http://localhost:3000`.

## قواعد أمان Firebase (Firestore Rules Suggestion)

لضمان عزل البيانات بين المشاريع (العملاء)، يمكنك استخدام قواعد Firestore التالية. هذه القواعد تفترض وجود مجموعة `members` داخل كل `project/{projectId}` تحتوي على أدوار المستخدم (مثل `owner`, `admin`, `member`).

firestore
rules
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{projectId}/{document=**} {
      allow read, write: if request.auth != null && exists(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid))
                               && get(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid)).data.roles contains 'member';
    }

    // Specific rules for adding/deleting products (e.g., only for 'admin' or 'owner')
    match /projects/{projectId}/products/{productId} {
      allow read: if request.auth != null && exists(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid));
      allow create: if request.auth != null && exists(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid))
                                  && (get(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid)).data.roles contains 'admin' || get(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid)).data.roles contains 'owner');
      allow update, delete: if request.auth != null && exists(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid))
                                    && (get(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid)).data.roles contains 'admin' || get(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid)).data.roles contains 'owner');
    }

    // Rules for members collection (e.g., only owners can add/modify roles)
    match /projects/{projectId}/members/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      // Allow a user to create their own member document upon signup
      allow create: if request.auth != null && request.auth.uid == userId;
      // Only owner can update other members' roles, or a user can update their own non-role fields
      allow update: if request.auth != null && (request.auth.uid == userId || (exists(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid)) && get(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid)).data.roles contains 'owner'));
      allow delete: if false; // Members should not be easily deleted through client
    }
  }
}


**ملاحظة**: يجب تعديل هذه القواعد لتناسب احتياجات الأمان الدقيقة لمشروعك.