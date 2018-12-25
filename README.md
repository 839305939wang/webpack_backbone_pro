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
