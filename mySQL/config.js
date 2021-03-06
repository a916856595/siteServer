// 数据库配置
const sqlLoginInfo = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'zxc916856595',
    database: 'site',
};

const tableNames = {
    user: 'user',                   // 用户表名称
    token: 'token',                 // token表名称
    article: 'article',             // 文章表名称
    uploadFile: 'uploadFile',       // 上传文件表
    dictionary: 'dictionary',       // 字典表
    dictionaryField: 'dictionaryField',       // 字典字段表
};

module.exports = {
    sqlLoginInfo,
    tableNames
};