export type GalleryCategory = {
  slug: string;
  title: string;
  previewTitle: string;
  previewDescription: string;
  imageCount: number;
  gridClass?: string;
  showOnGrid: boolean;
  coverIndex?: number;
};

export const galleryCategories: GalleryCategory[] = [
  {
    slug: "boyadisvane-na-staya",
    title: "Боядисване на стая",
    previewTitle: "Боядисване на стая",
    previewDescription: "Освежаване и финишни детайли",
    imageCount: 12,
    gridClass: "g1",
    showOnGrid: true,
  },
  {
    slug: "vik",
    title: "ВиК",
    previewTitle: "ВиК",
    previewDescription: "Изводи, разводки и монтаж",
    imageCount: 2,
    gridClass: "g2",
    showOnGrid: true,
  },
  {
    slug: "gotova-banya-ot-do",
    title: "Готова баня от-до",
    previewTitle: "Готова баня от-до",
    previewDescription: "Цялостна трансформация на баня",
    imageCount: 17,
    gridClass: "g3",
    showOnGrid: true,
  },
  {
    slug: "kurtene-i-zidane",
    title: "Къртене и зидане",
    previewTitle: "Къртене и зидане",
    previewDescription: "Подготовка и груби строителни работи",
    imageCount: 2,
    gridClass: "g4",
    showOnGrid: true,
  },
  {
    slug: "lepene-na-plochki-vanshno-pomeshtenie",
    title: "Лепене на плочки външно помещение",
    previewTitle: "Външно помещение",
    previewDescription: "Плочки за тераси и външни зони",
    imageCount: 4,
    gridClass: "g5",
    showOnGrid: true,
  },
  {
    slug: "lepene-na-plochki-koridor",
    title: "Лепене на плочки коридор",
    previewTitle: "Плочки в коридор",
    previewDescription: "Прецизно редене във вътрешни пространства",
    imageCount: 2,
    gridClass: "g6",
    showOnGrid: true,
  },
  {
    slug: "drugi",
    title: "Други",
    previewTitle: "Други",
    previewDescription: "Допълнителни изпълнени детайли",
    imageCount: 9,
    showOnGrid: false,
  },
];
