import axios from "axios";

//APIのベースURL
const API_URL = "http://localhost:8000/api";

//メモの型定義
export interface Memo {
    id?: number;
    content: string;
    status: string;
    creator: string;
    completed: boolean;
    created_at?: string;
    updated_at?: string;
}

//Axiosインスタンスの生成
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

//メモ一覧の取得
export const getMemos = async (): Promise<Memo[]> => {
    const response = await apiClient.get('/memos');
    return response.data;
};

//特定のメモの取得
export const getMemo = async (id: number): Promise<Memo> => {
    const response = await apiClient.get(`/memos/${id}`);
    return response.data;
};

//メモの作成
export const createMemo = async (memoData: Memo): Promise<Memo> => {
    const response = await apiClient.post('/memos', memoData);
    return response.data;
};

//メモの更新
export const updateMemo = async (id: number, memoData: Memo): Promise<Memo> => {
    const response = await apiClient.put(`/memos/${id}`, memoData);
    return response.data;
};

//メモの削除
export const deleteMemo = async (id: number): Promise<void> => {
    await apiClient.delete(`/memos/${id}`);
};