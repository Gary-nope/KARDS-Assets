KARDS 个人资料与战场外观目录

分类：
- 头像：75 项；74 项有官方简体中文显示名。avatar_shadow 的中英文显示名均为空。
- 总部：21 项；20 项有官方简体中文名称，19 项有简短介绍。另保留历史介绍、照片说明和总部阵营标题。
- 桌布：27 项；全部已定位材质和预览底图。

文本来源：
- 官方简体中文：Game/zh-Hans/Game.locres
- 官方英文：Game/en/Game.locres
- 头像：Content/Structs/avatars（avatarData）
- 总部：Content/Structs/BackgroundTypeDataTable
- 桌布：Content/Structs/boardMats

证据边界：
- 头像结构没有介绍/描述字段。
- 桌布结构只有材质引用，没有显示名和介绍字段，因此桌布目录保留内部 ID、材质路径、预览底图和可确认的总部关联，不猜写官方名称。
- card_location_bastogne_waw_event 在总部表中存在，但当前本地化资源没有它的名称或介绍。
- card_location_fortress_darwin_neutral 有官方名称和历史介绍，但没有单独的简短介绍字段。
