import { responseContainerField, responseNewTokenContainerField } from '../apiRouter/fieldConfig';
import { createResponseData } from '../utilities/serverUtilities';

// 将存储在response指定字段中的内容作为响应发送
const sendData = (request, response, next) => {
  const {
      [responseContainerField]: responseData,
      [responseNewTokenContainerField]: token
  } = response;
  const result = { status: 500, result: null };
  if (responseData) {
    result.status = responseData.status;
    result.data = responseData.data;
  }
  const sendContent = createResponseData(result.status, result.data, token);
  response.status(sendContent.status).send(sendContent.body);
};

export default sendData;