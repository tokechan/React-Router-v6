// src/services/auth.ts
import axios from 'axios';

// モックユーザーデータ
const MOCK_USERS = [
  {
    id: 1,
    name: '夫',
    email: 'husband@example.com',
    password: 'password123'
  },
  {
    id: 2,
    name: '妻',
    email: 'wife@example.com',
    password: 'password123'
  }
];

// モックトークン
const MOCK_TOKEN = 'mock_jwt_token_12345';

// ログイン関数（モック実装）
export const login = async (email: string, password: string) => {
  // 実際のAPIリクエストの代わりにモックデータを使用
  return new Promise((resolve, reject) => {
    // 遅延を追加してAPIリクエストをシミュレート
    setTimeout(() => {
      const user = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // パスワードを除外したユーザー情報
        const { password: _, ...userWithoutPassword } = user;
        
        // JWTトークンをLocalStorageに保存
        localStorage.setItem('token', MOCK_TOKEN);
        
        // 認証ヘッダーの設定
        setAuthHeader(MOCK_TOKEN);
        
        resolve(userWithoutPassword);
      } else {
        reject({ 
          response: { 
            data: { message: 'メールアドレスまたはパスワードが正しくありません' } 
          } 
        });
      }
    }, 500); // 0.5秒の遅延
  });
};

// ログアウト関数
export const logout = () => {
  // LocalStorageからトークンを削除
  localStorage.removeItem('token');
  
  // 認証ヘッダーをクリア
  delete axios.defaults.headers.common['Authorization'];
};

// 認証ヘッダーの設定
export const setAuthHeader = (token: string) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// アプリ起動時にLocalStorageからトークンを復元
export const initAuth = () => {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthHeader(token);
    return true;
  }
  return false;
};

// モックユーザー情報取得関数（バックエンドの/api/userエンドポイントの代わり）
export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === MOCK_TOKEN) {
        // トークンが有効な場合、最初のユーザーを返す（実際のアプリではトークンからユーザーを特定）
        const { password: _, ...userWithoutPassword } = MOCK_USERS[0];
        resolve(userWithoutPassword);
      } else {
        reject({ message: '認証エラー' });
      }
    }, 300);
  });
};