import {JSDOM} from "jsdom"
const FAVICON_ERROR = {
  REQUEST_ERROR: function (err: string) {
    return { code: 1001, msg: "Request Error: " + err };
  },
  MISSING_PARAMS: function () {
    return { code: 1002, msg: "Missing Parameter" };
  },
  CANNOT_GET_ICON: function () {
    return { code: 1003, msg: "Cannot get current favicon" };
  },
  DOMAIN_CANNOT_NULL: function () {
    return { code: 1004, msg: "Domain cannot null" };
  },
};

export function modernizeJSONStr(str: string): string {
  return new Function("return " + str)();
}

export async function getFavicon(domain: string) {
  if (typeof domain !== "string") {
    return Promise.reject("参数正确，请传入一个网址");
  }
  if (!domain.startsWith("http")) {
    domain = "http://" + domain;
  }
  return followRedirectUrl(domain)
    .then((res) => {
      if (res) {
        res = res.replace(/\/$/, "");
        return getFaviconLink(res).then(res=>{
          return res;
        }).catch (error=>{
 
        }); 
      }
    })
    .catch((error) => {
      return error;
    });
}


// 获取Link rel=icon的地址
async function getFaviconLink(domain: string):Promise<string> {
  if (!domain) {
    return Promise.reject(FAVICON_ERROR.DOMAIN_CANNOT_NULL());
  }


  return fetch(domain).then(response => {
    return response.text();
  }).then(data =>{
    const dom = new JSDOM(data);
    const fel = dom.window.document.querySelector("link[rel*='icon']");
    if(fel) {
      let path = fel.getAttribute('href');
      if(path){
        path = path.startsWith('http') ? path : domain + path;
        return path;
      }
     
    }
    return Promise.reject('error in getFaviconLink');
  }).catch(error=>{
    return Promise.reject(FAVICON_ERROR.REQUEST_ERROR(error))
  })

}

// 追踪30X的最终地址
async function followRedirectUrl(url: string): Promise<string> {
  if (!url) {
    return Promise.reject(FAVICON_ERROR.CANNOT_GET_ICON());
  }
  return fetch(url, {
    redirect: "manual",
  }).then((response: Response) => {
    if (response.status > 300 && response.status < 400) {
      return followRedirectUrl(response.url);
    } else {
      const newUrl = new URL(url);
      return newUrl.href;
    }
  });
}
