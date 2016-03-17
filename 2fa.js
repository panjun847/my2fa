(function()
 {
   "use strict";
   function HOTP(K, C)
   {
     var key = sjcl.codec.base32.toBits(K);
     var count = [((C & 0xffffffff00000000) >> 32), C & 0xffffffff];
     var otplength = 6;
     var hmacsha1 = new sjcl.misc.hmac(key, sjcl.hash.sha1);
     var code = hmacsha1.encrypt(count);
     var offset = sjcl.bitArray.extract(code, 152, 8) & 0x0f;
     var startBits = offset * 8;
     var endBits = startBits + 4 * 8;
     var slice = sjcl.bitArray.bitSlice(code, startBits, endBits);
     var dbc1 = slice[0];
     var dbc2 = dbc1 & 0x7fffffff;
     var otp = dbc2 % Math.pow(10, otplength);
     var result = otp.toString();
     while (result.length < otplength)
       {
         result = '0' + result;
       }
       return result;
   }
   function getTOTP(secret)
   {
     var ctime = Math.floor((new Date() - 0) / 30000);
     var otp = HOTP(secret, ctime);
     return otp;
   }
   window.getTOTP=getTOTP;
 }
)();
