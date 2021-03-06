import mySQL from '../../../../mySQL/index';
import { createTokenInfo } from '../../../utilities/tokenUtilities';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject } from "../../../utilities/serverUtilities";

// 如果查询到则返回账号相关字段，否则返回Null
const login = async (request, response, next) => {
    const { [requestParamsField]: requestParams } = request;
    const { [responseContainerField]: responseContainer } = response;
    const fields = ['account', 'password'];
    const queryObject = extractFieldsAsAObject(requestParams, fields);
    try {
        const { account, password } = queryObject;
        let [queryResult] = await mySQL.queryItem(tableNames.user, {
            fields: { account },
            limit: 1,
        }, '*');
        // 登录成功后生成jwt
        let token = null;
        if (queryResult && queryResult.password === password) {
            const { account, id } = queryResult;
            const payload = {
                account,
                id
            };
            const { token: tokenValue, secret, expiresTime } = createTokenInfo(payload);
            // 将token相关信息存入数据库
            const tokenInfo = {
                userId: id,
                secret,
                expiresTime,
            };
            token = {
                tokenValue,
                expiresTime
            };
            await mySQL.insert(tableNames.token, tokenInfo);
            queryResult.userId = queryResult.id;
            delete queryResult.id;
            delete queryResult.password;
        } else queryResult = null;
        responseContainer.status = 200;
        responseContainer.data = {
            accountInfo: queryResult || null,
            token,
        };
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default login;