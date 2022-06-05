import { R, crocks } from './deps.js'

const v = crocks.Identity.of(Deno.version)
  .map(R.prop('deno'))
  .valueOf()

const defaultInfo = {
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
}

export default function (arweaveInfo = defaultInfo) {
  return Object.freeze({
    api: api.runWith(arweaveInfo)
  })
}