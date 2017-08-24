module.exports = function(formData){
    return formData.user==='admin'&&formData.psw==='admin';
};