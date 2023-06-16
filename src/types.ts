export interface IData {
  hasImage: boolean;
  headerImage: IImage;
  id: string;
  links: ILinks;
  longTitle: string;
  objectNumber: string;
  principalOrFirstMaker: string;
  title: string;
  webImage: IWebImage;
}

export interface IImage {
  guid: string;
  url: string;
}

export interface IWebImage {
  guid: string;
  url: string;
}

export interface ILinks {
  self: string;
  web: string;
}
