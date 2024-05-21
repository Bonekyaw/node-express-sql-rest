exports.checkPhoneExist = (admin) => {      // // This is not middleware 
    if (admin) {
      const err = new Error("This phone number has already registered!.");
      err.status = 409;
      throw err;
    }
  };
  
  exports.checkPhoneIfNotExist = (admin) => {
    if (!admin) {
      const err = new Error("This phone number has not registered!.");
      err.status = 401;
      throw err;
    }
  };
  
  exports.checkOtpPhone = (otpCheck) => {
    if (!otpCheck) {
      const err = new Error("Phone number is incorrect.");
      err.status = 400;
      throw err;
    }
  };
  
  exports.checkOtpErrorIfSameDate = (isSameDate, otpCheck) => {
    if (isSameDate && otpCheck.error === 5) {
      const err = new Error("OTP is wrong 5 times today. Try again tomorrow.");
      err.status = 401;
      throw err;
    }
  };