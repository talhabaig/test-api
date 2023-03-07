const admin = require("firebase-admin");
const serviceAccount = {
  type: "service_account",
  project_id: "artonionro",
  private_key_id: "358c976c76731edc8d8ded25b530d3b5232dc50e",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDDUboOGz0iM/wJ\nJXFkKaOeW6ImvA4dpVhpFk34ZQjlS8sE+Vda3Jg56EV4N/zg/hMgnEkdSixcLEew\nml0d526rFe/yju93jGH/8kyWxNcrTb9EnJGFFpfJGCA1ynAWgVkw77AAEt9y9Gze\n7quPC26fSdCtMA36fgm7DPUiwRN0OuMLjISHFSqznoEalHBIA9b2q/gLc9zWDeNl\nh1OZRLkafcKFbMjD69H4sx/GDgtbh4Ep6FFqZL288hGFsI91PEIy7dKVqc4XKHZh\nMyaVwX6Vkb165SV+rW2h82B6q5xnhrWQ7XZ+NJbWWWrTrnVnSu0rYE1qDXaKj+xn\nNEJo8ToXAgMBAAECggEARiKZqakUSazbCrm8PthI3XtP/ZK3iuOtnIaa1uAI0rVl\noFKckI73xotmLqYEExKI8cPM6UySI0LvNzYmy68n6R1GfRXgXVA2fH6YC+eA0Bbp\n4IxMILsdI+Oa5VXc6+fkjBL1YwFj5VZppZ+UURgsz9vkp9vCmTka62TavXEROEGv\nRrLi6bOex+FuJ5aK/KgasOMlnxyVVthI4RgEKdJ1akTAJdrRQhUb7xckfmll0kE0\n82Xg4tjeURoKaFxVxKj/5m+HxrJd2A0U7MpDnqeLWRrd3g5Utn+lTNlEDknhJn0i\nYqbPDghd/nb3Q7abcNVZLAc/kFRY6YPKF6HooRYiiQKBgQD7XgA7pFRkSru9EOkG\nQTVC7c1GJnSxEdph/7QVTwIEmAirivgSVChD2YkyZ3Wvbdde8FcSFUTMVjIGejqi\nz0VrfEYb9h1Ygs45rnHDvDv+yXA+vA50t+bZ0MvrrIzJigiOUUsmHFfqjDcTgnac\nz72DDLFZsHcmNPP1jBzgooxrawKBgQDG60fizAiDL97AU/uaYO7Zu3YdqdaOpVfr\nE6Pzzs5vUMCf2prAwt7TtVPbXB220h87YUDgB8WFOjtrdIP9G3a1IJg4Zj1xq20f\nRhQnrCKgPYvMbbSv9mLj9pdaF8Gwfxv0tcrfI/Wr0BGXZOjKnpI7y7h5m/ovawVj\n+5W97OqjBQKBgDBhiV3xZSTglX3wcUl45414Q9hKso8aRpQyKTEowdSsho6t8s1k\nUVOt3RBMhYQ8egWV8MxUN6e0t3AzunF3v37OrpfXKRLOKm9DujXYVxvVHbuVaprg\ngphN7dHwpjBsVvU9hF9TeUB1uGwS4k2QVoOQv9npcyVxb7tFOpGp96j9AoGAcdX5\nuJftEy5U+pnVNf7dEauPJ+CnEdEbpEMEI6WpS9jZs2GGCGQ84sk1aSapNpO/HdtF\nJjAsYFb35EG0uyd5YqR5mGUiKqfg9fHD3QRMeIlgNKhfrAeDhlP7P6qyxI+pbvyO\nUe6hTCbxukMcWcAvjZrDQoz5uyMy3Yn/osYvbQUCgYAzHSU+dm8cvpmhVp9q58dJ\nugcTJasLv/+ez42WJurVqHx7CPWoR8z0io4udQDSLLNxunhyO3Xxisvq3OxPMnIo\n110PyOS/NsvgyhNdhwOAXJpOLd91YIjEFcLG1iADZw98UKCtfBZVjJdL0Us89ErC\n8FtqTB8jKY7Cxh7EZ8utXA==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-jnanu@artonionro.iam.gserviceaccount.com",
  client_id: "110610945602173767914",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jnanu%40artonionro.iam.gserviceaccount.com",
};

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const store = app.firestore().collection("userList");
module.exports = { app, store };
