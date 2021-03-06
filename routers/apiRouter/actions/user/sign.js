import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject } from '../../../utilities/serverUtilities';
import { getCurrentTime } from '../../../utilities/time';

const checkAccountIsRepeat = async(request, response, next) => {
  const { [requestParamsField]: requestParams } = request;
  const { [responseContainerField]: responseContainer } = response;
  const signFields = ['account', 'password', 'userName'];
  const signData = extractFieldsAsAObject(requestParams, signFields);
  signData.createTime = signData.updateTime = getCurrentTime();
  try {
    const insertResult = await mySQL.insert(tableNames.user, signData);
    responseContainer.status = 200;
    responseContainer.data = insertResult;
  } catch (err) {
    responseContainer.data = err;
  }
  next();
};

export default checkAccountIsRepeat;