import { request } from 'alita';

export async function query(): Promise<any> {
  return request('/api/hello');
}

export async function queryMenu(): Promise<any> {
  return request('/api/menu');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function queryHeroList(): Promise<any> {
  return request('/api/herolist.json');
}

export async function getHeroDetails(params: any): Promise<any> {
  return request('/api/herodetails.json', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function queryItemList(): Promise<any> {
  return request('/api/item.json');
}

export async function queryFreeHeros(params: any): Promise<any> {
  return request('/api/freeheros.json', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
