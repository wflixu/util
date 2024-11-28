
export function modernizeJSONStr(str: string): string {
  return new Function("return " + str)();
}

/**
 * 
 * @param a string
 * @param b string
 * @returns  string
 */
export function bigAdd(a: string, b: string): string {
  let len = Math.max(a.length, b.length)

  a = a.padStart(len, '0')
  b = b.padStart(len, '0')
  let carry = 0
  let result = '';
  for (let i = len - 1; i >= 0; i--) {
    const sum = +a[i] + + b[i];
    result = (sum % 10) + result
    carry = Math.floor(sum / 10)

  }

  if (carry > 0) {
    result = carry + result;
  }

  return result

}

export * from './favicon'