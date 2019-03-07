export const kingdomList = {
  basic: [
    { name: "冒険者" },
    { name: "役人" },
    { name: "地下貯蔵庫" },
    { name: "礼拝堂" },
    { name: "議事堂" },
    { name: "祝祭" },
    { name: "庭園" },
    { name: "研究所" },
    { name: "書庫" },
    { name: "市場" },
    { name: "民兵" },
    { name: "鉱山" },
    { name: "堀" },
    { name: "金貸し" },
    { name: "改築" },
    { name: "鍛冶屋" },
    { name: "玉座の間" },
    { name: "村" },
    { name: "魔女" },
    { name: "工房" },
    { name: "職人" },
    { name: "山賊" },
    { name: "前駆者" },
    { name: "商人" },
    { name: "密猟者" },
    { name: "衛兵" },
    { name: "家臣" }
  ],
  nocturne: [
    { name: "詩人", boon: true, will_o_wisp: true },
    { name: "恵みの村", boon: true },
    { name: "墓地", heirloom: '呪われた鏡', ghost: true },
    { name: "取り替え子" },
    { name: "カブラー" },
    { name: "コンクラーベ" },
    { name: "納骨堂" },
    { name: "呪われた村", hex: true },
    { name: "悪人のアジト" },
    { name: "悪魔の工房", imp: true },
    { name: "ドルイド", druid: true },
    { name: "悪魔祓い", will_o_wisp: true, imp: true, ghost: true },
    { name: "忠犬" },
    { name: "愚者", boon: true, will_o_wisp: true, heirloom: '幸運のコイン' },
    { name: "ゴーストタウン" },
    { name: "守護者" },
    { name: "偶像", boon: true, will_o_wisp: true },
    { name: "レプラコーン", hex: true, wish: true },
    { name: "修道院" },
    { name: "ネクロマンサー", zombie: true },
    { name: "夜警" },
    { name: "ピクシー", boon: true, will_o_wisp: true, heirloom: 'ヤギ' },
    { name: "プーカ" , heirloom: '呪われた金貨' },
    { name: "夜襲" },
    { name: "聖なる木立ち", boon: true, will_o_wisp: true },
    { name: "秘密の洞窟", heirloom: '魔法のランプ', wish: true },
    { name: "羊飼い", heirloom: '牧草地' },
    { name: "暗躍者", hex: true },
    { name: "迫害者", hex: true, imp: true },
    { name: "追跡者", boon: true, will_o_wisp: true, heirloom: '革袋' },
    { name: "悲劇のヒーロー" },
    { name: "吸血鬼", hex: true, bat: true },
    { name: "人狼", hex: true }
  ]
};

export const nameMap = { basic: "基本", nocturne: "夜想曲" };

export const extraMap = {
  boon: "恵み", hex: "呪詛", will_o_wisp: "ウィル・オ・ウィスプ", imp: "小悪魔",
  ghost: "幽霊", wish: "願い", bat: "蝙蝠"
};

export const boonList = [
  { name: '大地の恵み' },
  { name: '田畑の恵み' },
  { name: '炎の恵み' },
  { name: '森の恵み' },
  { name: '月の恵み' },
  { name: '山の恵み' },
  { name: '川の恵み' },
  { name: '海の恵み' },
  { name: '空の恵み' },
  { name: '太陽の恵み' },
  { name: '沼の恵み', will_o_wisp: true },
  { name: '風の恵み' }
];
