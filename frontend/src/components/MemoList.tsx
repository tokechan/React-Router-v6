import React, { useState, useEffect } from 'react';
import { getMemos, createMemo, updateMemo, deleteMemo } from '../api/memoApi';
import { Memo } from "../types"


const MemoList: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newMemo, setNewMemo] = useState<Memo>({
    content: '',
    status: 'メモっとくね',
    creator: '夫',
    completed: false
  });

  // メモ一覧の取得
  useEffect(() => {
    const fetchMemos = async () => {
      try {
        setLoading(true);
        const data = await getMemos();
        setMemos(data);
        setError(null);
      } catch (err) {
        console.error('メモの取得に失敗しました', err);
        setError('メモの取得に失敗しました。後でもう一度お試しください。');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMemos();
  }, []);

  // 入力フィールドの変更ハンドラ
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMemo({
      ...newMemo,
      [name]: name === 'completed' ? (e.target as HTMLInputElement).checked : value
    });
  };

  // 新しいメモの作成
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemo.content) return;
    
    try {
      const createdMemo = await createMemo(newMemo);
      setMemos([...memos, createdMemo]);
      setNewMemo({
        content: '',
        status: 'メモっとくね',
        creator: '夫',
        completed: false
      });
    } catch (err) {
      console.error('メモの作成に失敗しました', err);
      setError('メモの作成に失敗しました。後でもう一度お試しください。');
    }
  };

  // メモの削除
  const handleDelete = async (id: number) => {
    try {
      await deleteMemo(id);
      setMemos(memos.filter(memo => memo.id !== id));
    } catch (err) {
      console.error('メモの削除に失敗しました', err);
      setError('メモの削除に失敗しました。後でもう一度お試しください。');
    }
  };

  // メモの完了状態の切り替え
  const toggleComplete = async (memo: Memo) => {
    try {
      const updatedMemo = await updateMemo(memo.id!, {
        ...memo,
        completed: !memo.completed,
        status: !memo.completed ? 'ちゃんとやった？' : 'メモっとくね'
      });
      
      setMemos(memos.map(m => m.id === memo.id ? updatedMemo : m));
    } catch (err) {
      console.error('メモの更新に失敗しました', err);
      setError('メモの更新に失敗しました。後でもう一度お試しください。');
    }
  };

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="memo-list">
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#f39c12' }}>夫婦の共有メモ</h2>
      
      {/* メモ作成フォーム */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            name="content"
            value={newMemo.content}
            onChange={handleInputChange}
            placeholder="メモの内容"
            className="p-2 border rounded"
            required
          />
          
          <select
            name="creator"
            value={newMemo.creator}
            onChange={handleInputChange}
            className="p-2 border rounded"
          >
            <option value="夫">夫</option>
            <option value="妻">妻</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
        >
          メモを追加
        </button>
      </form>
      
      {/* メモ一覧 */}
      <ul className="space-y-4">
        {memos.length === 0 ? (
          <li>メモがありません</li>
        ) : (
          memos.map(memo => (
            <li
              key={memo.id}
              className={`p-4 border rounded ${memo.completed ? 'bg-green-50' : 'bg-orange-50'}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{memo.content}</h3>
                  <p className="text-sm">
                    ステータス: <span style={{ color: '#f39c12' }}>{memo.status}</span>
                  </p>
                  <p className="text-sm">作成者: {memo.creator}</p>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleComplete(memo)}
                    className={`px-3 py-1 rounded ${memo.completed ? 'bg-gray-200' : 'bg-green-200'}`}
                  >
                    {memo.completed ? '未完了に戻す' : '完了にする'}
                  </button>
                  
                  <button
                    onClick={() => handleDelete(memo.id!)}
                    className="px-3 py-1 bg-red-200 rounded"
                  >
                    削除
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MemoList;