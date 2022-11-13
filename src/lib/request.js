const NO_OPERATION = () => {};
const NO_PARAMS = {};
const NO_HEADERS = {};
const OK_200 = [200];

function request({
  method = 'GET',
  url,
  params = NO_PARAMS,
  headers = NO_HEADERS,
  responseType = 'json',
  requestType = 'json',
  okResponses = OK_200,
  body,
  onSuccess = NO_OPERATION,
  onError = NO_OPERATION,
}) {
  const req = new XMLHttpRequest();
  const urlParams = new URLSearchParams(params);
  const queryString = urlParams.toString();

  req.open(method, url + (queryString ? `?${queryString}` : ''));

  Object.keys(headers).forEach((key) => {
    req.setRequestHeader(key, headers[key])
  })

  req.responseType = responseType;

  req.onload = (event) => {
    const { target } = event;

    if (!okResponses.includes(target.status)) {
      onError(target.statusText);

      return;
    }

    onSuccess(target.response);
  };

  req.onerror = () => {
    onError(() => {
      console.log('Непредвиденная ошибка. Попробуйте позже.');
    });

    return;
  };

  let dataBody = body;

  if (requestType === 'urlencoded'){
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    const bodyParams = new URLSearchParams(body)

    dataBody = bodyParams.toString();
  }

  if (requestType === 'json'){
    req.setRequestHeader('Content-type', 'application/json');

    dataBody = JSON.stringify(body);
  }

  req.send(dataBody);
}
