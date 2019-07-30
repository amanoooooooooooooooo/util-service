export interface LocalUser {
    name?: string
    mail?: string
    id?: number
    nick?: string
    pass?: string
}


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
    chapterIndex: string
    chapterTitle: string
    ossId: number
    content: string
    crawlUrl: string,
    nextCrawlUrl: string
}
export interface NovelRow {
    chapter_index: number
    chapter_title: string
    oss_id: number
    content: string
    crawl_url: string
    nextCrawl_url: string

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