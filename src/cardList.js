export const kingdomList = {
  basic: [
    { id: 1, name: "役人" },
    { id: 2, name: "地下貯蔵庫" },
    { id: 3, name: "礼拝堂" },
    { id: 4, name: "議事堂" },
    { id: 5, name: "祝祭" },
    { id: 6, name: "庭園" },
    { id: 7, name: "研究所" },
    { id: 8, name: "書庫" },
    { id: 9, name: "市場" },
    { id: 10, name: "民兵" },
    { id: 11, name: "鉱山" },
    { id: 12, name: "堀" },
    { id: 13, name: "金貸し" },
    { id: 14, name: "改築" },
    { id: 15, name: "鍛冶屋" },
    { id: 16, name: "玉座の間" },
    { id: 17, name: "村" },
    { id: 18, name: "魔女" },
    { id: 19, name: "工房" },
    { id: 20, name: "職人" },
    { id: 21, name: "山賊" },
    { id: 22, name: "前駆者" },
    { id: 23, name: "商人" },
    { id: 24, name: "密猟者" },
    { id: 25, name: "衛兵" },
    { id: 26, name: "家臣" }
  ],
  nocturne: [
    { id: 1, name: "詩人", boon: true, will_o_wisp: true },
    { id: 2, name: "恵みの村", boon: true, will_o_wisp: true },
    { id: 3, name: "墓地", heirloom: '呪われた鏡', ghost: true },
    { id: 4, name: "取り替え子" },
    { id: 5, name: "カブラー" },
    { id: 6, name: "コンクラーベ" },
    { id: 7, name: "納骨堂" },
    { id: 8, name: "呪われた村", hex: true },
    { id: 9, name: "悪人のアジト" },
    { id: 10, name: "悪魔の工房", imp: true },
    { id: 11, name: "ドルイド", druid: true },
    { id: 12, name: "悪魔祓い", will_o_wisp: true, imp: true, ghost: true },
    { id: 13, name: "忠犬" },
    { id: 14, name: "愚者", boon: true, will_o_wisp: true, heirloom: '幸運のコイン' },
    { id: 15, name: "ゴーストタウン" },
    { id: 16, name: "守護者" },
    { id: 17, name: "偶像", boon: true, will_o_wisp: true },
    { id: 18, name: "レプラコーン", hex: true, wish: true },
    { id: 19, name: "修道院" },
    { id: 20, name: "ネクロマンサー", zombie: true },
    { id: 21, name: "夜警" },
    { id: 22, name: "ピクシー", boon: true, will_o_wisp: true, heirloom: 'ヤギ' },
    { id: 23, name: "プーカ" , heirloom: '呪われた金貨' },
    { id: 24, name: "夜襲" },
    { id: 25, name: "聖なる木立ち", boon: true, will_o_wisp: true },
    { id: 26, name: "秘密の洞窟", heirloom: '魔法のランプ', wish: true },
    { id: 27, name: "羊飼い", heirloom: '牧草地' },
    { id: 28, name: "暗躍者", hex: true },
    { id: 29, name: "迫害者", hex: true, imp: true },
    { id: 30, name: "追跡者", boon: true, will_o_wisp: true, heirloom: '革袋' },
    { id: 31, name: "悲劇のヒーロー" },
    { id: 32, name: "吸血鬼", hex: true, bat: true },
    { id: 33, name: "人狼", hex: true }
  ]
};

export const nameMap = { basic: "基本", nocturne: "夜想曲" };

export const extraMap = {
  boon: "恵み", hex: "呪詛", will_o_wisp: "ウィル・オ・ウィスプ", imp: "小悪魔",
  ghost: "幽霊", wish: "願い", bat: "蝙蝠", zombie: 'ゾンビ3種'
};

export const boonList = [
  { id: 1, name: '大地の恵み' },
  { id: 2, name: '田畑の恵み' },
  { id: 3, name: '炎の恵み' },
  { id: 4, name: '森の恵み' },
  { id: 5, name: '月の恵み' },
  { id: 6, name: '山の恵み' },
  { id: 7, name: '川の恵み' },
  { id: 8, name: '海の恵み' },
  { id: 9, name: '空の恵み' },
  { id: 10, name: '太陽の恵み' },
  { id: 11, name: '沼の恵み', will_o_wisp: true },
  { id: 12, name: '風の恵み' }
];
