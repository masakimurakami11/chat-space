## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|image|string||
|address|text|null: false|
|passward|text|null: false|
|nickname|string|null: false|

### Association
- has_many :groups, through: :users_groups
- has_many :chats
- has_many :users_groups

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|

### Association
- has_many :users, through: :users_groups
- has_many :chats
- has_many :users_groups


## chatsテーブル

|Column|Type|Options|
|------|----|-------|
|chat|text|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## users_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group