

export function modernizeJSONStr(str: string): string{
  return new Function('return ' + str)()
}