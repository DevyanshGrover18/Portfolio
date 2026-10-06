import dotenv from 'dotenv'
import dns from 'node:dns'

dotenv.config()

// Atlas SRV records require DNS lookups. Allow deployments to override a
// broken local resolver without hard-coding a provider into the application.
const dnsServers = process.env.MONGO_DNS_SERVERS
  ?.split(',')
  .map((server) => server.trim())
  .filter(Boolean)

if (dnsServers?.length) {
  dns.setServers(dnsServers)
}
