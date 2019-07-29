import { getPool } from './mysql'
import camelcaseKeys from 'camelcase-keys';

export interface Oss {
  id: string
  name: string
  type: string
  crwalUrl: string
}
export interface OssRow {
  id: string
  name: string
  type: string
  crwal_url: string
}
export interface Novel {
  chapterIndex: number
  chapterTitle: string
  ossId: number
  content: string
  crawlUrl: string
}
export interface NovelRow {
  chapter_index: number
  chapter_title: string
  oss_id: number
  content: string
  crawl_url: string
}
export interface UserRow {
  nick: string
  mail: string
  phone: string
  pass: string
}
export interface RssRow {
  user_id: number
  oss_id: number
}
export async function queryOssRows(type = 'NOVEL', pageSize: number, pageNum: number) {
  const from = (pageNum - 1) * pageSize
  const offset = pageSize

  const [rows] = await getPool().query('SELECT * FROM oss WHERE `type` = ? ORDER BY id DESC LIMIT ? , ' + offset, [type, from])
  return camelcaseKeys(rows)
}
export async function queryNovelRow(id: number, chapter: number) {
  const [rows] = await getPool().query(`SELECT * FROM novel WHERE oss_id = ${id} AND chapter_index = ${chapter} `)
  return camelcaseKeys(rows)
}
export async function queryRssRows(userId: number, ossId: number) {
  const [rows] = await getPool().query(`SELECT * FROM rss WHERE user_id = ${userId} AND oss_id = ${ossId} `)
  return camelcaseKeys(rows)
}

export async function queryNovelChapters(id: number) {
  const [rows] = await getPool().query(`SELECT chapter_index, chapter_title FROM novel WHERE oss_id = ${id} `)
  return camelcaseKeys(rows)
}
export async function insertOss(oss: OssRow) {
  const [result] = await getPool().query(`INSERT INTO oss SET ?  `, [oss])
  return result
}
export async function insertUser(conn: any, user: UserRow) {
  const [result] = await conn.query(`INSERT INTO user SET ?  `, [user])
  return result
}
export async function insertRss(conn: any, rss: RssRow) {
  const [result] = await conn.query(`INSERT INTO rss SET ?  `, [rss])
  return result
}
export async function queryOssWithOption(name: string, crawlUrl: string) {
  const suffix = crawlUrl ? ' AND crawl_url = "' + crawlUrl + '" ' : ''
  const [rows] = await getPool().query(`SELECT * FROM oss where name = ? ${suffix}`, [name])
  return camelcaseKeys(rows)
}
export async function queryUserWithOption(conn: any, mail: string) {
  const [rows] = await conn.query(`SELECT * FROM user where mail = ? `, [mail])
  return camelcaseKeys(rows)
}
export async function updateUser(user: UserRow, id: number) {
  return getPool().query(`UPDATE user SET ? WHERE id = ?`, [user, id])
}
export async function queryOssInRss(userId: number) {
  const [rows] = await getPool().query(`SELECT * FROM rss LEFT JOIN oss ON rss.oss_id = oss.id WHERE  user_id = ?`, [userId])
  return camelcaseKeys(rows)
}
export async function queryPhotoRows(ossId: number) {
  const [rows] = await getPool().query('SELECT * FROM photo WHERE oss_id = ? ', [ossId])
  return camelcaseKeys(rows)
}

