import { crocks } from '../deps.js'

const { Async, ReaderT } = crocks
const AsyncReader = ReaderT(Async)
const { ask, lift } = AsyncReader
const asyncFetch = Async.fromPromise(fetch)
const toJSON = res => 
  res.ok 
  ? Async.fromPromise(res.json.bind(res))()
  : Async.Rejected(res)

export default {
  get: path => ask((info) => 
    asyncFetch(`${info.protocol}://${info.host}:${info.port}/${path}`)
      .chain(toJSON)
  )
  
  .chain(lift)
    //.chain(res => AsyncReader.fromPromise(res.json.bind(res)()))
}