var SSH2Client = require('ssh2').Client

function useSshForward (channelCallback) {
  const sshConf = {
    host: '39.104.226.149',
    port: 22,
    username: 'root',
    privateKey: require('fs').readFileSync('/Users/hikaruamano/.ssh/id_rsa')
  }

  console.log('useSshForward')
  const ssh = new SSH2Client()
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
      channelCallback
    )
  }).connect(sshConf)
}
exports.useSshForward = useSshForward
