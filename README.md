```js
'use strict';

module.exports = appInfo => {
  const config = exports = {};
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1543229206821_4970';

  // add your config here
  config.middleware = [];
  config.io = {
    init: {}, // passed to engine.io
    namespace: {
      '/console': {
        connectionMiddleware: ['auth'],
        packetMiddleware: ['filter'],
      },
    },
  };
  config.security = {
    csrf: {
      enable: false
    }
  }
 
  config.redis = {
    client:{
      host:'127.0.0.1',
      port:6379,
      password:'',
      db:'0'
    },
  }
  
  config.sshConfig = {//服务器验证信息
    algorithms: {
      "kex": [
        "diffie-hellman-group1-sha1",
        "ecdh-sha2-nistp256",
        "ecdh-sha2-nistp384",
        "ecdh-sha2-nistp521",
        "diffie-hellman-group-exchange-sha256",
        "diffie-hellman-group14-sha1"
      ],
      "cipher": [
        "3des-cbc",
        "aes128-cbc",
        "aes192-cbc",
        "aes256-cbc",
        "aes128-ctr",
        "aes192-ctr",
        "aes256-ctr",
        "aes128-gcm@openssh.com",
        "aes256-gcm@openssh.com",
        "arcfour",
        "arcfour128",
        "arcfour256",
        "blowfish-cbc",
        "cast128-cbc",
      ],
      "serverHostKey": [
        "ssh-rsa",
        "ecdsa-sha2-nistp256",
        "ecdsa-sha2-nistp384",
        "ecdsa-sha2-nistp521"
      ],
      "hmac": [
        "hmac-sha2-256",
        "hmac-sha2-512",
        "hmac-sha1"
      ]
    }
  }

  return config;
};

```
```js

const Controller = require('egg').Controller;
const crypt = require
class SSHController extends Controller {
  /**
   * 打开SSH连接
   */
  async openSSH() {
    const params = {
       host:'10.31.34.148',
       port:22,
       username:'root',
       password:'7ujMko0admin123'
    };
    const client = await this.service.ssh.createClient(params);
    if(client){
      console.info("连接成功")
      this.ctx.body=this.ctx.helper.sequence(200,true,`SSH连接成功`)
      client.end();
    }else{
      console.info("连接失败")
      this.ctx.body=this.ctx.helper.sequence(500,false,`SSH连接失败`)
    }
  }
}
module.exports = SSHController;

```
```js
module.exports = {
    sequence(code=200,success=true,msg="请求成功"){
       return {
        code,
        success,
        msg
       }
    }
}
```
```js

'use strict';
const Client = require('ssh2').Client;
const Service = require('egg').Service;
class SSHService extends Service {
  /**
     * 创建SSH连接
     * @param {String} ip 远程服务ip地址
     * @param {Number} port ssh服务端口
     * @param {String} username 远程服务器用户名
     * @param {String} password 远程服务用户名密码
     * @return {Object} connection SSH连接句柄
     */
  createClient({ host, port, username, password }) {
    const connection = new Client();
    console.log('userinfo:', host, port, username, password);
    
    const options = {host, port, username, password,...this.config.sshConfig};
    connection.connect(options);
    return new Promise((resolve, reject) => {
      connection.on('ready', () => {
        resolve(connection);
      });
      connection.on('error', () => {
        resolve(false);
      });
    });
  }
}
module.exports = SSHService;

```
