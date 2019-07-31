

import { Client as SSH2Client, ClientChannel } from 'ssh2'

type ChannelCallback = (e: Error, channe: ClientChannel, resolve: Function, reject: Function) => void

export function useSshForward(channelCallback: ChannelCallback) {
  const ssh = new SSH2Client()

  const sshConf = {
    host: '39.104.226.149',
    port: 22,
    username: 'root',
    privateKey: require('fs').readFileSync('/Users/hikaruamano/.ssh/id_rsa')
  }

  return new Promise((resolve, reject) => {
    ssh.on('ready', function () {
      console.log('Client :: ready')

      ssh.forwardOut(
        // source IP the connection would have came from. this can be anything since we
        // are connecting in-process
        '127.0.0.1',
        // source port. again this can be randomized and technically should be unique
        3306,
        // destination IP on the remote server
        '127.0.0.1',
        // destination port at the destination IP
        3306,
        (e: Error, channe: ClientChannel, ) => channelCallback(e, channe, resolve, reject)
      )
    }).connect(sshConf)
  })

}