import server from './server.ts'

const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log('Listening on port', port)
})


// ---- Stretch/Bootcamp goals ---- //
//
// User can make their own custom cards
// Collections of cards can be stored in databases and selected
// Algorithm which shows user their lower rated cards more often
