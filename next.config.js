// module.exports = {
//   exportPathMap: function () {
//     return {
//       '/': { page: '/' }
//       // '/about': { page: '/about' }
//       // '/p/481': { page: '/post', query: { title: 'Hello Next.js' } }
//     }
//   }
// }

module.exports = {
    onDemandEntries: {
        // Make sure entries are not getting disposed.
        maxInactiveAge: 1000 * 60 * 60
    },
    // ....
}