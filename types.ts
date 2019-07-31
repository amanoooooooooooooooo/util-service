export interface LocalUser {
    name?: string
    mail?: string
    id?: number
    nick?: string
    pass?: string
}

export interface Sub {
    author: string | null
    complete: number
    crawlUrl: string
    id: number
    name: string
    ossId: number
    type: string
    url: string
    userId: number
}

export interface Oss {
    id: string
    name: string
    type: string
    crwalUrl: string
    createTime: string
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
export interface Rss {
    id: number
    userId: number
    ossId: number
}
export interface Photo {
    id: number
    ossId: number
    url: string
    crawlUrl: string
    index: number
    title: string
}