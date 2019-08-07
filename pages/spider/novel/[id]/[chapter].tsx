import dynamic from 'next/dynamic'
const DChapter = dynamic(import('./dynamicChapter'), { ssr: false })


const Chapter = () => {
  return <DChapter />
}

export default Chapter


// import React from 'react'
// import Layout from '../../../../components/MyLayout'
// import Link from 'next/link'
// import { LOCAL_PREFFIX } from '../../../../client/constant'
// import { NextPageContext } from 'next';
// import { Novel } from '../../../../types';
// import Fetch from '../../../../Fetch';
// import { getStorage } from '../../../../utils';
// import { withRouter } from 'next/router';

// class Chapter extends React.Component<any, any> {
//   static async getInitialProps(props: NextPageContext) {
//     let endpoint = LOCAL_PREFFIX
//     if (!props.req) {
//       endpoint = document.location.protocol + '//' + window.location.host
//     }

//     console.log('endpoint', endpoint)
//     console.log('Chapter props', props)

//     const { query: { id, chapter: chapterIndex } } = props
//     const res = await Fetch.get(endpoint + `/api/novel/${id}/${chapterIndex}`)
//     const { errMsg, payload } = res
//     if (errMsg) {
//       throw new Error(errMsg)
//     }
//     const chapter = { ...payload, content: payload.content.replace(/\s\s\s\s/g, '\n    ') }

//     return {
//       chapter,
//       id,
//       chapterIndex
//     }
//   }
//   state: {
//     chapter: Novel,
//     id: number,
//     chapterIndex: string
//   } = {
//       chapter: this.props.chapter,
//       id: this.props.id,
//       chapterIndex: this.props.chapterIndex
//     }
//   fontColor = 'red'
//   bgColor = 'green'

//   async componentDidMount() {
//     console.log('did life');




//     // const { router } = this.props;

//     // const { chapter, id, chapterIndex } = this.state
//     // router.prefetch(chapter.nextCrawlUrl === '' ? `/spider/novel/${id}` : `/spider/novel/${id}/${parseInt(chapterIndex) + 1}`)
//   }
//   componentWillMount() {


//     console.log('will life');

//   }

//   render() {
//     console.log('render life');

//     const fontColor = getStorage('color.font') || 'black'
//     const bgColor = getStorage('color.bg') || 'white'
//     console.log('chapter fontColor', fontColor);
//     console.log('chapter bgColor', bgColor);
//     this.fontColor = fontColor
//     this.bgColor = bgColor


//     const { chapter, id, chapterIndex } = this.state

//     const pre = chapter.chapterIndex === '1' ? `/spider/novel/${id}` : `/spider/novel/${id}/${parseInt(chapterIndex) - 1}`
//     const next = chapter.nextCrawlUrl === '' ? `/spider/novel/${id}` : `/spider/novel/${id}/${parseInt(chapterIndex) + 1}`
//     console.log('this.fontColor', this.fontColor)
//     console.log('this.bgColor', this.bgColor)
//     return <Layout>
//       <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//         <div style={{ height: '1rem', width: '1rem', backgroundColor: this.bgColor }}></div>
//         <h2>{chapter.chapterTitle}</h2>

//         <div style={{ flex: 2, }}>
//           <div className='chapter-content' >{chapter.content}</div>
//         </div>
//         <p>{`小说来自: ${chapter.crawlUrl} 仅作为学习使用, 侵删`}</p>
//         <footer className='chapter-action'>
//           <Link href={pre} prefetch={false}>
//             <a>{'上一章'}</a>
//           </Link>
//           <Link href={`/spider/novel/${id}`} prefetch={false}>
//             <a>{'目录'}</a>
//           </Link>
//           <Link href={next} prefetch={false}>
//             <a>{'下一章'}</a>
//           </Link>
//           }
//         </footer>
//       </div>
//     </Layout>
//   }
// }

// export default withRouter(Chapter)
