# 夫婦共有メモアプリ

夫婦間で共有できるシンプルなメモアプリケーションです。「メモっとくね」や「ちゃんとやった？」などのステータスを持つメモを管理できます。

## 概要

このアプリケーションは、夫婦間でタスクやメモを共有するためのプラットフォームを提供します。
これを使って、コミュニケーションロスにより起こる変な気持ちのすれ違いを解消したい！と思って作ってみました。
暖かみがありながらもクールな印象のデザインと使いやすいインターフェースで、日常生活の小さなタスクを管理することができます。

### 主な機能

- メモの作成、表示、編集、削除
- メモのステータス管理（「メモっとくね」「ちゃんとやった？」）
- 作成者の記録（夫/妻）
- 完了状態の管理

## 技術スタック

### バックエンド
- **フレームワーク**: Laravel 11
- **データベース**: MySQL 8.0
- **コンテナ化**: Docker & Docker Compose
- **Web サーバー**: Nginx
- **データベース管理**: Adminer

### フロントエンド
- **フレームワーク**: React
- **HTTP クライアント**: Axios
- **スタイリング**: CSS（明るいオレンジ #f39c12 をアクセントカラーとして使用）

## セットアップ方法

### 前提条件
- Docker と Docker Compose がインストールされていること
- Node.js と npm がインストールされていること

### バックエンドのセットアップ

1. リポジトリをクローン
   ```bash
   git clone <リポジトリURL>
   cd Todo-app
   ```

2. バックエンドディレクトリに移動
   ```bash
   cd backend
   ```

3. Docker コンテナを起動
   ```bash
   docker-compose up -d
   ```

4. マイグレーションを実行
   ```bash
   docker-compose exec app php artisan migrate
   ```

### フロントエンドのセットアップ

1. フロントエンドディレクトリに移動
   ```bash
   cd ../frontend
   ```

2. 依存関係をインストール
   ```bash
   npm install
   ```

3. 開発サーバーを起動
   ```bash
   npm run dev
   ```

## プロジェクト構造

```
Todo-app/
├── backend/         # Laravel バックエンド
│   ├── app/         # アプリケーションコード
│   │   └── Http/Controllers/API/  # APIコントローラー
│   ├── config/      # 設定ファイル
│   ├── database/    # マイグレーションとシード
│   ├── docker/      # Docker設定
│   ├── routes/      # ルート定義
│   └── ...
├── frontend/        # React フロントエンド
│   ├── src/         # ソースコード
│   │   ├── components/  # UIコンポーネント
│   │   ├── api/     # APIクライアント
│   │   └── ...
│   └── ...
└── .gitignore       # Git無視設定
```

## データベース構造

**memos テーブル**:
- `id`: 主キー
- `content`: メモの内容（text型）
- `status`: ステータス（string型、デフォルト「メモっとくね」）
- `creator`: 作成者（夫/妻）（string型）
- `completed`: 完了フラグ（boolean型、デフォルトfalse）
- `created_at`: 作成日時
- `updated_at`: 更新日時

## API エンドポイント

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| GET     | /api/memos   | すべてのメモを取得 |
| POST    | /api/memos   | 新しいメモを作成 |
| GET     | /api/memos/{id} | 特定のメモを取得 |
| PUT     | /api/memos/{id} | メモを更新 |
| DELETE  | /api/memos/{id} | メモを削除 |
